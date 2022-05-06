console.log("Using local storage as database");

const shouldCreateDemoData = process.env.REACT_APP_useDemoData;

/**
 * Get database items from local storage or return empty array
 * @param {String} document
 * @returns Object[]
 */
export async function dbGetAll(document) {
  const data = localStorage.getItem(document);
  if (data) {
    return JSON.parse(data);
  } else if (shouldCreateDemoData) {
    // Create and set demodata
    const demodata = await createDemoData();
    return demodata[document];
  }
  return [];
}

/**
 * Add new items to old data and save
 * @param {String} document
 * @param {Object[]} items
 */
export async function dbAdd(document, items) {
  let data = await dbGetAll(document);

  // Get the old data and combine with new items
  localStorage.setItem(document, JSON.stringify([...data, ...items]));
}

/**
 * Update items
 * @param {String} document
 * @param {Object[]} items
 */
export async function dbUpdate(document, items) {
  const data = await dbGetAll(document);
  items.forEach((item) => {
    // Find item that needs to be updated
    let found = data.find((i) => item.id === i.id);
    Object.assign(found, item);
  });
  localStorage.setItem(document, JSON.stringify(data));
}

/**
 * Delete items
 * @param {String} document
 * @param {Object[]} items
 */
export async function dbRemove(document, items) {
  const data = await dbGetAll(document);
  const ids = items.map((i) => i.id); // Get ids to be deleted
  const remaining = data.filter((i) => !ids.includes(i.id));
  localStorage.setItem(document, JSON.stringify(remaining));
}

/**
 * Live updates not in use in local storage
 * @param {String} document
 * @param {function()} handleChanges
 */
export function dbLiveUpdates(document, handleChanges) {}

/**
 * Creates demodata to local storage so you can play around with it.
 * @returns Array of documents
 */
async function createDemoData() {
  const demodata = require("./demodata.json");
  let data = [];
  demodata.forEach((doc) => {
    localStorage.setItem(doc.document, JSON.stringify(doc.data));
    data[doc.document] = doc.data;
  });
  return data;
}
