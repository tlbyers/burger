var express = require('express');

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require('../models/burger.js');


//Index Page (render all burgers to DOM)

router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    var exphbsObject = {
      burgers: data
    };
    console.log(exphbsObject);
    res.render('index', exphbsObject);
  });
});

//create a new burger

router.post('/', function(req, res) {
  burger.insertOne([
    'burger_name'
  ], [
    req.body.burger_name
  ], function(data) {
    res.redirect('/');
  });
});

router.put('/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect('/');
  });
});

// Export routes for server.js to use.
module.exports = router;
