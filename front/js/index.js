import { API_PRODUCTS_LIST_LINK } from "./constant.js";

fetch(API_PRODUCTS_LIST_LINK)
  .then((res) => res.json())
  .then((canap) => displayCouchesCollection(canap))
  .catch((error) => console.log(error));

const displayCouchesCollection = (canaps) => {
  let couchesContainerElt = document.getElementById("items");
  for (let canap of canaps) {
    couchesContainerElt.appendChild(generateCouchCard(canap));
  }
};
const generateCouchCard = (canap) => {
  const cardElt = document.createElement("a");
  cardElt.href = `./product.html?id=${canap._id}`;
  cardElt.innerHTML = `
                  <article>
                  <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                  <h3 class="productName">${canap.name}</h3>
                  <p class="productDescription">${canap.description}</p>
                  </article>
           `;
  return cardElt;
};
