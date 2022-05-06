console.log("Using local storage as database");

/**
 * Get database items from local storage or return empty array
 * @param {string} document
 * @returns Object[]
 */
export async function dbGetAll(document) {
  const data = localStorage.getItem(document);
  if (data) {
    return Array.from(JSON.parse(data));
  }
  return [];
}

/**
 * Add new items to old data and save
 * @param {string} document
 * @param {Object[]} items
 */
export async function dbAdd(document, items) {
  let data = await dbGetAll(document);

  // Get the old data and combine with new items
  localStorage.setItem(document, JSON.stringify([...data, ...items]));
}

/**
 * Update items
 * @param {string} document
 * @param {Object[]} items
 */
export async function dbUpdateBatch(document, items) {
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
 * @param {string} document
 * @param {Object[]} items
 */
export async function dbDeleteBatch(document, items) {
  const data = await dbGetAll(document);
  const ids = items.map((i) => i.id); // Get ids to be deleted
  const remaining = data.filter((i) => !ids.includes(i.id));
  localStorage.setItem(document, JSON.stringify(remaining));
}

/**
 * Live updates not in use in local storage
 * @param {string} document
 * @param {function} handleChanges
 */
export function dbLiveUpdates(document, handleChanges) {}
