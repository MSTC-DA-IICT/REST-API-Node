const url = require('url');

const conf = require('../config/constants');
const { jwtVerifyUser } = require('./jwt');

const isUserValid = (token, uuid) => {
    var tokenDetails = jwtVerifyUser(token, conf.authentication.jwtSecret);
    return tokenDetails.id == uuid;
} 

const verifyUser = async (req, res, next) => {
    try {
        console.log("===============================================");
        let uuid = req.cookies.login;
        let id = req.cookies.user;
        let errorObj = {
            statusCode: 401,
            msg: "Unauthorized access"
        };
        if ((uuid && id)) {
            const isTokenValid = isUserValid(id, uuid);
            if (isTokenValid) {
                next();
            }
            else {
                throw errorObj;
            }
        } else {
            throw errorObj;
        }
    } catch (e) {
        console.log("In catch");
        console.log(e);
        if (req.cookies.login)
            res.clearCookie('login');
        if (req.cookies.user)
            res.clearCookie('user');
        const src = req.path ? req.path : '/';
        return res.redirect(url.format({
            pathname: '/login',
            query: {
                src
            }
        }));
    }
}


module.exports = {
    isUserValid,
    verifyUser
};