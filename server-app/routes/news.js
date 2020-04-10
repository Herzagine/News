const express = require('express');
const router = new express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.listNews);
router.post('/', newsController.createNews);
router.get('/images/:id', newsController.getImage);

module.exports = router;
