const express = require('express');
const { getUserById } = require('../controllers/user-controllers');

const router = express.Router();

router.get('/:userId', getUserById);

module.exports = router;