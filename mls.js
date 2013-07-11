//base uri = http://www.redfin.com/stingray/do/query-location?location={#MLS}&market=seattle 

var http = require('http');

var callback = function(response) {
  var str = '';

  response.on('data', function(chunk) {
    str += chunk;
  });  
  response.on('end', function(chunk) {
    console.log(str);
    var result = JSON.parse(str.substring(5));
    
    var url_path = result.listings[0].URL;
    console.log(url_path);
    var terminal = require('child_process').spawn('bash');
 
    terminal.stdin.write('google-chrome "http://www.redfin.com"' + url_path + ' & ');
    terminal.stdin.end();
  });
}

console.log(JSON.stringify(process.argv));

for (var i = 2; i < process.argv.length; i++) {
  var mls_number = process.argv[i];
  var options = {
    host: "www.redfin.com",
    path: "/stingray/do/query-location?location=" + mls_number + "&market=seattle",
    headers: {"User-Agent": "curl/7.29.0"}
  }
  console.log("Searching for MLS#" + mls_number);
  http.request(options, callback).end();
}
