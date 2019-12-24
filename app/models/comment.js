const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

console.log('call : /models/comments.js');

const CommentSchema = new Schema({
    comment: {
        type: String,
        default: '',
        trim: true
    },
    nick: {
        type: String,
        default: '',
        trim: true
    },
    post: {
        type: String,
        default: '',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




CommentSchema.path('comment').validate(function (comment) {
    return comment.length;
}, "내용을 입력해주세요.");


CommentSchema.statics = {

    load: function (_id, cb) {

        this.findOne({
                _id
            })
            .exec(function (err, comment) {
                cb(comment)
            });
    },

    loadcomment: function (post, cb) {
        this.find({
            "post": post
        }).exec(function (err, comments) {
            cb(comments)
        });
    },

    list: function (cb) {
        this.find({}).sort({
            createdAt: -1
        }).exec(function (err, comments) {
            cb(comments)
        });
    }
}



mongoose.model('Comment', CommentSchema);
