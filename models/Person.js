// Here we are defining the schema of the Person
// Define the Person Schema

const mongoose = require('mongoose')
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'], // Only these three values are the valid value for the work column
        require:true

    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    }
})

// Creating the person model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;