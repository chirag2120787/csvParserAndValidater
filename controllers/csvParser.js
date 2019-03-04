var fs = require('fs'); // TO READ THE CSV FILE FROM THE DISK
var parse = require('csv-parse'); //NPM PACKAGE (parses the CSV)
var isUrl = require('is-url'); //NPM PACKAGE (Checks whether the URL is valid or not)

/*
      * @name    : parsingCsv
      * @params  : 
      * @return  : Object(Parsed data)  
      * @desc    : Reads the csv file from disk and parse it and prints invalid rows data
*/
function parsingCsv(){
    var csvTesting = './hotels.csv';
    var csvData=[];
    var invalidRows = [];
    fs.createReadStream(csvTesting)
    .pipe(parse({
        delimiter: ',',
        columns:true
    }))
    .on('data', function(csvrow) {
        var valid = validatingData(csvrow);
        if(valid==true){
            csvData.push(csvrow);
        }else{
            invalidRows.push(csvrow);
        }
    })
    .on('end',function() {
      console.log('LIST OF INVALID ROWS -> \n',invalidRows);
    });
    return csvData;
}

/*
      * @name    : tableData
      * @params  : request, response, callback
      * @return  : send parsed data to client  
      * @desc    : calls parsingCsv function to get parsed & validated data
*/
function tableData(req,res,done){
    var data = parsingCsv();
    setTimeout(function(){
        res.send(data);
    },500)
}


/*
      * @name    : validatingData
      * @params  : object with fields as keys and corresponding data as value
      * @return  : Boolean (true or false) 
      * @desc    : Validates the data for each field (name,stars,uri)
*/
function validatingData(csvrow){
    var isValid = false;
    for (const field in csvrow) {
    if(field == 'name'){
        isValid = isUtf8(csvrow[field]);
        if(isValid==false){
            console.log('Name should be a UTF8 only but found ', csvrow[field]+' in ',csvrow)
            return isValid;
        }
    }else if(field == 'stars'){
        if(csvrow[field]>=0 && csvrow[field]<=5){
            isValid = true;
        }else {
            isValid = false
            console.log('Rating should only be from 0 to 5 but found ', csvrow[field]+' in ',csvrow);
            return isValid;
        };
    } 
    else if(field == 'uri'){
        isValid = isUrl(csvrow[field]);
        if(isValid==false){
            console.log('Invalid URL found, ', csvrow[field]+' in ',csvrow)
            return isValid;
        }
    }
    }
    return isValid;
}


/*
      * @name    : isUtf8
      * @params  : string (name of the hotel)
      * @return  : Boolean (true or false) 
      * @desc    : Validates the name field to be a UTF8
*/
function isUtf8(str) {
    var re = /[A-Za-z\u00C0-\u00FF ]+/;
    return re.test(str);;
}

/*
      * @name    : outputJson
      * @params  : request, response, callback
      * @return  : send data in json format to client
      * @desc    : calls csvParsing() function to validate and get parsed data
*/
function outputJson(req,res,done){
    var data = parsingCsv();
    setTimeout(function(){
        res.send(JSON.stringify(data));
    },500)
}


exports.tableData = tableData;
exports.outputJson = outputJson;