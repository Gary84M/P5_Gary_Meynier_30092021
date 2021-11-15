import { Cart } from "./model/Cart.js";
import { API_PRODUCTS_LIST_LINK } from "./constant.js";

const cart = new Cart();

let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

let currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log(currentCart);
let totalCart = 0;
let totalArticles = 0;

currentCart.forEach((item, index) => {
  console.log(item._id);
  console.log(item.color);

  //injection of <article>
  let article = document.createElement("article");
  document.querySelector("#cart__items").appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", "item._id");

  //Injection of a <div>
  let divImg = document.createElement("div");
  article.appendChild(divImg);
  divImg.className = "cart__item__img";

  //-> Inject img from API
  fetch(API_PRODUCTS_LIST_LINK + "/" + item._id)
    .then((res) => res.json())
    .then((specs) => {
      let picture = document.createElement("img");
      divImg.appendChild(picture);
      picture.src = specs.imageUrl;
      picture.alt = specs.description;

      console.log(specs.imageUrl);

      //Injection  of a div cart__item__content
      let productItemContent = document.createElement("div");
      article.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      //Injection  of a div "cart__item__content__titlePrice
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__titlePrice";

      //Injection of <h2> TITLE
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = specs.name;

      //Injection of PRICE <p>
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = specs.price + " €";

      console.log(specs.name);
      console.log(specs.price);

      //Injection of a div -> cart__item__content__settings
      let cartItemContentSettings = document.createElement("div");
      productItemContent.appendChild(cartItemContentSettings);
      cartItemContentSettings.className = "cart__item__content__settings";

      // Injection of color
      let selectedColor = document.createElement("p");
      cartItemContentSettings.appendChild(selectedColor);
      selectedColor.innerHTML = item.color;

      //Injection of a div -> cart__item__content__settings__qty
      let cartItemContentSettingsQty = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsQty);
      cartItemContentSettingsQty.className =
        "cart__item__content__settings__qty";

      //Injection of a <p> Qty
      let qte = document.createElement("p");
      cartItemContentSettingsQty.appendChild(qte);
      qte.innerHTML = "Qté";

      //Injection of an <input> -> itemQuantity
      let qtyInput = document.createElement("input");

      cartItemContentSettingsQty.appendChild(qtyInput);
      qtyInput.className = "itemQuantity";
      qtyInput.value = item.qty;
      qtyInput.setAttribute("type", "number");
      qtyInput.setAttribute("min", "1");
      qtyInput.setAttribute("max", "100");
      qtyInput.setAttribute("name", "itemQuantity");

      //Injection of <div> -> cart__item__content__settings__delete
      let cartItemContentSettingsDelete = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
      cartItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      //Injection of <p> -> deleteItem
      let deleteItem = document.createElement("p");
      cartItemContentSettingsDelete.appendChild(deleteItem);
      deleteItem.className = "deleteItem";
      deleteItem.innerHTML = "Supprimer";

      console.log(item.qty);
      console.log(specs.price);
      totalCart += item.qty * specs.price;
      totalArticles += item.qty;

      totalPrice.innerHTML = totalCart;
      totalQuantity.innerHTML = totalArticles;

      let deleteBtns = document.querySelectorAll(".deleteItem");

      deleteBtns[index].addEventListener("click", () => {
        console.log("je click" + index);
        cart.deleteItem(index, 1);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
