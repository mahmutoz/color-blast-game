'use strict';

function start() {
  const colors = [
    '#faedf0',
    '#11052C',
    '#3E8E7E',
    '#EC255A',
    '#e9c46a',
    '#325288',
  ];

  let grid = [];
  let stepCount = 0;
  const rowCount = 30;
  const columnCount = 40;

  createBlock();

  function createBlock() {
    for (let i = 0; i < rowCount; i++) {
      let column = [];
      for (let j = 0; j < columnCount; j++) {
        let rand = Math.ceil(Math.random() * 5);
        column.push(rand);
      }
      grid.push(column);
    }
    grid[0][0] = 0;
    displayGrid();
  }

  function displayGrid() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        let divEl = document.createElement('div');

        divEl.style.backgroundColor = colors[grid[i][j]];
        gameBoard.appendChild(divEl);
      }
    }
    isFinish();
  }

  let allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const score = document.querySelector('.scoreboard');
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
          if (grid[i][j] == 0) {
            let control = checkBlock(grid, i, j, index + 1, 0);
            i = control['i'];
            j = control['j'];
          }
        }
      }
      score.textContent = ++stepCount;
      displayGrid();
    });
  });

  function checkBlock(grid, i, j, color, flag) {
    // top neighbor
    if (grid[i - 1]?.[j] == color) {
      grid[i - 1][j] = 0;
      flag = 1;
    }

    // right neighbor
    if (grid[i]?.[j + 1] == color) {
      grid[i][j + 1] = 0;
      flag = 1;
    }

    // bottom neighbor
    if (grid[i + 1]?.[j] == color) {
      grid[i + 1][j] = 0;
      flag = 1;
    }

    // left neighbor
    if (grid[i]?.[j - 1] == color) {
      grid[i][j - 1] = 0;
      flag = 1;
    }

    if (flag == 1) {
      return { i: 0, j: 0 };
    } else if (flag == 0) {
      return { i: i, j: j };
    }
  }

  function isFinish() {
    if (grid.every((i) => i.every((j) => j === 0))) {
      document.querySelector('.step').textContent = stepCount;
      document.querySelector('.game-over-modal').style.display = 'flex';
      document.querySelector('.color-control ').style.pointerEvents = 'none';
    }
  }

  // Restart
  document.querySelectorAll('.restart').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.scoreboard').textContent = '0';
      document.querySelector('.color-control ').style.pointerEvents = 'visible';
      document.querySelector('.game-over-modal').style.display = 'none';
      stepCount = 0;
      grid = [];
      createBlock();
    });
  });
}
start();
