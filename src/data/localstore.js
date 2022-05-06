console.log("Using local storage as database");
export function dbLiveUpdates(document, handleChanges) {}

export async function dbAdd(document, items) {
  let data = await dbGetAll(document);
  if (!Array.isArray(data)) {
    data = [];
  }
  localStorage.setItem(document, JSON.stringify([...data, ...items]));
}

export async function dbGetAll(document) {
  const data = localStorage.getItem(document);
  if (data) {
    return Array.from(JSON.parse(data));
  }
  return [];
}

export async function dbUpdateBatch(document, items) {
  const data = await dbGetAll(document);
  items.forEach((item) => {
    let found = data.find((i) => item.id === i.id);
    Object.assign(found, item);
  });
  console.log(data);
  localStorage.setItem(document, JSON.stringify(data));
}

export async function dbDeleteBatch(document, items) {
  const data = await dbGetAll(document);
  const ids = items.map((i) => i.id);
  const remaining = data.filter((i) => !ids.includes(i.id));
  localStorage.setItem(document, JSON.stringify(remaining));
}
