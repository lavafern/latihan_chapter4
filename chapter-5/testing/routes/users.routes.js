var express = require('express');
var router = express.Router();
const {create,findUser} = require('../controllers/users.controllers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', create)
router.get('/users/:id', findUser)

module.exports = router;
