import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = function () {
  this.items = [];

  this.add = function (text) {
    const item = new ShoppingListItem(text);
    this.items.unshift(item);
    this.refreshListOrders();
  };
  this.deleteItem = (id) => {
    let item = this.find(id);
    let remaining = this.items.filter((item) => item.id !== id);
    this.items = remaining;
  };
  this.setText = (id, text) => {
    let item = this.find(id);
    if (item.text !== text) {
      item.text = text;
    }
  };
  this.setChecked = (id, status) => {
    let item = this.find(id);
    item.checked = status;
  };
  this.clearChecked = () => {
    let deletedItems = this.items.filter((item) => item.checked === true);
    let remainingItems = this.items.filter((item) => item.checked === false);
    this.items = remainingItems;
  };
  this.find = function (id) {
    return this.items.find((item) => item.id === id);
  };
  this.refreshListOrders = () => {
    let ordered = this.items.map((item, index) => {
      item.order = index;
      return item;
    });

    this.items = ordered;
  };
  this.reorder = (oldIndex, newIndex) => {
    const [removed] = this.items.splice(oldIndex, 1);
    this.items.splice(newIndex, 0, removed);
    this.refreshListOrders();
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
};

export default ShoppingList;
