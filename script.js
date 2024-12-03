const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

const rows = 23;
const cols = 23;
const gridSize = 26; // Size of each cell (in pixels) to fit 50x50 grid in 600x600 canvas

// Initialize the maze with 0s and set the starting point
let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1],
  [1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 0, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1],
  [1, 4, 4, 4, 1, 4, 1, 4, 0, 4, 0, 4, 0, 4, 0, 4, 1, 4, 1, 4, 4, 4, 1],
  [1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1],
  [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
  [1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1],
  [3, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 4, 3],
  [1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 1],
  [1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1],
  [1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1],
  [1, 4, 4, 4, 1, 4, 1, 4, 0, 4, 0, 4, 0, 4, 0, 4, 1, 4, 1, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1],
  [1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 1, 0, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1],
  [1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1],
  [1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

//starting position of player
let playerPosition = [5, 5];
maze[playerPosition[0]][playerPosition[1]] = 2;
let orientation = 0; //initialise the orientation of the player
// 0: UP
// 1: LEFT
// 2: RIGHT
// 3: DOWN

//initialise the wall positions

// Colors for different cell values
const colors = {
  0: "#ffffff", // White for empty cells
  1: "#000000", // Black for walls
  2: "#ff0000", // Red for the player
  3: "#00ff00", // Green for the teleporter
  4: "#ffff00" // Yellow for pallets 
};

// Draw the grid on the canvas
function drawMaze() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellValue = maze[row][col];

      //fill in the cell with the color
      ctx.fillStyle = colors[cellValue];
      // draw small circles if the cellValue is 4
      if (cellValue === 4) {
        ctx.beginPath();
        ctx.arc(col * gridSize + gridSize / 2, row * gridSize + gridSize / 2, gridSize / 7, 0, 2 * Math.PI);
        ctx.fill();
      } else ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);

      // Draw grid lines for better visualization
      ctx.strokeStyle = "#cccccc"; // Light gray for grid lines
      ctx.strokeRect(col * gridSize, row * gridSize, gridSize, gridSize);


    }
  }
}

// Initial render of the maze
drawMaze();

// Function to move the player
function turnPlayer(event) {
  console.log("Key pressed: " + event.key);

  let x = playerPosition[0];
  let y = playerPosition[1];

  switch (event.key) {
    case "w": // Up
      if (x > 0 && maze[x - 1][y] !== 1) {
        orientation = 0; // Face up
      }
      break;
    case "s": // Down
      if (x < rows - 1 && maze[x + 1][y] !== 1) {
        orientation = 3; // Face down
      }
      break;
    case "a": // Left
      if (y > 0 && maze[x][y - 1] !== 1) {
        orientation = 1; // Face left
      }
      break;
    case "d": // Right
      if (y < cols - 1 && maze[x][y + 1] !== 1) {
        orientation = 2; // Face right
      }
      break;
  }

  // Redraw the maze
  drawMaze();
}

// Function to move the player
function movePlayer() {
  let x = playerPosition[0];
  let y = playerPosition[1];

  // Update position based on orientation
  switch (orientation) {
    case 0: // Up
      if (x > 0 && maze[x - 1][y] !== 1) x--; // Ensure not out of bounds or hitting a wall
      break;
    case 1: // Left
      if (y > 0 && maze[x][y - 1] !== 1) y--;
      // If the player is at the teleporter, teleport them to the other side
      if (x === 11 && y === 0) {
        y = 22;
      }
      break;
    case 2: // Right
      if (y < cols - 1 && maze[x][y + 1] !== 1) y++;
      // If the player is at the teleporter, teleport them to the other side
      if (x === 11 && y === 22) {
        y = 0;
      }
      break;
    case 3: // Down
      if (x < rows - 1 && maze[x + 1][y] !== 1) x++;
      break;
  }

  // Clear the previous player position
  maze[playerPosition[0]][playerPosition[1]] = 0;

  // redrawing the teleporter
  maze[11][0] = 3;
  maze[11][22] = 3;

  // Set the new player position
  playerPosition = [x, y];
  maze[x][y] = 2;

  console.log("Player position:");
  console.log(playerPosition);
  console.log("orientation: " + orientation);

  // Redraw the maze
  drawMaze();
}

// Add event listener to the document to listen for key press
document.addEventListener("keydown", turnPlayer);

//call the movePlayer function every 500ms
setInterval(movePlayer, 500);
