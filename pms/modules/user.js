const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nikitamurmure3835:nikita%40123@cluster0.tt9hzse.mongodb.net/passwordManagement?retryWrites=true&w=majority ');
var conn = mongoose.collection;
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    // confirmpassword: {
    //     type: String,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now
    }

});
var userModel = mongoose.model('users', userSchema);
module.exports = userModel;