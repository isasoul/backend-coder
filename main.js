const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.productId = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct) {
        this.productId = lastProduct.id + 1;
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf-8');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      throw new Error('Producto inválido');
    }

    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error(`El código ${product.code} ya existe`);
    }

    product = this.trimProductFields(product);

    product.id = this.productId++;
    this.products.push(product);

    this.saveProducts();

    console.log('Producto agregado:', product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Producto con Id ${id} no existe`);
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    const updatedProduct = { ...product, ...updatedFields };
    const index = this.products.indexOf(product);
    this.products[index] = updatedProduct;
    this.saveProducts();

    console.log('Producto actualizado:', updatedProduct);
  }

  deleteProduct(id) {
    const product = this.getProductById(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    this.saveProducts();

    console.log('Producto eliminado:', product);
  }

  isProductValid(product) {
    return (
      product.title.trim() &&
      product.description.trim() &&
      product.price &&
      product.thumbnail.trim() &&
      product.code.trim() &&
      product.stock
    );
  }

  trimProductFields(product) {
    return {
      title: product.title.trim(),
      description: product.description.trim(),
      price: product.price,
      thumbnail: product.thumbnail.trim(),
      code: product.code.trim(),
      stock: product.stock
    };
  }
}

// Ejemplo de uso
const manager = new ProductManager('products.json');
/*
manager.addProduct({
  title: 'Producto 1',
  description: 'Descripción 1',
  price: 20000,
  thumbnail: 'imagen1',
  code: '001',
  stock: 50
});
manager.addProduct({
  title: 'Producto 2',
  description: 'Descripción 2',
  price: 50000,
  thumbnail: 'imagen2',
  code: '002',
  stock: 50
});

manager.addProduct({
  title: 'Producto 3',
  description: 'Descripción 3',
  price: 2500,
  thumbnail: 'imagen3',
  code: '003',
  stock: 30
});
*/

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
console.log(manager.getProductById(2));