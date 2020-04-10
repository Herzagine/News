const express = require('express');
const router = new express.Router();
const path = require('path');

router.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '../images/', 'logout.svg'));
});

module.exports = router;
