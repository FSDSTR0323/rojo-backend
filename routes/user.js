var express = require('express');
var router = express.Router();

const { User } = require('../database')

/* GET home page. */
router.get('/:id?', (req, res, next) => {
  User.find({}).then(userDoc => console.log(userDoc))
  res.send('user OK');
});



module.exports = router;
