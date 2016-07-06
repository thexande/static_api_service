var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/build/root.html'))
})

router.route('/userList')
  .get((req, res, next) => {
    db.find({}, (err, resp) => {
      res.send(resp)
    })
  })
  .post((req, res, next) => {
    // lets create our new user.
    db.create(req.body)
      .then((resp) => {
        res.sendStatus(200)
      })
  })
  .patch((req, res, next) => {
    console.log(req.body);
    db.update({"_id": req.body._id},{
      $set:  {user_data: req.body.user_data}
    }).then((err, resp) => {
      console.log(err, resp);
        res.sendStatus(200)
    })
  })
// router.route('/user/:id')
//   .get((req, res, next) => {
//     db.find({}, (err, resp) => {
//       var passedId = req.params.id
//       var userRecord = resp[0].users.filter((index) => {
//         return index.user_data.id == passedId
//       })
//       res.send(userRecord)
//     })
//   })
//   .patch((req, res, next) => {
//     console.log(req.params);
//     res.send(req.params)
//
//   })


module.exports = router;
