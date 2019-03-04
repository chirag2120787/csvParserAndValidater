var express = require('express');
var router = express.Router();
var csvParserController = require('../controllers/csvParser')

/* GET home page. */
router.get('/', function(req,res,done){
    res.render('index',{ title: 'Express' });
});

/* CALLS the parsingCsv function of controller csvParser ON /parseCsv end point */ 
router.get('/tableData', csvParserController.tableData);

router.get('/outputJson', csvParserController.outputJson);


module.exports = router;
