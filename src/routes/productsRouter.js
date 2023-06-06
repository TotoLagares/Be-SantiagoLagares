import { Router } from "express";
import ProductManager from "../managers/productsManager.js";

const router = Router();
const prodManager = new ProductManager('./products.jsons');

router.get("/", async(req, res) => {
    const products = await productManager.getProducts();
    let limit = req.query.limit;
    let newArray = products.slice(0, limit);

    if (!limit) {
        res.send.status(200).json(products);
    }else{
        limit > products.length ? res.status(404).json({error: 'No hay tantos productos'}) : 
        res.send(newArray);
    }
});

router.get('/:pid', async(req, res) => {
    const prods = await prodManager.getProducts();

    let pid = req.params.pid;
    const prod = prods.find((p) => p.id == pid);

    if (!prod) {
        return res.status(404).send({status:'Error', Error: 'Producto no encontrado'})
    } else {
        res.send({status: 'succes', prod});
    }

})

router.post("/", async(req, res) => {
    try{
        const newProduct = req.body;
        const product = await productManager.getProductById(newProduct);
        res.status(200).send({status: 'Agregado', product});
        if (!title || !price || !thumbnail || !stock || !description ||!code || !category) {
            res.status(400).send({error: 'Faltan datos'});
        }
    } catch (error) {
        res.status(404).send({error: 'Producto no encontrado'});
    } 
});

router.put("/:pid", async(req, res) => {
    try{
        const prodId = req.params.pid;
        const newProduct = req.body;
        await productManager.updateProduct(prodId, newProduct);
        res.send({status: 'Actualizado', product});
    }catch (error) {
        console.error(error);
        res.status(500).send({error: 'Producto no encontrado'});
    }
});

router.delete("/:pid", async(req, res) => {
    try{
        const pId = req.params.pid;
        await productManager.deleteProduct(pId);
        res.send({status: 'Eliminado', product});
    }catch (error) {
        console.error(error);
        res.status(500).send({error: 'Producto no encontrado'});
    }
});

export default router;
