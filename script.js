class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      const id = this.generateId();
      const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      if (this.isCodeRepeated(code)) {
        throw new Error("El código del producto ya está en uso.");
      }
  
      this.products.push(product);
      return id;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
  
      return product;
    }
  
    generateId() {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const idLength = 8;
      let id = "";
  
      for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
      }
  
      return id;
    }
  
    isCodeRepeated(code) {
      return this.products.some(product => product.code === code);
    }
  }
  
  // Crear instancia de la clase ProductManager
  const productManager = new ProductManager();
  
  // Llamar a getProducts (debe devolver un arreglo vacío [])
  console.log(productManager.getProducts()); // []
  
  // Llamar a addProduct con los campos proporcionados
  const productId = productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  console.log("Producto agregado con ID:", productId);
  
  // Llamar a getProducts nuevamente (debe aparecer el producto recién agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código (debe arrojar un error)
  try {
    productManager.addProduct(
      "producto repetido",
      "Este es un producto repetido",
      300,
      "Sin imagen",
      "abc123",
      10
    );
  } catch (error) {
    console.log("Error:", error.message);
  }
  
  // Probar getProductById con un ID válido
  const existingProductId = productId; // Usar el ID del producto agregado anteriormente
  const existingProduct = productManager.getProductById(existingProductId);
  console.log("Producto encontrado:", existingProduct);
  
  // Probar getProductById con un ID no válido
  const nonExistingProductId = "non-existing-id";
  try {
    const nonExistingProduct = productManager.getProductById(nonExistingProductId);
    console.log("Producto encontrado:", nonExistingProduct);
  } catch (error) {
    console.log("Error:", error.message);
  }