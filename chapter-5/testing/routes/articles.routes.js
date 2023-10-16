var express = require('express');
var router = express.Router();
const {createArticle} = require('../controllers/articles.controllers')

router.post('/article/:userId',createArticle)

module.exports = router;
