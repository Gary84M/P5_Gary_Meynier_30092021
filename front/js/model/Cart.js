export class Cart {
  constructor() {
    this.items = [];
    this._load();
  }

  addProduct(product, qty, color) {
    //TODO veirfier tes types de données qyt number > 0 ...

    //TODO verifier avant insertion s'il ne faudrait pas plutot incrementer un item existant

    //ajouter produit à this.items
    this.items.push({ product, qty, color });

    this._save();
  }

  removeProduct(id, qty, color) {
    this._save();
  }

  getTotal() {
    // TODO calculer le total du panier
    return 0;
  }

  clear() {
    this.items = [];
    this._save();
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
