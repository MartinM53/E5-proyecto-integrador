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
          data-Img="${productImg}"  
     > Add
      </button>
    </div>
  </div> 
</div>
  
  
  
  
  
  
  `;
};
