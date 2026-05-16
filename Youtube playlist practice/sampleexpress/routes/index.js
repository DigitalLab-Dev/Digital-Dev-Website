var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const { createProduct, getallproducts, getproductbyid } = require("../schemas/productOperation");

mongoose.connect("mongodb://localhost:27017/mern-stack")
.then(async ()=>{
    console.log("Connected to MongoDB");})
.catch((err)=>console.log("Error connecting to MongoDB: ", err));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello World!</h1>');
});

router.get('/products', async function(req, res, next) {

  var products = await getallproducts();
  res.render('products',{"title":"Products from Database",products});
});


router.get('/addproduct', async function(req, res, next) {
  res.render('addproduct');
});


router.post('/addproduct', async function(req, res, next) {
  console.log("Request body: ", req.body);
  const { name, price, description } = req.body;
  await createProduct(name, price, description);
  res.redirect('/products');
});

module.exports = router;