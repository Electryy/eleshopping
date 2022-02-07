import { v4 as uuid } from "uuid";
import ShoppingListItem from "./ShoppingListItem";

export default class ShoppingListModel {
  constructor(items) {
    this.items = items;
  }
  populate = () => {
    for (let index = 0; index < 5; index++) {
      this.items.push(new ShoppingListItem(`hee ${index}`));
    }
  };
}
