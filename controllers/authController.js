const User = require('../models/User');
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    const errors = {
        email: '',
        password : ''
    }
    if (err.code === 11000) {
        errors.email = 'Email already exists'
    }
    if (err._message === 'User validation failed') {
        errors.email = err.errors.email ? err.errors.email.properties.message : ''
        errors.password = err.errors.password ? err.errors.password.properties.message : ''
    }
    return errors
}   

const returnSignupPage = (req, res) => {
    res.render('signup')
}

const returnLoginPage = (req, res) => {
    res.render('login')
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        //Access token
        const token = jwt.sign({
            user: user._id
        }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(500).json({errors})
    }
}

const loginUser = (req, res) => {
    //Code
}

const logoutUser = (req, res) => {
    
}

module.exports = {
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}