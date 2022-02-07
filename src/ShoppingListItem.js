import { v4 as uuid } from "uuid";

export default class ShoppingListItem {
  constructor(text, id = uuid(), checked = false, order = -1) {
    this.id = id;
    this.text = text;
    this.checked = checked;
    this.order = order;
  }
}
