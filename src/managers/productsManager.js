import fs from 'fs';

class Product{
    static id = 1
    static status = true

    constructor ({title, price, thumbnail, stock, description, code, category}){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.description = description;
        this.code = code;
        this.category = category;
        this.id = Product.id++;
        this.status = Product.status;

        if (!title || !price || !thumbnail || !stock || !description ||!code || !category) {
            throw new Error('Faltan datos');
        }
        if (typeof title !== 'string' || typeof thumbnail !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
            throw new Error('Tipo de dato incorrecto');
        }
    }   
}


export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  addProduct = async ({ title, description, price, thumbnail, code, category, stock, id }) => {
    const prods = await this.getProducts();

    if (prods.some((prod) => prod.code === code)) {
      throw new Error('Invalid code. Existing article');
    }

    const createdProd = new Product({ title, description, price, thumbnail, code, category, stock, id });
    prods.push(createdProd);

    await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
  };

  deleteProduct = async (id) => {
    const prods = await this.getProducts();
    const removedItemIndex = prods.findIndex((prod) => prod.id === id);

    if (removedItemIndex === -1) {
      throw new Error('The item does not exist');
    }

    prods.splice(removedItemIndex, 1);

    await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));

    return prods;
  };

  getProductById = async (id) => {
    const prods = await this.getProducts();
    const selectedProd = prods.find((prod) => prod.id === id);

    if (!selectedProd) {
      throw new Error('The item does not exist');
    }

    return selectedProd;
  };

  updateProduct = async (id, newObject) => {
    const prods = await this.getProducts();
    const prodIndex = prods.findIndex((product) => product.id === id);

    if (prodIndex === -1) {
      throw new Error('Article not found');
    }

    const updatedProduct = {
      ...prods[prodIndex],
      ...newObject,
    };

    prods[prodIndex] = updatedProduct;

    await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
  };
}
