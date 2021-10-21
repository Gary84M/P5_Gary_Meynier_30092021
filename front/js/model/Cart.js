export class Cart {
  constructor(id, color, qty) {
    this.id = id;
    this.color = color;
    this.qty = qty;

    this.items = [];

    //this.load();
  }

  addProduct(id, qty, color) {
    //ajouter produit à this.items

    this._save();
  }

  removeProduct(id, qty, color) {
    this._save();
  }

  _save() {
    //stocker this.items dans ton localSotrage
  }

  load() {
    //recuperer depuis storage this.items
  }
}
