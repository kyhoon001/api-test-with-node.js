const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

console.log('call : /models/user.js');

const UserSchema = new Schema({
    email: {
        type: String,
        default: '',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    hashed_password: {
        type: String,
        default: ''
    },
    nick: {
        type: String,
        default: '',
        trim: true
    },
    photo: {
        type: Schema.ObjectId,
        ref: 'Upload'
    },
    salt: {
        type: String,
        default: ''
    },
}, {
    timestamp: true,
});



UserSchema.path('email').validate(async function (email, cb) {
    const User = mongoose.model('User');
    const userCount = await User.count({
        email: email
    }).exec();
    return (userCount === 0);

}, '이미 존재하는 이메일주소입니다.');
UserSchema.path('email').validate(function (email) {
    return email.length;
}, "이메일은 빈칸일 수 없습니다.");
UserSchema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length
}, "비밀번호는 빈칸일 수 없습니다.");


UserSchema.methods = {


    authenticate: function (plainText) {
        const tempEncy = this.encryptPassword(plainText);
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },


    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
};

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });


UserSchema.statics = {

    load: function (_id, cb) {

        this.findOne({
                _id
            })
            .populate('photo')
            .exec(function (err, user) {
                cb(user)
            });
    },

    list: function (cb) {
        this.find({}) /*.sort({createdAt: -1})*/ .exec(function (err, users) {
            cb(users)
        });
    },
}




mongoose.model('User', UserSchema);
