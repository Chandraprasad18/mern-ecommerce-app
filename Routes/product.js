import express from 'express'
import { addProduct, getProducts, getProductByid, updateProductByid, deleteProductByid } from '../Controllers/product.js';


const  router = express.Router();

//add product
router.post('/add',addProduct);

//get product
router.get('/all', getProducts);

// get product by Id
router.get('/:id',getProductByid);

// upadted product id
router.put('/:id', updateProductByid);

// deleted product by id

router.delete('/:id',deleteProductByid);

export default router