const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('partner');
})

module.exports = router