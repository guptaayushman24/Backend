const mongoose = require('mongoose')
const textfield =  mongoose.Schema({
    name:{
        type:String,
    }
})
const formitem = mongoose.model('formitem',textfield);
module.exports = formitem;