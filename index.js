const productsContainer = document.querySelector(`.products-container`);
const productsCart = document.querySelector(`.cart-container`);
const total = document.querySelector(`.total`);
const categoriesList = document.querySelectorAll(`.category`);
const showMoreBtn = document.querySelector(`.btn-load`);
const buyBtn = document.querySelector(`.btn-buy`);
const deleteBtn = document.querySelector(`.btn-delete`);
const cartBubble = document.querySelector(`.cart-bubble`);
const cartBtn = document.querySelector(`.cart-label`);
const cartMenu = document.querySelector(`.cart`);
// const menuBtn = document.querySelector(`.menu-label`);

// const barsMenu = document.querySelector(`.navbar-list`);

const overlay = document.querySelector(`.overlay`);
const successModal = document.querySelector(`.add-modal`);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const createProductTemplate = (product) => {
  const { id, name, price, productImg } = product;
  return `
  <div class="product">
  <img src="${productImg}" alt="${name}" />
  <div class="product-info">
    <div class="product-top">
      <h4>${name}</h4>
    </div>
    <div class="product-mid">
      <p>${price}</p>
    </div>
    <div class="product-bot">
      <button class="btn-add">
          data-id="${id}"   
          data-name="${name}"  
          data-price="${precio}"  
          data-img="${productImg}"  
     > Add
      </button>
    </div>
  </div> 
</div>
  `;
};

// renderización de productos. Convertimos un array de productos en un HTML de productos
const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

//  boton ver más
// verifica si está en el final de la lista
const isLastIndexOf = () => {
  return appState.currentProductIndex === appState.productsLimit - 1;
};

// función para redenderizar más productos al apretar Ver Más
const showMoreProducts = () => {
  // incremento el cuurentproductindex
  appState.currentProductIndex += 1;

  let { products, currentProductIndex } = appState;
  renderProducts(products[currentProductIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

//mostrar o ocultar el botón de Ver Más

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

//lógica de los filtros

// función para cambiar el estado de los botones del filtro/categorías
const changeBtnActiveState = (salectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.CDATA_SECTION_NODE.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
  });
};

// función para cambiar el estado del filtro activo
const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

//función para saber si el elemento que se apretó es un botón de categoría y no está activo

const applyFilter = (event) => {
  const { target } = event;
  if (!isInactiveFilterBtn(target));
  return;
  productsContainer.innerHTML = "";

  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductIndex = 0;
  }

  renderProducts(appState.products[0]);
};

// Función para filtrar los productos por categoría para renderizarlos

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
};

//Menú interface

//función para mostrar el menú hamburguesa y el overlay

//lógica para agrgegar ítems al carrito

//función para crear el template de un producto en el carrito

const createCartProductTemplate = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `<div class="cart-item">
  <img src="${img}" alt="product del carrito" />
  <div class="item-info">
    <h3 class="item-title">${name}</h3>
    <p class="item-price">${price}</p>
  </div>
  <div class="item-handler">
    <span class="quantity-handler down" data-id="${id}">-</span>
    <span class="item-quantity">${quantity}</span>
    <span class="quantity-handler up" data-id="${id}">+</span>
  </div>
</div>`;
};

//función para renderizar los productos del carrito o el mensaje de vacío

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg"> EL carrito está vacío </p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

//función para obterner el total de la compra

const getCartTotal = () => {
  return cart.reduce(
    (accumulator, current) =>
      accumulator + Number(current.price) * current.quantity,
    0
  );
};

//función para mostrar el total de la compra

const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)}`;
};

//Función para actualizar la burbujita del cart

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce(
    (acc, current) => acc + current.quantity,
    0
  );
};

//Función para habilitar o deshabilitar un botón

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};
//función para guardar el carrito en el local storage

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//función para modificar el estado del carrito

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

//función para crear un objeto con la info del producto a agregar del carrito

const createProductData = ({ id, name, price, img }) => {
  return { id, name, price, img };
};

//función para saber si un producto ya existe en el carrito

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// función para agregar una unidad a un producto que ya esté en el carrito

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

//función para crear un objeto con la información del producto que se quiere agregar al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

//función para mostrar el modal de éxito al agregar o añadir un producto

const showSuccesModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.tectContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

//función para crear un objeto con la información del producto que se agrega

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccesModal("Se agregó una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccesModal("EL producto se ha agredado al carrito");
  }
  updateCartState();
};

//función para agregar más de cada producto del carrito

const handlePlusBtnEvent = (id) => {
  const isExistingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(isExistingCartProduct);
};

//función para restar producto del carrito

const handleMinusBtnEvent = (id) => {
  const isExistingCartProduct = cart.find((item) => item.id === id);
  if (isExistingCartProduct.quantity === 1) {
    if (window.confirm("delete item?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  subtractProductUnit(existingCartProduct);
};

//función para remover un producto del carrito

const removeProductFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id);
  updateCartState;
};

// función para restar una unidad a un producto del carrito

const subtractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, quantity: Number(item.quantity) - 1 }
      : item;
  });
};

// función  para manejar los eventos al apretar el botón + o - del item

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }

  updateCartState();
};

//función para vaciar el carrito

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

//función para completar la compra o vaciar el carrito

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

//función para disparar mensaje de compra exitosa

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "Gracias por su compra");
};

//función para disparar mensaje de carrito vaciado

const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar el carrito?",
    "no hay productos en el carrito"
  );
};
