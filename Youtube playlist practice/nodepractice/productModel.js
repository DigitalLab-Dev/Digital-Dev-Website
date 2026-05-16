const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const testproducts= mongoose.model("testproducts", productSchema);

module.exports= testproducts;