const express = require('express');
const router = express.Router();

const { signIn } = require('../methods');

router.post('/', signIn);

module.exports = router;