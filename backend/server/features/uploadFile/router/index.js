const express = require('express');
const router = express.Router();

const { upload, savePhoto } = require('../methods');
const checkAuth = require('../../../middleware/checkAuth');

router.post('/', checkAuth, upload.single('photo'), savePhoto);

module.exports = router;