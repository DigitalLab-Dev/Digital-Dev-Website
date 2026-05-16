// console.log("Script loaded");

// let x=10;
// function increament(x){
//      x++;
// }

// console.log(x);
// increament(x);
// console.log(x);

// let object={
//     name: "Syed Ali Turab",
//     age: 20,
//     city: "Lahore"
// }
// let changeCity=(obj)=>obj.city="Karachi";

// console.log(object);
// changeCity(object);

// console.log(object);

//problem for wait code & callback example
// function makepizza(flavour,callback){
//     console.log("Order received for " + flavour + " pizza...");
//     if (flavour !=="Tikka"){
//         return("Sorry we don't have " + flavour + " pizza");
//     }
//     else{
//     console.log("Making " + flavour + " pizza...");    
//     setTimeout(() => {
//         callback(flavour);
//     }, 1000);
//     return("Thank you for ordering!");

//     }
// }

// console.log(makepizza("Tikka", handlePizza));

// function handlePizza(flavour){
//     console.log("Pizza is ready janab!");
// }





//Promise example to handle wait calls
// function makePizza(flavour){
//     console.log("Order received for " + flavour + " pizza...");
//     return new Promise((resolve, reject) => {
//         if (flavour !=="Tikka"){
//             reject("Sorry we don't have " + flavour + " pizza");
//         }
//         else{
//         console.log("Making " + flavour + " pizza...");    
//         setTimeout(() => {
//             resolve("Pizza is ready janab!");
//         }, 1000);
//         }
//     });
// }
// // console.log(makePizza("Tikka"));
// makePizza("Fajita").then((message)=>{
//     console.log(message);
// }).catch((error)=>{
//     console.log(error);
// });



//sync & async example
// const fs = require('fs');

// // Synchronous file read
// console.log("Starting file read...");
// let data = fs.readFileSync('textfile.txt', 'utf8');
// console.log("Synchronous read: " + data);
// console.log("Finished synchronous read.");

// // Asynchronous file read
// console.log("Starting file read...");
// fs.readFile('textfile.txt', 'utf8',(err, data)=>{
//     console.log("Asynchronous read: " + data);
// });
// console.log("Finished synchronous read.");