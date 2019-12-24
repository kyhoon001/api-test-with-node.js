const mongoose = require('mongoose');
const User = mongoose.model('User');
const Upload = mongoose.model('Upload');
const only = require('only');
console.log('call : /controllers/users.js');


module.exports.login = async function (req, res) {
    res.render('users/login', {
        pageTitle: "로그인",
        alert: req.flash(),
        isUserLogedIn: req.isAuthenticated()
    })
};

module.exports.signup = async function (req, res) {
    res.render("users/signup", {
        pageTitle: "회원가입",
        alert: req.flash(),
        isUserLogedIn: req.isAuthenticated()
    });
};


module.exports.show = async function (req, res) {

    const host = await User.findOne({
        "email": req.user.email,
    }).exec();

    User.load(host._id, function (user) {
        res.render('users/show', {
            user: user,
            isUserLogedIn: req.isAuthenticated()
        });
    });
};


module.exports.logout = async function (req, res) {
    req.logout();
    res.redirect('/login');
};



module.exports.create = async function (req, res) {


    const user = new User();
    user.email = req.body.user_email;
    user.password = req.body.user_password;
    user.nick = req.body.user_nick;
    user.name = req.body.user_name;

    new User({
        email: req.body.user_email,
        password: req.body.user_password,
        nick: req.body.user_nick,
        name: req.body.user_name,
    }).save((err) => {
        if (err) {
            req.flash('message', err.message);
            res.redirect('/signup');
        } else {
            req.flash('message', "회원가입성공");
            res.redirect('/login');
        }

    });

};
module.exports.deleteUser = async function (req, res) {

    User.findOneAndRemove({
        _id: req.body.id
    }, (err) => {
        if (err) res.status(500).send();
        else res.status(200).send()
    });
};



module.exports.requiresLogin = async (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
};


module.exports.checkUserLogin = async function (req, res) {

    const redirectTo = req.session.returnTo ?
        req.session.returnTo :
        '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
};



exports.update = function (req, res) {
    console.log(req.files.length);

    User.load(req.body.user_id, function (user) {

        user.name = req.body.user_name;
        user.nick = req.body.user_nick;
        user.password = req.body.user_password;
        user.email = req.body.user_email;

        user.save(function (err, result) {

            if (err) {

                res.sendStatus(400)
            }

            if (req.files.length > 0) {

                console.log("파일있음");

                req.files.forEach(function (file) {
                    const upload = new Upload({
                        relatedId: result,
                        type: "user",
                        filename: file.filename,
                        originalname: file.originalname,
                        type: file.mimetype,
                        size: file.size,
                    });

                    upload.save(function (err, result) {
                        user.photo = result;
                        user.save();
                    });

                });
            }

            res.redirect('/logout');
        })
    });
};
