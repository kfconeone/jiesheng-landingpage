export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log(body);
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
        to: " jiesheng.studio@gmail.com", // replace with the recipient email address
        // to: "kfconeone@gmail.com, powerjj@gmail.com, jiesheng.studio@gmail.com", // replace with the recipient email address
        subject: `捷勝設計的諮詢信箱收到${body.company} - ${body.name}的諮詢`, // replace with the email subject
        text: `${body.message}, 電話${body.phone}, email${body.email}`, // replace with the email body
    };

    return await sendMail(transporter, mailOptions);

    // let isSend = false;
    // // send the email
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return {
    //             status: 500,
    //             error: error,
    //         };
    //     } else {
    //         console.log("Email sent: " + info.response);
    //         return {
    //             status: 200,
    //             info: info,
    //         };
    //     }
    // });
});

function sendMail(transporter: any, mailOptions: any) {
    return new Promise((resolve, reject) => {
        // set initial value of isSend to false
        let isSend = false;

        // send the email
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                reject({
                    status: 500,
                    error: error,
                });
            } else {
                console.log("Email sent: " + info.response);
                resolve({
                    status: 200,
                    info: info,
                });
            }
        });
    });
}
