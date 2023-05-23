const express = require('express');
const app = express();
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const cors = require("cors");
require("dotenv").config();


//middleware
app.use(express.static('public'));


const corsOptions = {
    origin : "https://localhost:3000"
}

app.use(express.json())
app.use(cors(corsOptions));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactusx01@gmail.com',
            pass: 'slhpcufvyingaekq'
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    const mailOptions = {
        from: req.body.email,
        to: 'contactusx01@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

// connect MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}).catch(err => {
    console.log(err);
})


//route
app.get("/", () => {
    res.status(201).json({ message: "Connected to Backend!" });
})