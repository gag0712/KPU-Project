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

router.post('/', function (req, res) {
    var email = req.body.userEmail;
    var password = req.body.userPwd;
    var name = req.body.userName;
    var cartID = req.query.cartID;
    var sql = 'INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)';
    var params = [email, password, name];

    connection.query(sql, params, function (err, result) {
        if (err)
            console.log(err);
        else {
            // res.json({
            //     result: true,
            //     msg: '회원가입에 성공했습니다.'
            // })

            var sql2 = 'select * from Products where ProductPlaced = ?'
                connection.query(sql2, cartID, function (err, result) {
                    if (err)
                        console.log(err)
                    else {
                        res.render('list', { title:"list", email: email, cartID: cartID, result: result, method: "post" });
                        
                    }
                })
            
        }
    });
});

 
module.exports = router;
