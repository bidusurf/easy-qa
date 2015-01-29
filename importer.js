var fs = require('fs');
var csv = require('csv');
var transform = require('stream-transform');
var request = require('request');

var output = [];
var parser = csv.parse({delimiter: ';'})
var input = fs.createReadStream(process.argv[2]);
var transformer = transform(function(record, callback){
  setTimeout(function(){
    var recordToPost = {
    	language: record[0],
    	level: record[1],
    	context: record[2],
    	question: record[3],
    	answers: [
    		{
    			answer: record[4],
    			isCorrect: true
    		},
    		{
    			answer: record[5],
    			isCorrect: false
    		},
    		{
    			answer: record[6],
    			isCorrect: false
    		},
    		{
    			answer: record[7],
    			isCorrect: false
    		}
    	],
    	author: record[9]
    }
    request.post('http://localhost:9000/api/questions/', {form: recordToPost});
  }, 500);
}, {parallel: 10});
var postRecord = function(record) {
	console.log(record);
}
input.pipe(parser).pipe(transformer)
