const mongoose = require("mongoose");
const menuItemSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true,
    },
    taste:{
        type:String,
        enum:["sweet","spicy","sour"],
        require:"true",
    },
    is_drink:{

        type:Boolean,
        default:false // If default is false so if client will not send any data then it will be false by default
     },
     ingredients:{ // These is of the array type
        type:[String],
        default:[]
     },
     num_sale:{
        type:Number,
        default:0,


     }
})
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports=MenuItem;
