const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const Nboard = mongoose.model('Nboard');
const Upload = mongoose.model('Upload');
const only = require('only');
console.log('call : /controllers/nboards.js');


module.exports.nsignup = function (req, res) {
    User.load(req.user.email, function (user) {
        res.render('main/nsignup', {
            user: user,
            isUserLogedIn: req.isAuthenticated()
        });
    });
};




module.exports.ncreate = async function (req, res) {


    const nboard = new Nboard();

    const host = await User.findOne({
        "email": req.user.email,
    }).exec();

    if (host) {

        nboard.nick = host.nick;
        nboard.title = req.body.nboard_title;
        nboard.password = req.body.nboard_password;
        nboard.post = req.body.nboard_post;
        nboard.email = req.user.email;

        new Nboard({
            title: req.body.nboard_title,
            password: req.body.nboard_password,
            post: req.body.nboard_post,
            nick: host.nick,
            email: req.user.email,
        }).save((err) => {
            if (err) {
                req.flash('message', err.message);
                res.redirect('/nsignup');
            } else {
                res.redirect('/nboard');
            }

        });
    }

};
module.exports.index = function (req, res) {

    Nboard.list(function (nboards) {

        res.render('main/nboard', {
            nboards: nboards,
            isUserLogedIn: req.isAuthenticated()
        });
    });



};

//보기 위함
module.exports.show = async function (req, res) {


    const hhost = await User.findOne({
        "email": req.user.email,
    }).exec();


    Nboard.load(req.params.id, function (nboard) {
        Comment.loadcomment(req.params.id, function (comments) {
            res.render('main/nshow', {
                nboard: nboard,
                comments: comments,
                nick: hhost,
                isUserLogedIn: req.isAuthenticated()
            });
        });
    });




};
