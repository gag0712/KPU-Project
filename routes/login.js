var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	var cid = req.query.cartID;
	res.render('login',{title: 'Express',cartID:cid});
});

module.exports = router;
