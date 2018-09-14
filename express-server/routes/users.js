var express = require('express');
const mongoose = require('mongoose');

var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
        .select('name _id')
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                users: docs.map( doc => {
                    return {
                        name: doc.name,
                        _id: doc._id,    
                    }
                })
            };
            //console.log(docs);
            res.status(200).json(response);
            
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });
});

router.post('/', (req, res, next) => {

  const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
  });

  user
      .save()
      .then( result => {
          console.log(result);
          res.status(200).json({
              message: "User Created",
              User:{
                  name: result.name,
                  _id: result._id,
              }
          });
          
      }).catch( error => {
          console.log(error);
          res.status(500).json({
              error: error
          });
          
      });

 
});
module.exports = router;
