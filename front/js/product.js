import { API_PRODUCTS_LIST_LINK } from "./constant.js";
import { Cart } from "./model/Cart.js";

const cart = new Cart();
//DOM selection
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

// get URL from the "?" mark
const queryStringURLId = window.location.search;
//USP called as a new instance with queryStringURLId argument
const urlSearchParams = new URLSearchParams(queryStringURLId);
//create const id
const id = urlSearchParams.get("id");
//Making sure this is an integer
function isInteger(n) {
  return !isNaN(parseInt(n));
}

couchSpecs(id).then((couch) => {
  colorPicker(couch.colors);
  specsInjection(couch);

  addToCartButton.addEventListener("click", () => {
    let productPrice = document.getElementById("price").innerHTML;
    cart.addProduct(
      couch._id,
      isInteger(couchQuantityInput.value)
        ? parseInt(couchQuantityInput.value)
        : 0,
      couchColorsSelector.value
      // isInteger(productPrice) ? parseInt(productPrice) : 0

      // if(isInteger(couchQuantityInput.value) == true) {
      //   parseInt(couchQuantityInput.value);
      // } else {
      //   return 0;
      // },
      // if (isInteger(productPrice) == true) {
      //   parseInt(productPrice)
      // } else {
      //   return 0
      // }
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
//Call API + id
async function couchSpecs(id) {
  const response = await fetch(API_PRODUCTS_LIST_LINK + "/" + id);
  return await response.json();
}
//HTMLInjection of images, price & desc
const specsInjection = (data) => {
  console.log(data.altTxt);
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
