const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect('mongodb+srv://nikitamurmure3835:nikita%40123@cluster0.tt9hzse.mongodb.net/passwordManagement?retryWrites=true&w=majority ');


var conn = mongoose.collection;
var addPasswordSchema = new mongoose.Schema({
    password_category: {
        type: String,
        required: true,

    },
    project_name: {
        type: String,
        required: true,
    },
    password_Details: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now
    }

});

addPasswordSchema.plugin(mongoosePaginate);
var addPassModel = mongoose.model('password_details', addPasswordSchema);
module.exports = addPassModel;