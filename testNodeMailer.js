const nodemailer = require('nodemailer');

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {

    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: "your user Email", pass: "passwword" },
        // tls: { rejectUnauthorized: false }
    })


    let mailOption = {
        from: '<example.com>',  //sender email address
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }

    return await transport.sendMail(mailOption)
}

module.exports = EmailSend;