const Pills = require('../app/controllers/pills');
const apiExternal = require('../app/controllers/ExternalController');
const qboards = require('../app/controllers/qboards');
const nboards = require('../app/controllers/nboards');
const comments = require('../app/controllers/comments');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const auth = require("../app/controllers/AuthController");

console.log('call : /config/routes.js');


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {

        file.uploadedFile = {
            name: mongoose.Types.ObjectId(),
            ext: file.mimetype.split('/')[1]
        };
        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
});

const uploads = multer({
    storage: storage
});

module.exports = function (app, passport) {

    app.get("/", ((req, res) => res.redirect('/external')));
    app.get("/external", apiExternal.index);

    app.get("/external/result", apiExternal.result);
    app.get("/pills/result", Pills.result);


    //유저관련

    app.get('/show', auth.requiresLogin, auth.show);
    app.delete("/show/delete", auth.requiresLogin, auth.deleteUser);
    app.post('/update', uploads.any(), auth.update);


    //qboard

    app.get('/qboard', qboards.index);
    app.get('/qsignup', auth.requiresLogin, qboards.qsignup);
    app.get('/qshow/:id', auth.requiresLogin, qboards.show); //개별 사용자에 대한 정보를 view를 통해 출력하기 위한 라우팅

    //nboard
    app.get('/nboard', nboards.index);
    app.get('/nsignup', auth.requiresLogin, nboards.nsignup);
    app.get('/nshow/:id', auth.requiresLogin, nboards.show); //개별 사용자에 대한 정보를 view를 통해 출력하기 위한 라우팅

    //로그인관련

    app.get('/login', auth.login);
    app.get('/signup', auth.signup);

    //로그아웃
    app.get('/logout', auth.logout);

    app.post("/login_user", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }), auth.checkUserLogin);



    //유저생성
    app.post('/create', auth.create);
    app.post('/ncreate', nboards.ncreate);
    app.post('/qcreate', qboards.qcreate);


    //댓글작성

    app.post('/nccreate', comments.nccreate);
    app.post('/qccreate', comments.qccreate);



};
