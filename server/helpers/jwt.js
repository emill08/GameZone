const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = 'rumpinosecret'

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

function signToken(payload) {
    return jwt.sign(payload, secret)
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { hashPassword, comparePassword, signToken, verifyToken }