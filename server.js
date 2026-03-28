const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// SMTP configuration for GMX
const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@gmx.de',  // replace with your GMX email
        pass: 'your_email_password'  // replace with your GMX password
    }
});

// POST endpoint to send email
app.post('/api/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'sandhan.westphal@gmx.de',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
