const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// checking validity of user
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        try {
            if(token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                // console.log(req.user)
                next();
            }
        } catch (err) {
            throw new Error('Not authorized token expired, please login again');
        }
    } else {
        throw new Error('There is no token attached to the header');
    }
});

// checking if admin
const isAdmin = asyncHandler(async (req, res, next) => {
    // console.log(req.user);
    const {email} = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin") {
        throw new Error('You are not an admin');
    } else {
        //pass request
        next();
    }
})



module.exports = {authMiddleware, isAdmin};