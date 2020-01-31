function add(a, b) { return a+ b }

console.log("a + b = " + add(100,200))

setTimeout( function() {
    console.log("Hello,world!");
}, 2000);
console.log("Time Out!!");


var http = require("http"),
PORT = 1234;

http.createServer(function (req, res) {
    res.writeHead(200, {'content-Type' : 'text/html'});
    res.end("<meta charset='utf-8'> <h1> 호랑이 고라니 </h1>")
}).listen( PORT, '127.0.0.1');

console.log('Server running at http://127.0.0.1:' + PORT);