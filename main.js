class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      throw new Error('Producto inválido');
    }

    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error(`El código  ${product.code} ya existe`);
    }

    product = this.trimProductFields(product);

    product.id = this.productId++;
    this.products.push(product);
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
  const manager = new ProductManager();

  manager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 20000,
    thumbnail: "imagen1",
    code: "001",
    stock: 50
  });
  manager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 50000,
    thumbnail: "imagen2",
    code: "002",
    stock: 50
  });

  manager.addProduct({
    title: "Producto 3",
    description: "Descripción 3",
    price: 2500,
    thumbnail: "imagen3",
    code: "003",
    stock: 30
  });
  
  console.log(manager.getProducts());
  console.log(manager.getProductById(1));
  console.log(manager.getProductById(3));   
  console.log(manager.getProductById(4)); 