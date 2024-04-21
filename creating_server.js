const express = require('express')
const app = express();

app.get('/',function(req,res){ // get is the one kind of the method
    res.send("Hello World");
})

app.get('/greeting',function(req,res){
    res.send("Hello how are you ");
})
app.get('/number',function(req,res){
    var number={
        "one":1,
        "two":2,
        "three":3,
        "four":4

    }
    res.send(number)
})
app.post('/person',function(req,res){
    res.send("Data of the person is collected from the client")
})
app.listen(3000,()=>{
    console.log('Listening on the port 3000')
}); // 3000 is the port number

// GET method is used to request data from server and will show you it  not change the data
// POST method is used to take the data from the client
// req->request res->response