var fs=require('fs')
var os=require('os');

var user = os.userInfo();
console.log(user);
console.log(user.username)

// Creating the file using fs and writing in that file
fs.appendFile('gretting.txt',"These file is created by fs"+ user.username+'!',()=>{
    console.log('File is created using fs')
})