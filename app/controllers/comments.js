const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const Nboard = mongoose.model('Nboard');
const Upload = mongoose.model('Upload');
const only = require('only');
console.log('call : /controllers/comment.js');


module.exports.nsignup = function (req, res) {
    User.load(req.user.email, function (user) {
        res.render('main/nsignup', {
            user: user,
            isUserLogedIn: req.isAuthenticated()
        });
    });
};



module.exports.nccreate = async function (req, res) {

    const comment = new Comment();


    comment.comment = req.body.comment_comment;
    comment.post = req.body.comment_post;
    comment.nick = req.body.comment_nick;

    new Comment({
        comment: req.body.comment_comment,
        post: req.body.comment_post,
        nick: req.body.comment_nick,
    }).save((err) => {
        if (err) {
            req.flash('message', err.message);
            res.redirect('/');
        } else {
            res.redirect('/nshow/' + req.body.comment_post);
        }

    });
};

module.exports.qccreate = async function (req, res) {

    const comment = new Comment();


    comment.comment = req.body.comment_comment;
    comment.post = req.body.comment_post;
    comment.nick = req.body.comment_nick;

    new Comment({
        comment: req.body.comment_comment,
        post: req.body.comment_post,
        nick: req.body.comment_nick,
    }).save((err) => {
        if (err) {
            req.flash('message', err.message);
            res.redirect('/');
        } else {
            res.redirect('/qshow/' + req.body.comment_post);
        }

    });
};






module.exports.show = async function (req, res) {



    Comment.list(function (comments) {

        res.render('main/nshow', {
            comments: comments,
            isUserLogedIn: req.isAuthenticated()
        });
    });

}
