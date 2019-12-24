const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbsHelper = require('handlebars-helpers');
const ENV = require("../config/enviroment");

//쿠키

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

//세션
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
//redirect
const flash = require('connect-flash');

console.log('call : /config/express.js');

module.exports = function (app, passport) {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static('public'));


    const hbs = exphbs.create({
        extname: '.hbs', //확장자
        partialsDir: __dirname + '/../app/views/partials',
        defaultLayout: __dirname + '/../app/views/layouts/default.hbs',
        layoutsDir: __dirname + '/../app/views/layouts',
        helpers: hbsHelper,
    });
    require('handlebars-helpers')(hbs);
    app.engine('.hbs', hbs.engine);

    /* 쿠키설정 */
    app.use(cookieParser());
    app.use(cookieSession({
        secret: ENV.SESSION_SECRET
    }));

    app.use(session({
        secret: ENV.SESSION_SECRET,
        store: new mongoStore({
            url: ENV.DATABASE,
            collection: ENV.MONGO_SESSION_COLLECTION_NAME,
        }),
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());


    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, '/../app/views'));
};
