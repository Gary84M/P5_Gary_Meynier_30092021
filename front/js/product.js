import { API_PRODUCTS_LIST_LINK } from "./constant.js";
import { Cart } from "./model/Cart.js";

const cart = new Cart();
//lors du clic sur Ajouter au panier, il faudrait appeler la methode cart.addProduct(id,qty,color)

const queryStringURLId = window.location.search;
console.log(queryStringURLId);

const urlSearchParams = new URLSearchParams(queryStringURLId);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

// let APISingleProduct = addId();

// function addId() {
//   return API_PRODUCTS_LIST_LINK.urlSearchParams.append("id");
// }
// console.log(APISingleProduct);

function colorPicker(data) {
  for (let color of data.colors) {
    console.log(color);

    let option = document.createElement("option");
    option.value = color;
    option.text = color;
    document.getElementById("colors").appendChild(option);
  }
}

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
