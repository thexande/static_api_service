var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../config/db')
/* GET angular home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/build/root.html'))
})
router.route('/userList')
  // list all users
  .get((req, res, next) => {
    db.find({}, (err, resp) => {
      res.send(resp)
    })
  })
  // create a new user
  .post((req, res, next) => {
    db.create(req.body)
      .then((resp) => {
        res.sendStatus(200)
      })
  })
  // update an existing user
  .patch((req, res, next) => {
    console.log(req.body);
    db.update({"_id": req.body._id},{
      $set:  {user_data: req.body.user_data}
    }).then((err, resp) => {
        res.sendStatus(200)
    })
  })
  // remove an existing user
  router.route('/user/:_id').delete((req, res, next) => {
    db.remove({"_id": req.params._id}).then((err, resp) => {
      res.sendStatus(200)
    })
  })
module.exports = router;
