const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nikitamurmure3835:nikita%40123@cluster0.tt9hzse.mongodb.net/passwordManagement?retryWrites=true&w=majority ');



var conn = mongoose.collection;
var passwordCategorySchema = new mongoose.Schema({
    password_category: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

});
var passCatModel = mongoose.model('password_categories', passwordCategorySchema);
module.exports = passCatModel;