import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config(); // Load env variables

const TOKEN = process.env.MAILTRAP_API_KEY;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_NAME,
};
const recipients = [
  {
    email: "syedsahabuddin182@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);