const express = require('express');
const router = express.Router();

const checkAuth = require('../../../middleware/checkAuth');
const { getProfile } = require('../methods/getProfile');
const {
  usersDelete,
  getAllUsers,
} = require('../methods');

router.get('/', checkAuth, getProfile);
router.get('/all', getAllUsers);
router.delete('/all', usersDelete);

module.exports = router;