$("#game-start-button").on("click", beginGame);

function beginGame() {
  var urlParts = $(location).attr("href").split("/");
  var whatGame = urlParts[urlParts.length-1];

  $("#game-start-button").remove();
  $("#gameplay-frame").load(`/assets/game-demos/player-${whatGame}.html`);
}
