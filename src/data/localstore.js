/**
 * Uses local storage as simlated database. Nothing is stored permanently.
 */

if (!process.env.REACT_APP_apiKey) {
  console.info("Using local storage as database");
}

/**
 * Get database items from local storage or return empty array
 * @param {String} document
 * @returns Object[]
 */
export async function dbGetAll(document) {
  const data = localStorage.getItem(document);
  if (data) {
    return JSON.parse(data);
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
