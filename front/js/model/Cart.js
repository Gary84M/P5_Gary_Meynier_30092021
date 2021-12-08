//setup of the cart to be imported

export class Cart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
    this._load();
  }

  addProduct(_id, qty, color) {
    if (qty < 1 || qty > 100 || color == false) {
      alert("Veuillez insérer un nombre entre 1 et 100 et choisir une couleur");
      return 0;
    } else {
      let sofa = {
        _id,
        qty,
        color,
      };
      //increment if item is already in the cart with .find
      let itemsInCart = this.items.find(
        (p) => p._id === sofa._id && p.color === sofa.color
      );

      if (itemsInCart !== undefined) {
        itemsInCart.qty += qty;
      } else {
        this.items.push(sofa);
      }
      console.log(sofa.qty + " product added");
      alert("Article(s) rajouté(s) au panier");
    }

    this._save();
  }

  deleteItem(index) {
    console.log(this.items.splice(index, 1));
    console.log("Single item deleted");
    this._save(index);
  }

  clearCart() {
    localStorage.removeItem("cartItems");
    console.log("LS has been emptied");
  }

  getTotal() {
    let total = 0;
    if (this.items.length > 0) {
      for (let item of this.items) {
        total += item.price;
      }
    } else {
      return 0;
    }
    console.log(total);
    return total;
  }

  _save() {
    localStorage.setItem("cartItems", JSON.stringify(this.items));
    console.log("LS saved");
  }

  _load() {
    //recuperer depuis storage this.items
    this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
  }
}
