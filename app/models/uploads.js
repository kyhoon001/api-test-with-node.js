'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

console.log('call : /models/uploads.js');

const UploadSchema = new Schema({
    relatedId: {
        type: Schema.ObjectId
    },
    type: {
        type: String
    },
    filename: {
        type: String
    },
    originalname: {
        type: String
    },
    size: {
        type: Number
    },

});


UploadSchema.path('relatedId').required(true, 'Article title cannot be blank');
UploadSchema.path('filename').required(true, 'Article body cannot be blank');
UploadSchema.path('originalname').required(true, 'Article body cannot be blank');
UploadSchema.path('size').required(true, 'Article body cannot be blank');

mongoose.model('Upload', UploadSchema);
