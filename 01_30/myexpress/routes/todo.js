var express = require('express');
var router = express.Router();



// API / api /books
router.get('/', function(req,res) {
    res.render('todo', { title: 'todo' });

})

router.route('/books')
    //get
    .get( function(req,res) {
        console.log( 'Get /api/books');
        res.send(JSON.stringify(books));
        
    })

    //post
    .post( function(req,res) {
        console.log("Post: ");
        var book = { };
        book.title = req.body.title;
        book.author = req.body.author;
        book.price = req.body.price;

        books.push(book);
        return res.send(book);
    })

    ;


router.route('/books/:id')
    .get(function(req,res,next) {
        console.log('Get /api/books/:id');
        res.send('Request by ID :' + req.params.id);
    })

    .put( function(req,res) {
        var book = { };
        book.title = req.body.title;
        return res.json({ title: book.title, message: 'Book updated!'});
    })
    .delete( function(req,res) {
        var book = { };
        book.title = req.body.title;
        return res.json({message:"ID(" + req.params.id+") Successfully deleted!"});
    })



    ;
module.exports = router;