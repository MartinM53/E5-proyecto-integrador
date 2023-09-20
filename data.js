const productsData = [
  {
    id: 1,
    name: "Sweater",
    price: $50000,
    productImg: "./assest",
    category: winter,
  },

  {
    id: 2,
    name: "Trousers",
    price: $50000,
    productImg: "SVGDefsElement",
    category: winter,
  },

  {
    id: 3,
    name: "Pullover",
    price: $50000,
    productImg: "SVGDefsElement",
    category: spring,
  },

  {
    id: 4,
    name: "Shirt",
    price: $50000,
    productImg: "SVGDefsElement",
    category: autumn,
  },

  {
    id: 5,
    name: "Shoes",
    price: $50000,
    productImg: "./ass",
    category: summer,
  },

  {
    id: 6,
    name: "hats",
    price: $50000,
    productImg: "./ass",
    category: winter,
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
