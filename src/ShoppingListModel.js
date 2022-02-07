import { v4 as uuid } from "uuid";
import ShoppingListItem from "./ShoppingListItem";
import { storeAdd, storeGetAll2, storeDelete, storeUpdate } from "./storage";

let items = [];
export default class ShoppingListModel {
  constructor(items) {
    this.items = items;
  }
  populate = async () => {
    let items = await storeGetAll2();
    items.forEach((item) => {
      this.items.push(item);
    });
    // sort by order
    this.items.sort((a, b) => (a.order > b.order ? 1 : -1));
  };
}
