const mongoose =require("mongoose");

const productSchema= new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const product= mongoose.model("testproduct", productSchema);

module.exports= product;