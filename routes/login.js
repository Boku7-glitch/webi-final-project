const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.send(`Welcome, ${req.session.user.email}`);
});

router.post('/', (req, res) => {
    const { email, password } = req.body;

    const fakeUser = {
        email: 'test@example.com',
        password: '123456'
    };

    if (email === fakeUser.email && password === fakeUser.password) {
        req.session.user = fakeUser;
        return res.redirect('/dashboard');
    } else {
        return res.render('login', { error: 'Invalid email or password' });
    }
});

module.exports = router;