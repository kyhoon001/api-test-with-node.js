const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

console.log('call : /models/nboard.js');

const NboardSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    post: {
        type: String,
        default: '',
        trim: true
    },
    view: {
        type: Number,
        default: 0,
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    nick: {
        type: String,
        default: '',
        trim: true
    },
    password: {
        type: String,
        default: '',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    } //작성시간
});




NboardSchema.path('title').validate(function (title) {
    return title.length;
}, "제목은 빈칸일 수 없습니다.");

NboardSchema.path('post').validate(function (post) {
    return post.length
}, "내용은 빈칸일 수 없습니다.");



NboardSchema.statics = {

    load: function (_id, cb) {

        this.findOne({
                _id
            })
            .exec(function (err, nboard) {
                cb(nboard)
            });
    },


    list: function (cb) {
        this.find({}).sort({
            createdAt: -1
        }).exec(function (err, nboards) {
            cb(nboards)
        });
    }
}



mongoose.model('Nboard', NboardSchema);
