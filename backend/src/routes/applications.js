const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Applications route OK'));

module.exports = router; 