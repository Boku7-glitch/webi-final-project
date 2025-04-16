const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
    res.render('register', { error: null });
});

router.post('/', (req, res) => {
    const { email, password } = req.body;

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.render('register', { error: "User already exists" });
    }

    const newUser = { email, password };
    users.push(newUser);

    req.session.user = newUser;

    res.redirect('/dashboard');
});

module.exports = router;