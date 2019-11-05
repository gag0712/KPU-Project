var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
	var cid = req.query.cartID;
	res.render('intro',{result: true, cartID:cid});
	console.log(req.query,'req.query');
});

module.exports = router;


//cartid를 session으로 받아서 도메인?cartid=asdf 이렇게 전송