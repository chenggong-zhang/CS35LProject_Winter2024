
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const verifiedSender = 'yihengzhu@g.ucla.edu'

/**
 * Sends an email with a one-time password (OTP) to the user's email address.
 *
 * @param   {string}    receiver    The user's email address
 * @param   {string}    otp         The one-time password (OTP) to be sent to the user
 * @param   {number}    expireTimeInMinutes    The time (in minutes) that the OTP will expire
 * 
 * @returns {boolean}               True if the email is sent successfully, false otherwise
 */
async function sendOTPEmail({ receiver, otp, expireTimeInMinutes }) {
    const msg = {
        to: receiver,
        from: verifiedSender,
        subject: 'Rubato: one-time password verification',
        text: `Your Rubato otp is: ${otp}. It will expire in ${expireTimeInMinutes} minutes.`,
    }

    const response = await sgMail.send(msg);

    if (response[0].statusCode != 202) {
        return false;
    }

    return true;
}

/**
 * Send notification emails to all receivers
 * 
 * @param   {string[]}  receivers   An array of email addresses to send the notification to
 * 
 * @returns {boolean}               True if the email is sent successfully, false otherwise
 */
async function sendVibeNotificationEmail({ receivers }) {
    if (receivers.length == 0) return;

    const msg = {
        to: receivers,
        from: verifiedSender,
        subject: `Rubato: vibe reminder - ${new Date().toISOString().slice(0, 10)}`,
        html: '<strong>Time to vibe! Post your song on Rubato</strong>',
    }

    // add true to prevent leaking other people's emails
    const response = await sgMail.send(msg, true);

    if (response[0].statusCode != 202) {
        return false;
    }

    return true;
}

/**
 * Validate email address
 * 
 * @param   {string}  email   an email to be validated
 * 
 * @returns {boolean}         True if the email is sent successfully, false otherwise
 */
function validateEmail(email) {
    const re = /^([a-zA-Z0-9_\.\-]+)@([\da-zA-Z\.\-]+)\.([a-zA-Z\.]{2,6})$/;
    return re.test(email);

}


module.exports = {
    sendOTPEmail,
    sendVibeNotificationEmail,
    validateEmail
}