const { User } = require('../models');

const otpGenerator = require('otp-generator');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const expireTimeInMinutes = 10;

const accessTokenExp = 1 * 10 * 60;          // 10 minutes
const refreshTokenExp = 30 * 24 * 60 * 60   // 30 days

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET
};

// Create middleware to authenticate JWT tokens
const jwt_strategy = new JwtStrategy(
    jwtOptions,
    async (payload, done) => {
        try {
            // Find the user specified in token
            const user = await User.findById(payload.sub);

            // If user doesn't exists, handle it
            if (!user) {
                return done(null, false);
            }

            // Otherwise, return the user
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    }
);

passport.use(jwt_strategy);
const passportJWT = passport.authenticate('jwt', { session: false })


/**
 * Create a new OTP for the user
 *
 * @param   {Object}  user  The user object
 * 
 * @returns {Object}        The updated user object
 */
async function emailOTPAuth({ user }) {
    const temp_code = generateOTP(expireTimeInMinutes);

    user.temp_code = temp_code;
    user.markModified('temp_code');
    await user.save();

    return user;
}

/**
 * Verify the OTP for the user
 *
 * @param   {string}  email  The user's email
 * @param   {string}  otp    The OTP entered by the user
 * 
 * @returns {ok: boolean, 
 *           error?: string, 
 *           user?: Object, 
 *           accessToken?: string
 *           refreshToken?: string} ok and error if failed, ok and user and accessToken and refreshToken if success
 */
async function emailOTPVerify({ email, otp }) {
    const user = await User.findOne({ email });

    if (!user) return { ok: false, error: 'User not found' };

    if (user.temp_code.otp !== otp) return { ok: false, error: 'Invalid OTP' };

    if (user.temp_code.exp < Date.now()) return { ok: false, error: 'OTP expired' };

    user.temp_code = null;
    user.markModified('temp_code');

    const user_id = user._id.toString();

    const accessToken = signAccessToken(user_id, accessTokenExp);
    const refreshToken = signRefreshToken(user_id, refreshTokenExp);

    user.refresh_token = refreshToken;
    await user.save();

    return { ok: true, user, accessToken, refreshToken };
}

/**
 * Refresh the access token for the user
 *
 * @param   {string}  refreshToken  The refresh token provided by the user
 * 
 * @returns {ok: boolean, 
 *           error?: string, 
 *           accessToken?: string} ok and error if failed, ok and accessToken if success
 */
async function refreshAccessToken({ refreshToken }) {
    const decodedPayload = JWT.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user_id = decodedPayload.sub;

    const user = await User.findById(user_id);

    if (!user) return { ok: false, error: 'User not found' };

    if (user.refresh_token !== refreshToken) return { ok: false, error: 'Invalid refresh token' };

    const accessToken = signAccessToken(user_id, accessTokenExp);

    return { ok: true, accessToken };
}

/**
 * Refresh the access token for the user
 *
 * @param   {string}  refreshToken  The refresh token provided by the user
 * 
 * @returns {ok: boolean, 
*           error?: string, 
*           accessToken?: string} ok and error if failed, ok and accessToken if success
*/
async function logout({ user_id }) {
    const user = await User.findById(user_id);

    if (!user) return { ok: false, error: 'User not found' };

    user.refresh_token = null;
    user.markModified('refresh_token');
    await user.save();

    return { ok: true };
}


// helper functions

/**
 * Generate a new OTP
 *
 * @param   {number}  expireTimeInMinutes  The time in minutes before the OTP expires
 * 
 * @returns {otp: string, exp: Date} The OTP and the expiration time
*/
function generateOTP(expireTimeInMinutes) {

    const otp = otpGenerator.generate(6,
        {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: false,
            specialChars: false
        }
    );
    return {
        otp: otp,
        exp: Date.now() + expireTimeInMinutes * 60 * 1000
    }
}

/**
 * Sign an access token
 *
 * @param   {string}  user_id         The user's id
 * @param   {number}  accessTokenExp  The expiration time of the access token as a timestamp
 * 
 * @returns {string}                  The access token
*/
function signAccessToken(user_id, accessTokenExp) {
    return JWT.sign({
        iss: 'rubato',
        sub: user_id,
        iat: Math.floor(Date.now() / 1000), // current time
        exp: Math.floor(Date.now() / 1000) + accessTokenExp  // exp: number of seconds since the epoch - 10 minutes from now
    }, ACCESS_TOKEN_SECRET);
};

/**
 * Sign an access token
 *
 * @param   {string}  user_id          The user's id
 * @param   {number}  refreshTokenExp  The expiration time of the refresh token as a timestamp
 * 
 * @returns {string}                   The access token
*/
function signRefreshToken(user_id, refreshTokenExp) {
    return JWT.sign({
        iss: 'rubato',
        sub: user_id,
        iat: Math.floor(Date.now() / 1000), // current time
        exp: Math.floor(Date.now() / 1000) + refreshTokenExp // exp: number of seconds since the epoch - 30 days from now
    }, REFRESH_TOKEN_SECRET)
}

module.exports = {
    passportJWT,
    emailOTPAuth,
    emailOTPVerify,
    refreshAccessToken,
    logout,
    expireTimeInMinutes
}