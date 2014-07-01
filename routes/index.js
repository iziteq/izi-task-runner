var express = require('express');
var router = express.Router();
var Config = require('config-js');
var config = new Config('./config/config.js');

/* GET home page. */
router.get('/', function(req, res) {
  var commands = config.get('commands');
  res.render('index', { title: 'IZI tasks runner', commands: commands });
});

module.exports = router;
