const jwt = require('jsonwebtoken')
const conf = require('../config/constants');

/**
 * Generate JSON web token.
 *
 * @param {Object}   User     - User object that you want to be signed.
 * @param {String}   expiry   - Expiry of the JSON Web Token.
 * @param {String}   secret   - Secret string to sign the JSON Web Token.
 *
 * @returns {String} JSON Web Token for the user signed with secret and validity equal to expiry.
 */
const jwtSignUser = (user, expiry, secret) => {
    return jwt.sign(user, secret, {
        expiresIn: expiry
    })
}

/**
 * Verify JSON Web Token.
 *
 * @param {String}   jwtoken   - Expiry of the JSON Web Token.
 * @param {String}   secret    - Secret string to sign the JSON Web Token.
 *
 * @returns {Object} Decoded data from the JSON Web Token.
 */
const jwtVerifyUser = (jwtoken, secret) => {
    return jwt.verify(jwtoken, secret, (error, decoded) => {
        if (error) return error
        return decoded
    })
}

const jwtValidator = (req, res, next) => {
    if (!req.headers.jwtoken) {
        next({
            statusCode: 499,
            msg: 'Token Required'
        })
    }

    let token = req.headers.jwtoken
    jwt.verify(token, conf.authentication.jwtSecret, function (err, decoded) {
        if (err) {
            console.log('Failed to authenticate token')
            next({
                statusCode: 419,
                msg: `Authentication failed,Invalid jwtoken. ${err.message}`,
            })
        }
        next()
    })
}

module.exports = {
    jwtSignUser,
    jwtVerifyUser,
    jwtValidator
}
