import { Cart } from "./model/Cart.js";
const cart = new Cart();

const params = window.location.href;
console.log(params);
const orderUrl = new URL(params);

const orderId = orderUrl.searchParams.get("id");

document.getElementById("orderId").innerHTML = orderId;
cart.clearCart(cart);
