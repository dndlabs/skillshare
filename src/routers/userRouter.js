const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.post('/users/register', async (req, res) => {
    let user = new User(req.body);
    try {
        let token = await user.generateToken();
        res.status(201).send(user + token);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        let user = await User.findByCredentials(req.body.username, req.body.password);
        let token = await user.generateToken();
        res.send('User logged in' + token)
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logout', async (req, res) => {
    try {

    } catch (e) {
        
    }
})

module.exports = router;