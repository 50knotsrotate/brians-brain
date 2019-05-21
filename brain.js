const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const rows = 80;
var grid = [];

class Cell {
  constructor(x, y, pos) {
    this.x = x;
    this.y = y;
    this.size = canvas.width / rows;
    //possible states 0, 1, dying
      this.state = Math.random() > .35
    this.newState = null;
    this.pos = pos

    this.getNeighbors = function() {
      var count = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (grid[(this.pos.x + j + rows) % rows][(this.pos.y + i + rows) % rows].state === true) {
            count++;
          }
        }
      }
      return count;
    };

    this.update = function() {
      if (!this.state) {
        this.newState = this.getNeighbors() == 2;
      } else if (this.state === true) {
        this.newState = "dying";
      } else if (this.state === "dying") {
        this.newState = false;
      }
      //Holy moly this is ugly.. got clean that up
    };
  }
}

(function makeGrid() {
  for (let i = 0; i < rows; i++) {
    let _temp = [];
    for (let j = 0; j < rows; j++) {
      _temp.push(
        new Cell(j * (canvas.width / rows), i * (canvas.height / rows), {x: i, y: j})
      );
    }
    grid.push(_temp);
  }
})();

function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      context.beginPath();
      if (grid[j][i].state == true) {
        context.fillStyle = "white";
      } else if (grid[j][i].state == "dying") {
        context.fillStyle = "blue";
      } else if (grid[j][i].state == 0) {
        context.fillStyle = "black";
      }
      context.rect(
        grid[j][i].x,
        grid[j][i].y,
        grid[j][i].size,
        grid[j][i].size
      );
      context.fill();
       context.stroke();
    }
  }
}

// canvas.addEventListener('click', () => { 
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < rows; j++) {
//       grid[j][i].update();
//     }
//   }

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < rows; j++) {
//       grid[j][i].state = grid[j][i].newState;
//       grid[j][i].newState = null;
//     }
//   }
// })

setInterval(() => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      grid[j][i].update();
    }
    }
    
    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < rows; j++) { 
            grid[j][i].state = grid[j][i].newState
            grid[j][i].newState = null
        }
    }
  drawGrid();
}, 50);
