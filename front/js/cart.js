import { Cart } from "./model/Cart.js";
import { API_PRODUCTS_LIST_LINK } from "./constant.js";

const cart = new Cart();

//DOM SELECTION
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

let totalCart = 0;
let totalArticles = 0;
//RETRIEVING VALUES FROM LS -> ITEM(QTY, ID, COLOURS) // VALUES FROM API ARE UNDER SPECS (REST(PRICE, ...))
//Loop through each items' specifications and HTMLinject
cart.items.forEach((item, index) => {
  //injection of <article>
  let article = document.createElement("article");
  document.querySelector("#cart__items").appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", "item._id");

  //Injection of a <div>
  let divImg = document.createElement("div");
  article.appendChild(divImg);
  divImg.className = "cart__item__img";

  //Call API
  fetch(API_PRODUCTS_LIST_LINK + "/" + item._id)
    .then((res) => res.json())
    .then((specs) => {
      //-> Inject img from API
      let picture = document.createElement("img");
      divImg.appendChild(picture);
      picture.src = specs.imageUrl;
      picture.alt = specs.description;

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
      productPrice.innerHTML = specs.price + " ???";

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
      qte.innerHTML = "Qt??";

      //Injection of an <input> -> itemQuantity
      let qtyInput = document.createElement("input");

      cartItemContentSettingsQty.appendChild(qtyInput);
      qtyInput.className = "itemQuantity";
      qtyInput.value = item.qty;
      qtyInput.setAttribute("type", "number");
      qtyInput.setAttribute("min", "1");
      qtyInput.setAttribute("max", "100");
      qtyInput.setAttribute("name", "itemQuantity");

      //amend Qty/Price
      qtyInput.addEventListener("change", (e) => {
        e.preventDefault();

        let oldQty = item.qty;
        let ttPrice = totalPrice.value;

        item.qty = parseInt(qtyInput.value);
        let diff = item.qty - oldQty;
        console.log("Qty change detected of " + diff);
        cart._save();
        // f calcul des totaux
        calculateTotals(diff, specs.price);
      });

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

      function calculateTotals(qty, price) {
        //Calcul des totaux
        totalCart += parseInt(qty) * price;

        totalArticles += parseInt(qty);

        //Injection des totaux
        totalPrice.innerHTML = totalCart;
        cart.totalPrice = totalCart;
        totalQuantity.innerHTML = totalArticles;
        cart._save;
      }
      calculateTotals(item.qty, specs.price);

      //Delete Button
      let deleteBtns = document.querySelectorAll(".deleteItem");

      deleteBtns[index].addEventListener("click", (e) => {
        //e.preventDefault();
        e.path[4].remove();
        cart.deleteItem(index);
        calculateTotals(item.qty * -1, specs.price);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
//*******************************************************************/
//**************************CUSTOMER FORM****************************/
//*******************************************************************/

//DOM SELECTION
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

// User input verification
// 1stName
const firstNameVerif = () => {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  if (!/^[A-Za-z??-??\-' ]+$/gi.test(firstName.value) || firstName.value == "") {
    firstNameErrorMsg.textContent = "Ceci n'est pas un pr??nom normal!";
    console.log("pr??nom: " + firstName.value + " invalide");
    return false;
  } else {
    firstNameErrorMsg.textContent = "";
    return true;
  }
};
// Surname
const lastNameVerif = () => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  if (!/^[A-Za-z??-??\-' ]+$/gi.test(lastName.value) || lastName.value == "") {
    lastNameErrorMsg.textContent = "Ceci n'est pas un nom de famille normal!";
    console.log("nom: " + lastName.value + " invalide");
    return false;
  } else {
    lastNameErrorMsg.textContent = "";
    return true;
  }
};
// address
const addressVerif = () => {
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  if (
    !/^([A-Za-z??-??]|[0-9]{1,4})([A-Za-z??-??\-' ]+$)/gi.test(address.value) ||
    address.value == ""
  ) {
    addressErrorMsg.textContent = "Renseignez une adresse sur la plan??te Terre";
    console.log("Adresse invalide");
    return false;
  } else {
    addressErrorMsg.textContent = "";
    return true;
  }
};
// City
const cityVerif = () => {
  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  if (!/^[A-Za-z??-??\-' ]+$/gi.test(city.value) || city.value == "") {
    // ou cp + ville : /^[0-9]{5} [A-Za-z??-??\-' ]+$/gi
    cityErrorMsg.textContent = "Renseignez une ville digne de ce nom!";
    console.log("Nom de ville invalide");
    return false;
  } else {
    cityErrorMsg.textContent = "";
    return true;
  }
};
// email
const emailVerif = () => {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  if (
    !/([a-z\.\-]{1,})@([a-z\-\.]{2,})\.([a-z]{2,4})/gi.test(email.value) ||
    email.value == ""
  ) {
    emailErrorMsg.textContent = "Adresse email invalide";
    console.log("Adresse email invalide");
    return false;
  } else {
    emailErrorMsg.textContent = "";
    return true;
  }
};

// eventListerner on the orderBtn
let orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {};
  let products = [];
  //push items' IDs
  cart.items.forEach((item) => {
    products.push(item._id);
    console.log(item);
  });
  // call verif functions based on exports.orderProducts = (req, res, next) ->
  if (
    !firstNameVerif() ||
    !lastNameVerif() ||
    !addressVerif() ||
    !cityVerif() ||
    !emailVerif()
  ) {
    e.preventDefault();
  } else {
    console.log("correct input on form");
    // organise contact according to back
    contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    // declare order containing contact and products as expected by the backend  
    let order = {
      contact,
      products,
    };
    sendOrder(order);
  }
});

const sendOrder = async (order) => {
  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log("The order number is " + data.orderId);

    let orderLink = document.createElement("a");
    orderLink.href = "confirmation.html?id=" + data.orderId;

    window.location.href = orderLink;
  } catch (error) {
    console.log(error);
  }
};
