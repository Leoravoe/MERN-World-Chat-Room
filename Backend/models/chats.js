const mongoose = require('mongoose');

const chats = mongoose.Schema({
    name:{type:String},
    chats : {type: String},
    received : {type: Boolean},
})

module.exports = mongoose.model('chats',chats);