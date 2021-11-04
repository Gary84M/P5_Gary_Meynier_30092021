import { Cart } from "./model/Cart.js";
const cart = new Cart();

async function cartItems() {
  const response = await fetch(API_PRODUCTS_LIST_LINK);
  return await response.json();
}

// const addHTML = document.getElementById("cart__item");

// document.getElementById("cart__items").innerHTML = `
// <article class="cart__item" data-id="{product-ID}">
//     <div class="cart__item__img">
//       <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//     </div>
//     <div class="cart__item__content">
//         <div class="cart__item__content__titlePrice">
//             <h2>Nom du produit</h2>
//             <p>42,00 €</p>
//         </div>
//         <div class="cart__item__content__settings">
//             <div class="cart__item__content__settings__quantity">
//                 <p>Qté : </p>
//                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//             </div>
//             <div class="cart__item__content__settings__delete">
//                 <p class="deleteItem">Supprimer</p>
//             </div>
//         </div>
//     </div>
// </article>`;
