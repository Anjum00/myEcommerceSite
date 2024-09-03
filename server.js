import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "anjumsaiyad085@gmail.com",
    pass: "tztu fqvg tnsx jkjb"
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, totalAmount, cartItems } = req.body;

  if (!name || !email || !totalAmount || !cartItems) {
    return res.status(400).json({ error: 'Invalid request data.' });
  }

  // Create HTML for item details with name and quantity
  const itemDetailsHtml = cartItems.map(item => `
    <div style="margin-bottom: 10px;">
      <p><strong>Item:</strong> ${item.title}</p>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
    </div>
  `).join('');

  const mailOptions = {
    from: "anjumsaiyad085@gmail.com",
    to: email,
    subject: 'Order Confirmation',
    html: `
      <h2>Thank you for your order, ${name}!</h2>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      <h3>Order Details:</h3>
      ${itemDetailsHtml}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});



