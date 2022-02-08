/**
 * Module that fetches data every 2 seconds but pauses in the background or stop when idle for 10min
 */

const maxTimes = 600;

let refreshCallback = null;
let intervalRef = null;
let counter = maxTimes;

/**
 *
 * @param {function} callback parent function that fetches the data
 * @returns
 */
export function init(callback) {
  if (intervalRef) {
    return;
  }

  refreshCallback = callback;

  // Set interval to run every 2 sec
  intervalRef = setInterval(refresh, 2000);

  // If browser out of focus then don't fetch data
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      counter = 0;
    } else if (document.visibilityState === "visible") {
      // Once browser is focused again -> fetch
      topUpCounter();
      refreshCallback();
    }
  });

  // Visibility change does not always work so when user is interracting
  // With the page we want to top up the counter
  document.addEventListener("mousemove", topUpCounter);
  document.addEventListener("touchstart", topUpCounter);
}
function topUpCounter() {
  if (counter < maxTimes) {
    counter = maxTimes;
  }
}

function refresh() {
  if (counter > 0) {
    refreshCallback();
    counter--;
  }
}
