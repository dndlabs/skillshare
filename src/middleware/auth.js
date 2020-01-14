const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secretkeygoeshere');
        const user = await User.findById({ _id: decoded._id, 'tokens.token': token });
        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        // const user = await User.findById()
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' + e });
    }
}

module.exports = auth;