const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const ENV = require("./config/enviroment");
const {
    join
} = require('path');

const app = express();
const models = join(__dirname, 'app/models');


/* model 등록 */
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

require('./config/passport/passport')(passport);
require("./config/express")(app, passport);
require("./config/routes")(app, passport);
module.exports = app;



mongoose.connect(ENV.DATABASE, {
    useNewUrlParser: true
}, err => {
    if (err) {
        console.log('DB is not connected');
        console.log(err);
    } else {
        console.log('DB connected');
    }
});



app.listen(ENV.PORT || 3000, () => {
    console.log("running on " + ENV.PORT || 3000);

});
