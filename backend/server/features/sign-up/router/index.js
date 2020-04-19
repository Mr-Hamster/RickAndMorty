const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { signUp } = require('../methods');

router.post('/', [
    check('email', 'Please enter a valid email!').isEmail(),
    check('password', 'The password should contain at least 6 symbols!').isLength({ min: 6 }),
  ], signUp);

module.exports = router;