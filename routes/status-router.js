const package = require('../package');
const express = require('express');
const router = express.Router();

router.get('/alive', function(req, res){
    res.send('200 ok');
});

router.get('/version',function(req,res){
    res.send(package.version);
});

module.exports = router;