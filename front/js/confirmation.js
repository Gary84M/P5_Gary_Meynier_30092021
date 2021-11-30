import { Cart } from "./model/Cart.js";
const cart = new Cart();

const params = window.location.href;
const orderUrl = new URL(params);

const orderId = orderUrl.searchParams.get("id");

document.getElementById("orderId").innerHTML = orderId;
cart.clearCart;
