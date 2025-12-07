import transporter from "../config/nodemailer.js";

const sendEmail = async (to, subject, text, html) => {
    try{

        const info = await transporter.sendMail({
            from : process.env.USER_EMAIL,
            to,
            subject: subject,
            text : text,
            html : html
        })

        // console.log(info);
    }
    catch(error){
        console.log(error);
    }
}

export default sendEmail;