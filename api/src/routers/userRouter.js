const express = require('express');
const router = new express.Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.post('/users/register', async (req, res) => {
    let user = new User(req.body);
    try {
        let token = await user.generateToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        console.log(req.body.username, req.body.password)
        let user = await User.findByCredentials(req.body.username, req.body.password);
       
        let token = await user.generateToken();
        res.send({token})
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password', 'email'];
    const isValidOp = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOp) {
        return res.status(400).send('Error: invalid update');
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        if (!req.user) {
            res.status(404).send();
        }
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }

})

router.get('/users/secret', auth, async (req, res) => {
    try {
        res.send('This is secret');
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;