import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import __dirname  from './utils.js';
import { Server } from 'socket.io';
import path from 'path';
import handlebars from 'express-handlebars';
import { Router } from 'express';



const app = express();
const listenPort = 8080;
const router = Router();

//settings
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + 'views');
app.set('view engine', 'handlebars');

app.use('/files', express.static(path.join(__dirname, 'public')))



//middle
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use("api/products", productsRouter);
app.use("api/cart", cartRouter);


const server = app.listen(listenPort, () => {
    console.log(`Server escuchando a ${listenPort}`);
});

//io
const io = new Server(server);

