import { v4 as uuid } from "uuid";
const ShoppingListItem = function (text) {
  this.id = uuid();
  this.text = text;
  this.checked = false;
  this.order = -1;
};

export default ShoppingListItem;
