export class Cart {
  constructor() {
    this.items = [];
    this._load();
  }

  addProduct(_id, qty, color, price) {
    //console.log(this);
    if (qty < 1 || qty > 100 || color == false) {
      alert("Veuillez insérer un nombre entre 1 et 100 et choisir une couleur");
      return 0;
    } else {
      let sofa = { _id, qty, color, price };

      let itemsInCart = this.items.find(
        (p) => p._id === sofa._id && p.color === sofa.color
      );

      if (itemsInCart !== undefined) {
        itemsInCart.qty += qty;
      } else {
        this.items.push(sofa);
      }
      console.log(itemsInCart);

      // if (itemsInCart != null) {
      //   qty += this.items.quantity;
      //   console.log(item.price);
      // } else {
      //   return 0;
      // }
      // alert("Articles(s) rajouté(s) au panier");
    }

    this.getTotal();

    this._save();
  }

  removeProduct(id, color) {
    this.items.pop();
    this._save();
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

  clear() {
    localStorage.removeItem("cartItems");
    // this.items = [];
    // this._save();
  }

  _save() {
    //stocker this.items dans ton localSotrage
    localStorage.setItem("cartItems", JSON.stringify(this.items));
  }

  _load() {
    //recuperer depuis storage this.items
    this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
  }
}
