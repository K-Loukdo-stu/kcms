export function secondsToPlayerFormat(seconds) {
  // Calculate minutes and remaining seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);

  // Ensure leading zero if necessary
  var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
  var formattedSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;

  return formattedMinutes + ":" + formattedSeconds;
}