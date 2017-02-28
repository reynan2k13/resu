var express = require('express');
var router = express.Router();


/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
        	title: 'Add New User',
        	titleDel: 'Delete User',
        	titleEdit: 'Edit User',
            "userlist" : docs,

        });
    });
});


/* POST to Add User Service */
router.post('/add', function(req, res) {

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
                        // And forward to success page
                        res.redirect("userlist");
                    }
                });
           }
        }
    });

});

/* POST to delete User Service */
router.post('/deluser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({
        "username" : userName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem deleting the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* POST to edit User Service */
router.post('/edituser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = req.body.userpassword;
    var newUserName = req.body.newusername;
    var newUserPassword = req.body.newuserpassword;

    // Set our collection
    var collection = db.get('usercollection');

    //Submit to the DB
    collection.update({
        "username" : userName
    	},
	    {$set: { username : newUserName }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem edit the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });

});

/* POST to login User Service */
router.post('/chat', function(req, res) {

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
            res.status("member does not exist in database.");
        }
        else {
           if(doc!= ""){
           		req.session.user = userName;
                console.log(userName);
                // And forward to success page
                res.render("chat", { username:  req.session.user });
           }
           else{
                console.log("Invalid username");
                res.redirect("/");
           }
        }
    });
});

module.exports = router;
