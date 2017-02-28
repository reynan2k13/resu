var express = require('express');
var router = express.Router();


/* GET chat page */
router.get('/', function(req, res) {
	console.log("Session At Login Page: ", req.session.user);
    if(req.session.user == undefined){
        console.log("user is undefined");
      //  res.render("index");

    }else{
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('chat', {
                title: 'Add New User',
                titleDel: 'Delete User',
                titleEdit: 'Edit User',
                username: req.session.user,
                "chat" : docs,
            });
        });
    }
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
                res.redirect("login");
           }
        }
    });
});

module.exports = router;
