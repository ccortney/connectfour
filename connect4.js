/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// What to change back after testing
// board back to const

const WIDTH = 7; // x
const HEIGHT = 6; // y

let currPlayer = 'player1'; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
const playerTitle = document.querySelector('#player-title');
playerTitle.innerText = `${currPlayer}`;



/** makeBoard: create in-JS board structure:
 *    board = array of 6 rows(height), each row is array of 7 cells(width)  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let y=0; y<HEIGHT; y++) {
    // Creates an array with 7 null elements (the size of the width)
    const rowArr = [];
    for (let x=0; x<WIDTH; x++) {
      rowArr.push(null);
    }
    // Pushes each row array into the board array in order to have a height of 6
    board.push(rowArr);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // Create the top row of the table which players will click when playing
  const top = document.createElement("tr");
  // Give the top row the id column-top
  top.setAttribute("id", "column-top");
  // When the top row is clicked, run the handleCLick function
  top.addEventListener("click", handleClick);

  // For each column, create a headcell (first cell of column) and give it an id of x
  // Append the headcell to the top row (making it the first cell of the column)
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // Append the top element (top row and headcell) to the htmlBoard element
  htmlBoard.append(top);

  // Create enough rows that form the total height
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // Create enough cells to form the total width
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // Set the cell id as yvalue - xvalue (dash, not subtract)
      cell.setAttribute("id", `${y}-${x}`);
      // Append each cell to the row
      row.append(cell);
    }
    // Append each row and its id to the htmlBoard element
    htmlBoard.append(row);
  };
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
// Search the x olumn you clicked to find the lowest y cell that is not occupied. Return that y value. 
// If the entire column is filled, return null.
  for (let y=HEIGHT-1; y>=0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // create a new div that will be the game piece
    const newPiece = document.createElement("div");
    // give the div/piece the two classes
    // the piece class makes it look like a game piece
    // the currPlayer class changes the color (red/blue)
    newPiece.classList.add("piece", `${currPlayer}`);
    // find the bottom cell using the id
    const cell = document.getElementById(`${y}-${x}`);
    // add the game piece to the cell
    cell.append(newPiece);
  }
    
/** endGame: announce game end */

function endGame(msg) {
  // pop up alert message with the winner
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log(x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y===null) {
    return;
  }

  // add current player to the array to indicate that it is filled by a game piece
  board[y][x] = currPlayer;
  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    return endGame(`It is a tie!`);
  }
  
  // change player
  currPlayer === 'player1' ? currPlayer = 'player2' : currPlayer = 'player1';
  playerTitle.innerText = `${currPlayer}`;
}

function checkForTie() {
  let filledRow = 0;
  for (let y=0; y<HEIGHT; y++) {
    if (!board[y].includes(null)) {
      filledRow++;
    };
    if (filledRow === HEIGHT) {
    return true;
    }
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: array of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // Loop through each row
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // Determine if there is a horizontal win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // Determine if there is a vertical win
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // Determine if there is a diagonal down right win
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // Determine if there is a diagonal down left win
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // Run the _win function with each type or win
      // If one of the win types return true, that player wins!
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
