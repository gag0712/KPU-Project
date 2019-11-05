var mysql = require('mysql');
var express = require('express');;
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs=require('fs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('views','./views');
app.set('view engine','ejs');

var login=require('./routes/login');
var login_result=require('./routes/login_result');
var intro=require('./routes/intro');
var join=require('./routes/join');
var join_result=require('./routes/join_result');

app.use('/login',login);
app.use('/login_result',login_result);
app.use('/intro',intro);
app.use('/join',join);
app.use('/join_result',join_result);
//var users=require('/routes/users');

app.listen(8080, function () {
    console.log('서버 실행 중...');
});


var connection = mysql.createConnection({
   host: 'marketgo.ciswoqlgibik.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'MarketGo'
});

app.get('/login', function (req, res){ 
    res.send('hello world');
   
});

app.post('/user/join', function (req, res) {
    var email = req.body.userEmail;
    var password = req.body.userPwd;
    var name = req.body.userName;
    
    var sql = 'INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)';
    var params = [email, password, name];

    connection.query(sql, params, function (err, result) {
        if (err)
            console.log(err);
        else {
            res.json({
                result: true,
                msg: '회원가입에 성공했습니다.'
            })
        }
    });
});
app.post('/products/tag', function (req, res){
    console.log('tag');
    console.log('req.body ',req.body);

    var tags = req.body.tags;
    var cart = req.body.cartID;
    var sql = 'update Products set ProductPlaced = ? where ProductID = ?';
    var params = [cart,tags];
   
    connection.query(sql, params, function (err, result) {
	if(err)
	    console.log(err);
	else{
	    res.json({
		result: true,
		msg: 'cart added'
	    })
	}
    });
});


app.post('/user/login', function (req, res) {
    console.log('로그인 진입');   
    
    console.log('req.body ',req.body);
   // var obj = JSON.parse(req.body);
   // console.log(obj.userEmail);
   // console.log(obj.userPwd);

    var email = req.body.userEmail;
    var pwd = req.body.userPwd;
    var sql = 'select * from Users where UserEmail = ?';
  	

	console.log('email ',email);
	console.log('pwd ',pwd);
	console.log('req.body ',req.body);

    connection.query(sql, email, function (err, result) {
        if (err)
            console.log(err)
        else {
            if (result.length === 0) {
                res.json({
                    result: false,
                    msg: '존재하지 않는 계정입니다!'
                });
            } else if (pwd !== result[0].UserPwd) {
                res.json({
                    result: false,
                    msg: '비밀번호가 틀렸습니다!'
                });
            } else {
                res.json({
                    result: true,
                    msg: '로그인 성공!',
                    user_email: email,
                    user_name: result[0].UserName,
                    user_id: result[0].UserID
                });
            }

        }
    })
});

app.get('/imgs',function(req,res){
    fs.readFile('logo.jpg',function(error,data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});