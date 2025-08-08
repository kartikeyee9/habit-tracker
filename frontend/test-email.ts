import nodemailer from 'nodemailer';

async function main() {
  console.log('Creating transporter...');

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'marcelle50@ethereal.email',
      pass: 'r6HXC3YBbcC58QzNSG', // Make sure it's the exact one
    },
  });

  console.log('Sending email...');

  const info = await transporter.sendMail({
    from: 'marcelle50@ethereal.email',
    to: 'marcelle50@ethereal.email',
    subject: 'Test Email from Habit App',
    text: 'This is a test email from your Habit Tracker',
  });

  console.log('✅ Email sent!');
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}

main().catch((err) => {
  console.error('❌ Error in script:', err);
});
