var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/build/root.html'))
})

router.get('/userList', function(req, res, next){
  db.find({}, (err, resp) => {
    res.send(resp[0].users)
  })
  // res.send(Object.keys(db))
})

module.exports = router;
