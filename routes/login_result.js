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
    var email = req.query.userEmail;
    var pwd = req.query.userPwd;
    console.log("## get request");
    res.render('login_result', { email: email, pwd: pwd, method: "get" });
});

/* POST */
router.post('/', function(req, res, next) {
    console.log('req.body',req.body);
    var email = req.body.userEmail;
    var pwd = req.body.userPwd;
    var cartID = req.query.cartID;
    var cID= req.query.cartID;
    var sql = 'select * from Users where UserEmail = ?'
    console.log("## login request");
    console.log(cartID);
    
    connection.query(sql, email, function (err, result) {
        if (err)
            console.log(err)
        else {
            if (result.length === 0) {
                // res.json({
                //     result: false,
                //     msg: '존재하지 않는 계정입니다!'
                    
                // });
 
                res.render('intro', {result: false, cartID: cID, method: "get" });
            } else if (pwd !== result[0].UserPwd) {
                // res.json({
                //     result: false,
                //     msg: '비밀번호가 틀렸습니다!'
                // });
 
                res.render('intro', {result: false, cartID: cID, method: "get" });
                
            } else {
                // res.json({
                //     result: true,
                //     msg: '로그인 성공!',
                //     user_email: email,
                //     user_name: result[0].UserName,
                //     user_id: result[0].UserID
                // });
                var sql2 = 'select * from Products where ProductPlaced = ?'
                connection.query(sql2, cartID, function (err, result) {
                    if (err)
                        console.log(err)
                    else {
                        res.render('list', { title:"list", email: email, cartID: cartID, result: result, method: "post" });
                    }
                })
            }

        }
    })
});
 
module.exports = router;
