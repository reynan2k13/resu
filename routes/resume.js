var express = require('express');
var router = express.Router();


/* GET resume page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('resume', {
            title: 'Add New User',
            titleDel: 'Delete User',
            titleEdit: 'Edit User',
        });
    });
});

module.exports = router;