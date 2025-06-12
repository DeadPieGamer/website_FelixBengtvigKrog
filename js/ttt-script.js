const timeBetweenMoves = 1000 * 60 * 5; // In milliseconds. This should be equivalent to 5 minutes

$(".ttt-box").on("click", function (evt) {
  doMove($(this));
});

$("#ttt-reset-button").on("click", function (evt) {
  resetGame();
});

function resetGame() {
  console.log("Game reset");
  saveBoard(new TttBoard());
  loadBoard();
}

function TttBoard() {
  return {
    row: [
      {
        column: ["", "", ""],
      },
      {
        column: ["", "", ""],
      },
      {
        column: ["", "", ""],
      },
    ],
    nextMove: "x",
    lastMoment: 0,
  };
}

// Bad code right here, but I was quite stressed with other stuff when writing it, and didn't wanna return to fix something that ain't broke later
function figureOutBox(box) {
  let splitBox = box.attr("class").split(" ");
  let thisLocation = [];
  switch (splitBox[1]) {
    case "ttt-r1":
      thisLocation.push(0);
      break;
    case "ttt-r2":
      thisLocation.push(1);
      break;
    default:
      thisLocation.push(2);
      break;
  }

  switch (splitBox[2]) {
    case "ttt-c1":
      thisLocation.push(0);
      break;
    case "ttt-c2":
      thisLocation.push(1);
      break;
    default:
      thisLocation.push(2);
      break;
  }

  return thisLocation;
}

async function doMove(whichBox) {
  let currentTime = new Date().getTime();

  let currentGameBoard = new TttBoard();

  // let boardRequest = $.get("/projects/personal/web-game/current");

  $.get("/projects/personal/web-game/current", (data) => {
    console.log("Found following existing game: " + data);
    let parsedData = JSON.parse(data);

    // Attempt to rebuild structure as current parse states that row doesn't exist
    for (let i = 0; i < currentGameBoard.row.length; i++) {
      currentGameBoard.row[i] = { column: parsedData[`row[${i}][column][]`] };
    }
    currentGameBoard.nextMove = parsedData.nextMove;
    currentGameBoard.lastMoment = parsedData.lastMoment;
  })
    .fail(() => {
      console.log("Found no existing game");
    })
    .always(() => {
      // If enough time hasn't passed, return
      let timeDif = currentGameBoard.lastMoment - currentTime;

      timeDif += timeBetweenMoves;

      console.log(
        "I am at time: " +
          currentTime +
          ", which is " +
          timeDif +
          " timeDif. With timeBetweenMoves added: " +
          (timeDif + timeBetweenMoves)
      );

      if (timeDif > 0) {
        alert(
          `You moved too quickly! There's still: ${Math.floor(
            timeDif / 60.0 / 1000.0
          )} minutes and ${Math.floor(
            (timeDif / 1000.0) % 60
          )} seconds left until the next possible move.`
        );
        return;
      }

      let boxCoordinates = figureOutBox(whichBox);

      // Check if move is allowed
      if (
        currentGameBoard.row[boxCoordinates[0]].column[boxCoordinates[1]] !== ""
      ) {
        alert("Cannot make a move on a filled square");
        return;
      }

      // Make image an x or o
      let imageBox = whichBox.children();
      imageBox.attr(
        "src",
        "/assets/game-demos/tic-tac-toe/" + currentGameBoard.nextMove + ".svg"
      );
      imageBox.attr("alt", currentGameBoard.nextMove);
      imageBox.removeClass("d-none");

      currentGameBoard.row[boxCoordinates[0]].column[boxCoordinates[1]] =
        currentGameBoard.nextMove;

      currentGameBoard.nextMove = currentGameBoard.nextMove === "x" ? "o" : "x";
      currentGameBoard.lastMoment = currentTime;

      saveBoard(currentGameBoard);
    });
}

function saveBoard(boardObj) {
  $.post("/projects/personal/web-game", boardObj);
}

function loadBoard() {
  let currentGameBoard = new TttBoard();
 
  $.get("/projects/personal/web-game/current", (data) => {
    let parsedData = JSON.parse(data);

    // Attempt to rebuild structure as current parse states that row doesn't exist
    for (let i = 0; i < currentGameBoard.row.length; i++) {
      currentGameBoard.row[i] = { column: parsedData[`row[${i}][column][]`] };
    }
  })
    .fail(() => {
      console.log("Found no existing game");
    })
    .always(() => {
      for (let i = 0; i < currentGameBoard.row.length; i++) {
        for (let j = 0; j < currentGameBoard.row[0].column.length; j++) {
          let imageBox = $(`.ttt-r${i + 1}.ttt-c${j + 1}`).children();

          // Make empty and go to next if this is empty
          if (currentGameBoard.row[i].column[j] === "") {
            imageBox.attr("alt", "");
            imageBox.addClass("d-none");
            continue;
          }
          imageBox.attr(
            "src",
            "/assets/game-demos/tic-tac-toe/" +
              currentGameBoard.row[i].column[j] +
              ".svg"
          );
          imageBox.attr("alt", currentGameBoard.row[i].column[j]);
          imageBox.removeClass("d-none");
        }
      }
    });
}

loadBoard();
