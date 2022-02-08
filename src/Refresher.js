/**
 * Module that fetches data every on interval.
 * Paused when browser looses focus.
 * If that fails only fetch for set amount of time and continue if interraction with the page.
 */

const backgroundMins = 5;

const updateFrequency = 1;

let maxTimes = null;

let refreshCallback = null;
let intervalRef = null;
let countDownCounter = null;

/**
 *
 * @param {function} callback parent function that fetches the data
 * @returns
 */
export function init(callback) {
  if (intervalRef) {
    return;
  }

  // The actual refresh function
  refreshCallback = callback;

  // Set interval to run every 2 sec
  intervalRef = setInterval(refresh, updateFrequency * 1000);

  // Convert minutes to seconds and divide with frequency to get how many times to update
  maxTimes = (backgroundMins * 60) / updateFrequency;

  countDownCounter = maxTimes;

  // If browser out of focus then don't fetch data
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      countDownCounter = 0;
    } else if (document.visibilityState === "visible") {
      // Once browser is focused again -> fetch
      topUpcountDownCounter();
      refreshCallback();
    }
  });

  // Visibility change does not always work so when user is interracting
  // with the page we want to top up the countDownCounter
  document.addEventListener("mousemove", topUpcountDownCounter);
  document.addEventListener("touchstart", topUpcountDownCounter);
}
function topUpcountDownCounter() {
  if (countDownCounter < maxTimes) {
    countDownCounter = maxTimes;
  }
}

function refresh() {
  if (countDownCounter > 0) {
    refreshCallback();
    countDownCounter--;
  }
}
