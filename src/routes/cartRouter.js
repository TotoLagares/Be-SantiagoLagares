import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager('./cart.json')

router.post('/', async (req, res) => {
    try{
        const newCart = await cartManager.addCart();
        res.status(201).send({status: 'succes', newCart});
        console.log(newCart);
    }catch(error){
        console.error(error);
        res.status(400).send('Error al crear el carrito');
    }
})

router.get('/:cid', async(req, res) => {
    
    try {
        const askedId = parseInt(req.params.cid);
        const calledCart = await cartManager.getCartbyId(askedId);
        console.log(calledCart)
        res.status(200).send(calledCart);
    } catch (error) {
        res.status(500).send({status: Error, Error: 'Data not recovered'})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const askedId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const askedProd = await cartManager.addProductCart(askedId, productId);
        res.status(200).send({Msg: 'Productos agregado correctamente', askedProd});
    }catch(error){
        console.error(error);
        res.status(500).send({Error: 'Error al agregar el producto'});
    }
})

export default router