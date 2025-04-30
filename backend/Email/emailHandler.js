import {client,sender} from '../lib/mailtrap.js'; 
// Adjust the import path as necessary

export const sendWelcomeEmail = async (email, name,profileUrl) => {
  
  const recipients = [
    {
      email: email
    }
  ];

  const subject = "Welcome to Our Platform!";
  const text = `Hello ${name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`;

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject,
      text,
    });
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}