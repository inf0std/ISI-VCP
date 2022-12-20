const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const bodyparser = require("body-parser")
const { User } = require("../../schema/User")


const loginrequired = async(req, res, next) => {
    const token = req.cookies['access-token']
    if (token) {
        const validatoken = await jwt.verify(token, process.env.JWT_SECRET)
        if (validatoken) {
            res.user = validatoken._id
            next();
        } else {
            console.log('token expires')
        }
    } else {
        console.log('token not found')
    }
}
const verifiedemail = async(req, res, next) => {
    User.findOne({ 'login.email': req.body.email }).then(user => {
        if (user.isverified == true) {
            next();
        } else {
            console.log('please check your email to verify your account')
        }
    })

}


module.exports = { loginrequired, verifiedemail }