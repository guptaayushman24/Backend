console.log('Server file is running');
// 1st type
// function add(a,b){
//     return a+b;
// }

// 2nd type
// var add=function(a,b){
//     return a+b;
// }

// 3rd type
// var add = (a,b)=>{
//     return a+b;
// }


// 4th type
(function(){
    console.log("Hello")
})();
var add=(a,b)=>a+b;

var result = add(5,7);
console.log(result);


// Callback is the function
function callback(){
    console.log("Callback function is calling");
}
const add_callback = function(a,b,callback){
    var result = a+b;
    console.log(result); // Here the work of the main funciton completes
    callback();
}

add_callback(3,6,callback)
// Callback function always call after the main function works complete

