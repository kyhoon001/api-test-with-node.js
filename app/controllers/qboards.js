const mongoose = require('mongoose');

const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Qboard = mongoose.model('Qboard');
const Upload = mongoose.model('Upload');
const only = require('only');
console.log('call : /controllers/qboards.js');


module.exports.qsignup = function (req, res) {
    User.load(req.user.email, function (user) {
        res.render('main/qsignup', {
            user: user,
            isUserLogedIn: req.isAuthenticated()
        });
    });
};



module.exports.qcreate = async function (req, res) {

    const qboard = new Qboard();

    const host = await User.findOne({
        "email": req.user.email,
    }).exec();

    if (host) {

        qboard.nick = host.nick;
        qboard.title = req.body.qboard_title;
        qboard.password = req.body.qboard_password;
        qboard.post = req.body.qboard_post;
        qboard.email = req.user.email;

        new Qboard({
            title: req.body.qboard_title,
            password: req.body.qboard_password,
            post: req.body.qboard_post,
            nick: host.nick,
            email: req.user.email,
        }).save((err) => {
            if (err) {
                req.flash('message', err.message);
                res.redirect('/qsignup');
            } else {
                // req.flash('message', "글 등록 성공");
                res.redirect('/qboard');
            }

        });
    }

};

module.exports.index = function (req, res) {

    Qboard.list(function (qboards) {

        res.render('main/qboard', {
            qboards: qboards,
            isUserLogedIn: req.isAuthenticated()
        });
    });



};

//보기 위함
module.exports.show = async function (req, res) {


    const hhost = await User.findOne({
        "email": req.user.email,
    }).exec();


    Qboard.load(req.params.id, function (qboard) {
        Comment.loadcomment(req.params.id, function (comments) {
            res.render('main/qshow', {
                qboard: qboard,
                comments: comments,
                nick: hhost,
                isUserLogedIn: req.isAuthenticated()
            });
        });
    });

};
