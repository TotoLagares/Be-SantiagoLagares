import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const listenPort = 8080;

//expresiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("api/products", productsRouter);
app.use("api/cart", cartRouter);

app.listen(listenPort, () => {
    console.log(`Server escuchando a ${listenPort}`);
});