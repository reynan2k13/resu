var express = require('express');
var router = express.Router();


/* GET create page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('adduser', {
            title: 'Add New User',
            titleDel: 'Delete User',
            titleEdit: 'Edit User',
        });
    });
});

router.post('/newuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = req.body.userpassword;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.find({
        username : userName,
        password : userPassword
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("member does not exist in database.");
        }
        else {
           if(doc == ""){
                collection.insert({
                    "username" : userName,
                    "password" : userPassword
                }, function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        req.session.user = userName;
                        // And forward to success page
                        res.redirect("login");

                    }
                });
           }
        }
    });

});

module.exports = router;