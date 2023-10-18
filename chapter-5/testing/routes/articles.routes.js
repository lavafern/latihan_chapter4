var express = require('express');
var router = express.Router();
const {createArticle} = require('../controllers/articles.controllers')
const { getAll, getById } = require('../controllers/articles.controllers');


router.post('/article/:userId',createArticle)
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;
