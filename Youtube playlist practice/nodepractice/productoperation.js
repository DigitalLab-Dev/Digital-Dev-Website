const testproducts = require('./productModel');

const createProduct = async (name, price, description) => {
    try {
        const product = new testproducts({
            name: name,
            price: price,
            description: description
        });
        const savedProduct = await product.save();
        console.log("Product created successfully: ", savedProduct);
    } catch (error) {
        console.error("Error creating product: ", error);
    }
};


const getallproducts = async () =>{
    let products = await testproducts.find();
    return products;
}

const getproductbyid = async (_id) => {
    let productbyid = await testproducts.findById(_id)
    return productbyid;
}


const updateProduct = async (_id,name, price, description) => {
    try {
        const product =await testproducts.findById(_id); 
        product.name = name;
        product.price = price;
        product.description = description; 
        await product.save();
        console.log("Product updated successfully: ", product);
    } catch (error) {
        console.error("Error updating product: ", error);
    }
};



let funcs = { createProduct, getallproducts, getproductbyid, updateProduct };

module.exports = funcs;