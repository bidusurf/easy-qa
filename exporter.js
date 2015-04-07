var fs = require('fs');
var transform = require('stream-transform');
var request = require('request');

var output = fs.createWriteStream('info_job.csv');
var input = request({ method: 'GET'
    , uri: 'http://localhost:9000/api/questions/'
    , headers: { 'content-type': 'application/json'}
    , json: true});
var transformer = transform(function(response){
  records = JSON.parse(response.toString());
  var lines = [];
  for (var i = 0; i < records.length; i++) {
      record = records[i];
      var line = [];
      line.push(record.language);
      line.push(record.level);
      line.push(record.context);
      line.push(record.question);
      lines.push(line.join(','));
  }
  // console.log(lines);
  return lines.join('\n');
});

input.pipe(transformer).pipe(output);
// input.pipe(transformer).pipe(process.stdout);
// input.pipe(transformer);
// input.pipe(process.stdout);
