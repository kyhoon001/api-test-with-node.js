var express = require('express');
var router = express.Router();



// var todolist[{"list" : "1번 할일"}, {"list" : "2번 할일"}];




// API / api /books
router.get('/', function(req,res) {
    res.render('todo', { title: 'todo'});

};





// todo 2번
// router.get('/', function(req,res) {
//     res.render('todo', { title: 'todo', data: todolist });

// })
// )

// router.route('/api/todo')
//     //get
//     .get( function(req,res) {
//         console.log( 'Get /api/todo');
//         res.send(JSON.stringify(todolist));
        
//     })

//     //post
//     .post( function(req,res) {
//         console.log("Post: ");
//         var todolist = { };
//         todolist.list = req.body.list;

//         todolist.push(todolist);
//         return res.send(todolist);
//     })

//     ;


// router.route('/api/todo/:id')
//     .get(function(req,res,next) {
//         console.log('Get /api/todo/:id');
//         res.send('Request by ID :' + req.params.id);
//     })

//     .put( function(req,res) {
//         var todolist = { };
//         todolist.list = req.body.list;
//         return res.json({ list: todolist.list, message: 'list updated!'});
//     })
//     .delete( function(req,res) {
//         var book = { };
//         todolist.list = req.body.list;
//         return res.json({message:"ID(" + req.params.id+") Successfully deleted!"});
//     })



//    ;
module.exports = router;