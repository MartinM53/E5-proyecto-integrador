const productsData = [
  {
    id: 1,
    name: "Sweater",
    price: 5005,
    productImg: "./assets/img/shirt01.jpg",
    category: "winter",
  },

  {
    id: 2,
    name: "Trousers",
    price: 50000,
    productImg: "./assets/img/shirt01.jpg",
    category: "winter",
  },

  {
    id: 3,
    name: "Pullover",
    price: 1234,
    productImg: "./assets",
    category: "spring",
  },

  {
    id: 4,
    name: "Shirt",
    price: 1234,
    productImg: "./assets/img/shirt01.jpg",
    category: "autumn",
  },

  {
    id: 5,
    name: "Shoes",
    price: 1234,
    productImg: "./assets/img/shirt01.jpg",
    category: "summer",
  },

  {
    id: 6,
    name: "hats",
    price: 1234,
    productImg: "./assets/img/shirt01.jpg",
    category: "winter",
  },
];

// size define la cantidad de elementos que queremos que tenga el array
const divideProductsInParts = (size) => {
  //el array vacío nos sirve para retornar la lista de productos
  let productList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productList;
};

// useState
const appState = {
  products: divideProductsInParts(3),
  // indice actual de los productos
  currentProductIndex: 0,
  productsLimit: divideProductsInParts(3).length,
  activeFilter: null,
};
