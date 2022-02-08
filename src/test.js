const ShoppingListItem = function (item) {
  return {
    itm: item,
    hep() {
      return this.itm;
    },
  };
};
export default ShoppingListItem;
