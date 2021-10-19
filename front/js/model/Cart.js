export class Cart {
  constructor() {
    this.items = [];

    //this.load();
  }

  addProduct(id, qty, color) {
    //ajouter produit à this.items

    this._save();
  }

  removeProduct(id, color) {
    this._save();
  }

  _save() {
    //stocker this.items dans ton localSotrage
  }

  load() {
    //recuperer depuis storage this.itme
  }
}
