let express=require("express");
let app=express();
const mongoose=require("mongoose");
const {createProduct, getproductbyid, getallproducts, updateProduct} = require("./productoperation");

mongoose.connect("mongodb://localhost:27017/mern-stack")
.then(async ()=>{
    console.log("Connected to MongoDB");
    // await createProduct("LED TV", 50000, "A high-quality LED TV with stunning visuals and immersive sound. Perfect for movie nights and gaming sessions.");
    // let products = await getallproducts();
    // console.log("All products: ", products);

    let productbyid = await getproductbyid("6a081c290c3bc0f2b762d745");
    console.log("Product by ID: ", productbyid);

    await updateProduct("6a081c290c3bc0f2b762d745", "Iphone 15 pro max", 230000, "The iPhone 15 Pro Max is the latest flagship smartphone from Apple, featuring a sleek design, powerful performance, and advanced camera capabilities. With its stunning display and cutting-edge technology, it's perfect for both work and play.");
})
.catch((err)=>console.log("Error connecting to MongoDB: ", err));












// let products=["LED TV","Smartphone","Laptop","Headphones"];
// app.get("/",(req,res)=>{
//     res.send("Hello World!");
// });


// app.get("/api/products/:id",(req,res)=>{
//     if(!products[req.params.id]){
//     res.status(404).send("Product not found");
//     }
//     else{
//     res.send(products[req.params.id]);
//     }
// });

// app.put("/api/products/:id",(req,res)=>{
//     if(!products[req.params.id]){
//     res.status(404).send("Product not found");
//     }
//     else{
//         products[req.params.id]=req.body.name;
//         res.send(products);
//     }
// });

// app.listen(3000);