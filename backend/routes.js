const express = require("express");
const router = express.Router();
const prisma = require("./prismaClient");

// Test route
router.get("/test", (req,res) => {
    res.json({message: "API Working!"
    });
});

// Create user
router.post("/users", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid input." });
  }
});

// Create new habit
router.post("/habits", async (req, res) => {
  const { name, userId } = req.body;
  try {
    const habit = await prisma.habit.create({
      data: {
        name,
        userId,
      },
    });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to create habit" });
  }
});

// Mark habit as done (check in for today)
router.post("/habits/:habitId/check", async (req, res) => {
  const { habitId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const alreadyChecked = await prisma.habitCompletion.findFirst({
      where: {
        habitId,
        date: today,
      },
    });

    if (alreadyChecked) {
      return res.status(400).json({ error: "Already checked in today." });
    }

    const check = await prisma.habitCompletion.create({
      data: {
        habitId,
        date: today,
      },
    });

    res.json(check);
  } catch (err) {
    res.status(500).json({ error: "Check-in failed" });
  }
});

// Get today's habits for a user with check-in status
router.get("/habits/today/:userId", async (req, res) => {
  const { userId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const habits = await prisma.habit.findMany({
      where: { userId },
      include: {
        habitChecks: {
          where: {
            date: today,
          },
        },
      },
    });

    const result = habits.map(habit => ({
      id: habit.id,
      name: habit.name,
      checked: habit.habitChecks.length > 0,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch today's habits" });
  }
});

// habit streak
// GET /api/habits/:id/streak — returns current streak count
router.get('/habits/:id/streak', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Fetch completions sorted by most recent
    const completions = await prisma.habitCompletion.findMany({
      where: { habitId: id },
      orderBy: { date: 'desc' },
    });

    let streak = 0;

    // 2. Normalize today to midnight for accurate comparison
    const today = new Date();
    let current = new Date(today.setHours(0, 0, 0, 0));

    // 3. Iterate over completion dates in descending order
    for (const completion of completions) {
      const completedDate = new Date(completion.date);
      completedDate.setHours(0, 0, 0, 0); // normalize time

      if (completedDate.getTime() === current.getTime()) {
        // Completed today
        streak++;
        current.setDate(current.getDate() - 1); // check yesterday next
      } else if (completedDate.getTime() === current.getTime() - 86400000) {
        // Completed yesterday
        streak++;
        current.setDate(current.getDate() - 1); // go back another day
      } else {
        // Streak broken
        break;
      }
    }

    res.json({ streak }); // Send streak count
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate streak' });
  }
});

// Get all completion dates for a habit
router.get("/habits/:habitId/completions", async (req, res) => {
  const { habitId } = req.params;

  try {
    const completions = await prisma.habitCheck.findMany({
      where: { habitId },
      select: { date: true },
    });

    res.json(completions.map(c => c.date));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch completion dates" });
  }
});

// Get habit history (for drawer)
router.get('/habits/:id/history', async (req, res) => {
  const { id } = req.params;

  try {
    const completions = await prisma.habitCompletion.findMany({
      where: { habitId: id },
      orderBy: { date: 'desc' },
    });

    res.json({ dates: completions.map(c => c.date) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get all habits for a user (for calendar view)
router.get("/habits/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const habits = await prisma.habit.findMany({
      where: { userId },
      include: {
        completions: true, // include completion data if needed
      },
    });

    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// Get all completion dates for a habit
router.get('/habits/:habitId/history', async (req, res) => {
  const { habitId } = req.params;

  try {
    const completions = await prisma.habitCompletion.findMany({
      where: { habitId },
      orderBy: { date: 'asc' },
    });

    const dates = completions.map((c) => c.date.toISOString().split('T')[0]); // return as ISO date strings
    res.json({ dates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch habit history' });
  }
});

// GET /habits/:habitId/checkins/weekly
router.get('/habits/:habitId/checkins/weekly', async (req, res) => {
  const { habitId } = req.params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from 6 weeks ago
  const start = new Date(today);
  start.setDate(start.getDate() - 7 * 6);

  try {
    const checkins = await prisma.habitCheck.findMany({
      where: {
        habitId,
        date: {
          gte: start,
          lte: today,
        },
      },
      orderBy: { date: 'asc' },
    });

    const weeklyCounts = {};

    for (const checkin of checkins) {
      const date = new Date(checkin.date);
      const weekYear = getWeekYear(date); // e.g. '2025-W31'
      weeklyCounts[weekYear] = (weeklyCounts[weekYear] || 0) + 1;
    }

    const result = Object.entries(weeklyCounts).map(([week, count]) => ({
      week,
      count,
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching weekly check-ins:', err);
    res.status(500).json({ error: 'Failed to fetch weekly check-ins' });
  }
});

// Helper to get ISO week label like '2025-W31'
function getWeekYear(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}



module.exports = router;
