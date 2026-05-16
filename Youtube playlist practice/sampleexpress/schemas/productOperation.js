const testproducts= require("./product");

const createProduct = async (name, price, description) => {
    const product = new testproducts({
        name: name,
        price: price,
        description: description
    });
    const savedProduct = await product.save();
    console.log("Product created successfully: ", savedProduct);
}

const getallproducts = async () =>{
    let products = await testproducts.find();
    return products;
}

const getproductbyid = async (_id) => {
    let productbyid = await testproducts.findById(_id)
    return productbyid;
}   

const funcs = { createProduct, getallproducts, getproductbyid };

module.exports = funcs;