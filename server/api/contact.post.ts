export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const nodemailer = await import("nodemailer");
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jiesheng.studio@gmail.com", // replace with your actual Gmail account email address
            pass: "dbfyzijldznfczgu", // replace with your actual Gmail account password or an application-specific password
        },
    });

    // create a mail options object
    let mailOptions = {
        from: "jiesheng.studio@gmail.com", // replace with your actual Gmail account email address
        to: "kfconeone@gmail.com, powerjj@gmail.com", // replace with the recipient email address
        subject: "Test Email", // replace with the email subject
        text: "Hello World!", // replace with the email body
    };

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    console.log(body);
});
