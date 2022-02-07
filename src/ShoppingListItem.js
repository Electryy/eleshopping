import { v4 as uuid } from "uuid";

export default class ShoppingListItem {
  constructor(text, checked = false, order = null) {
    this.id = uuid();
    this.text = text;
    this.checked = checked;
    this.order = order;
  }
}
