const express=require('express')
const app=express();
const db = require('./db')
const cors = require('cors');
app.use(cors());
// Adding the bodyParser as middle ware so that data will be properly structured
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Importing the person schema
const Person = require('./models/Person')
// Importing the menu schema
const MenuItem = require('./models/Menu_Item')
const formitem = require('./models/Form');

// Calling the passport for doing the authentication
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
// Middleware Function
const logRequest=(req,res,next)=>{ // Middleware function takes the three parameter req,res and next

    console.log(`${new Date().toLocaleString()} Request Made to :${req.originalUrl}`);
    next(); // Move on the next phase Meaning of the next is that one middleware work is done now move on to the next middleware

}
// In the below router we are using the middleware here we are using the middleware on the particular route
// app.get('/middleware',logRequest,function(req,res){
//     res.send('Here we will use the middleware')
// })
app.use(logRequest)

// Creating the funtion for the authentication
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try{
        // done is the callback function
      // For authentication we will find the username and password in the database

        console.log('Recieved Credentials:',USERNAME,password);
        const user = await Person.findOne({username:USERNAME});
        // If username is incorrect
        if (!user){
            return done(null,false,{message:'Incorrect username'});
        }
        // Now we will check the password
        const isPasswordMatch = user.password===password ? true:false;
        if (isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'Incorrect Password'});
        }
    }

    catch{
        return done(err);
    }
}))
// Here our authentication code is done now in the next step which route we have to authenticate

app.get('/connection',function(req,res){
    res.send("Here we will import the db.js file for establishing the connection with mongodb and Node js")
})

// Now we the client is sending the data to store in the database and we are using the POST method because the POST method is use to save the data in the database
app.post('/person',async(req,res)=>{

    try{


        const data = req.body; // Here the client is sending the data

    // Creating the new Person
    const newPerson = Person(data);

    // newPerson.name=data.name;
    // newPerson.age=data.age;
    // newPerson.work=data.work;
    // newPerson.mobile=data.mobile;
    // newPerson.email=data.email;
    // newPerson.address=data.address;
    // newPerson.salary=data.salary;

    // We can directly pass the data in these const newPerson = Person();
    // Now call back function is not taken in use
    // newPerson.save((error,savedperson)=>{
    //     if (error){
    //         console.log("Error saving person data",error);
    //         res.status(500).json({error:'Internal server error'})
    //     }
    //     else{
    //         console.log("Data is saved Successfully");
    //         res.status(200).json(savedperson)
    //     }
    // })
    const response = await newPerson.save()
    console.log('Data Saved')
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server Error'});
    }
})

// Creating the GET method to the get the person data
app.get('/person',passport.authenticate('local',{session:false}),async (req,res)=>{
    try{
        const data=await Person.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server Error'});
    }
})


// Creating the post method for inserting the data into menu
app.post('/insertitem',async (req,res)=>{
    try{
    // Take the from the user
    const menu_data = req.body;

    // Creating the object of the menu data
    const Menu = new MenuItem(menu_data); // We will pass the data in our object which is given by user

    // Now saving the data in the database
    const saved_menu = await Menu.save();
    console.log('Menu data is saved');
    res.status(200).json(saved_menu);
    }
    catch(err){
        console.log(error);
        res.status(500).json({err:'Internal server error'})
    }

})

// Creating the get method for displaying the menuitems data
app.get('/menudata',async(req,res)=>{
    try{
        const fetched_data = await MenuItem.find();
        console.log('Menu data is fetched');
        res.status(200).json(fetched_data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'})
    }
})

// Creating the parameterized endpoints means in person we have three roles chef,waiter and manager so one method is create the seperate end point of each or else create the parameterized endpoints
app.get('/person/:workType',async (req,res)=>{
    const worktype = req.params.workType;
    try{
    if (worktype=='chef' || worktype=='manager' || worktype=='waiter'){
        const response = await Person.find({work:worktype});
        console.log('Response Fetched');
        res.status(200).json(response);

    }
    else{
        res.status(404).json({error:'Invalid work type'});
    }
}
catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
}
})

// Creating the form server
// POST Method
app.post('/formdata',async(req,res)=>{
   try{
    const formdata = req.body;

    const user_form =  new  formitem(formdata);
    const saved_form =  await user_form.save()

    console.log('Data is saved successfully');
    res.status(200).json(saved_form);
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
   }
})
    // On the formdataget we want to do authentication
   app.get('/formdataget',async(req,res)=>{
        try{
        const formdata = await formitem.find();
        res.status(200).json(formdata);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'})
        }
    })



    app.get('/middleware',(req,res)=>{
        res.send('Here we will use the middleware')
    })

    // If we want to use the middleware on the all the endpoints
    console.log(app.use(logRequest));

app.listen(5000,()=>{
    console.log("Server is running on the port 5000");
})