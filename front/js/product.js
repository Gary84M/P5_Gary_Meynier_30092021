import {
  API_PRODUCTS_LIST_LINK
} from "./constant.js";
import {
  Cart
} from "./model/Cart.js";

const cart = new Cart();

const addToCartButton = document.getElementById("addToCart");
const couchQuantityInput = document.getElementById("quantity");
const couchColorsSelector = document.getElementById("colors");
const couchImgContainer = document.querySelector(".item__img");
const couchDescriptionContainer = document.querySelector(
  ".item__content__description"
);
const couchTitlePriceContainer = document.querySelector(
  ".item__content__titlePrice"
);
let productPrice = document.getElementById("price").innerHTML;

// get URL from the "?" mark
const queryStringURLId = window.location.search;
//USP called as a new instance with queryStringURLId argument
const urlSearchParams = new URLSearchParams(queryStringURLId);
//create const id
const id = urlSearchParams.get("id");

//Make sure an integer is input
function isInteger(n) {
  return !isNaN(parseInt(n));
}

couchSpecs(id).then((couch) => {
  colorPicker(couch.colors);
  specsInjection(couch);

  addToCartButton.addEventListener("click", () => {
    cart.addProduct(
      couch, couchColorsSelector.value,
      if(isInteger(couchQuantityInput.value) == true) {
        parseInt(couchQuantityInput.value);
      } else {
        return 0;
      },
      if (isInteger(productPrice) == true) {
        parseInt(productPrice)
      } else {
        return 0
      }
    );
  });
});

//Iteration of color of data.colors w/ arg data + create markup <option>
function colorPicker(colors) {
  for (let color of colors) {
    let option = document.createElement("option");
    option.value = color;
    option.text = color;
    couchColorsSelector.appendChild(option);
  }
}
//Call the API + id. declare: data. call API, specsInjection & colorPicker
async function couchSpecs(id) {
  const response = await fetch(API_PRODUCTS_LIST_LINK + "/" + id);
  return await response.json();
}

const specsInjection = (data) => {
  couchImgContainer.innerHTML = `
      <img src="${data.imageUrl}" alt="${data.altTxt}">
  `;
  couchTitlePriceContainer.innerHTML = `
        <h1 id="title"> ${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>
  `;
  couchDescriptionContainer.innerHTML = `
    <p class="item__content__description__title">Description :</p>
    <p id="description">${data.description}</p>
  
  `;
};