var express = require('express');
var router = express.Router();
var books = [{
  "title": "코딩의 즐거움!!!",
  "author" : "고강태",
},
{
  "title" : "코딩의 즐거움!!!",
  "author" : "고강태",
}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: ['1',100,'hello'] });
});


// API / api /books
router.get('/books', function(req,res,next) {
  console.log(JSON.stringify(books));
  res.render('books', { title: 'Express', data: books });
  //JSON.stringify(books)
})
module.exports = router;
