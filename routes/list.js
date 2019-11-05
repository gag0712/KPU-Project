var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
 
var connection = mysql.createConnection({
    host: "marketgo.ciswoqlgibik.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    database: "MarketGo",
    password: "12345678"
});



/* GET */
router.get('/', function(req, res, next) {
    var cartID = req.query.cartID;
    var email = req.body.email;
    console.log("## get request");
    console.log(req.body, req.query);
    res.render('list', { title: 'Express', email: email, cartID: cartID, method: "get" });
});

/* POST */
router.post('/', function(req, res, next) {
    console.log('req.body',req.body);
    console.log('req.query',req.query);
   // res.render('login_result', { title: 'Express', id: id, age: age, method: "post" });
});
 
module.exports = router;
