export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const sortByOrder = (shoppingList) => {
  shoppingList.sort((a, b) => b.order - a.order);
};

export const lineBreakConverter = (string, toWhat) => {
  const divider = `<br>`;
  if (toWhat === "toBr") {
    return string.split("\n").join(divider);
  }
  if (toWhat === "toLineBreak") {
    console.log("hehehe");
    return string.split(divider).join("\n");
  }
};
