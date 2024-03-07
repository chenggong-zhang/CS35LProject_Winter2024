
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const verifiedSender = 'yihengzhu@g.ucla.edu'

async function sendOTPEmail({receiver, otp}) {
    const msg = {
        to: receiver,
        from: verifiedSender,
        subject: 'Rubato: one-time password verification',
        text: `Your Rubato otp is: ${otp}`,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    const response = await sgMail.send(msg);

    console.log('send email response:', response);

    if (response[0].statusCode != 202) {
        return false;
    } 

    return true;
}

async function sendVibeNotificationEmail({receivers}) {
    if(receivers.length == 0) return;

    const msg = {
        to: receivers,
        from: verifiedSender,
        subject: `Rubato: vibe reminder - ${new Date().toISOString().slice(0, 10)}`,
        html: '<strong>Time to vibe! Post your song on Rubato</strong>',
    }

    // add true to prevent seeing others' emails
    const response = await sgMail.send(msg, true);

    // console.log('send email response:', response);

    if (response[0].statusCode != 202) {
        return false;
    } 

    return true;
}

function validateEmail(email) {
    const re = /^([a-zA-Z0-9_\.\-]+)@([\da-zA-Z\.\-]+)\.([a-zA-Z\.]{2,6})$/;
    return re.test(email);

}


module.exports = {
    sendOTPEmail,
    sendVibeNotificationEmail,
    validateEmail
}