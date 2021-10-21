import { API_PRODUCTS_LIST_LINK } from "./constant.js";
import { Cart } from "./model/Cart.js";

const addToCartButton = document.querySelectorAll(".item__content__addButton");
for (let i = 0; i < addToCartButton.length; i++) {
  addToCartButton[i].addEventListener("click", () => {
    //console.log("num of i");
    entriesToCart();
  });
}

let entriesToCart = () => {
  let productNumbers = localStorage.getItem("entriesToCart");
  console.log(productNumbers);
  console.log(typeof productNumbers);

  productNumbers = parseInt(productNumbers);
  console.log(typeof productNumbers);

  localStorage.setItem("entriesToCart", 1 + productNumbers);
};

const cart = new Cart();
//lors du clic sur Ajouter au panier, il faudrait appeler la methode cart.addProduct(id,qty,color)

const queryStringURLId = window.location.search;
// get URL from the "?" mark
const urlSearchParams = new URLSearchParams(queryStringURLId);
//USP called as a new instance with queryStringURLId argument
const id = urlSearchParams.get("id");
//create const id

//Iteration of color of data.colors w/ arg data + create markup <option>
function colorPicker(data) {
  for (let color of data.colors) {
    let option = document.createElement("option");
    option.value = color;
    option.text = color;
    document.getElementById("colors").appendChild(option);
  }
}
//Call the API + id. declare: data. call API, specsInjection & colorPicker
async function couchSpecs(id) {
  const response = await fetch(API_PRODUCTS_LIST_LINK + "/" + id);
  const data = await response.json();
  const { colors, _id, name, price, imageURL, description, altTxt } = data;
  console.log(data.colors);
  specsInjection(data);

  colorPicker(data);
}
couchSpecs(id);

const specsInjection = (data) => {
  document.querySelector(".item__img").innerHTML = `
      <img src="${data.imageUrl}" alt="${data.altTxt}">
  `;
  document.querySelector(".item__content__titlePrice").innerHTML = `
        <h1 id="title"> ${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>
  `;
  document.querySelector(".item__content__description").innerHTML = `
    <p class="item__content__description__title">Description :</p>
    <p id="description">${data.description}</p>
  
  `;
};
