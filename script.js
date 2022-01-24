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
  const flag = 0;

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

  allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const score = document.querySelector('.scoreboard');
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
          if (grid[i][j] == 0) {
            grid = checkBlock(grid, i, j, index + 1, flag);
          }
        }
      }
      score.textContent = ++stepCount;
      displayGrid(grid);
    });
  });

  function checkBlock(grid, i, j, index, flag) {
    if (grid[i]?.[j + 1] == index) {
      grid[i][j + 1] = 0;
      flag++;
    }

    if (grid[i + 1]?.[j] == index) {
      grid[i + 1][j] = 0;
      flag++;
    }

    if (grid[i]?.[j - 1] == index) {
      grid[i][j - 1] = 0;
      flag++;
    }

    if (grid[i - 1]?.[j] == index) {
      grid[i - 1][j] = 0;
      flag++;
    }

    if (grid[i]?.[j + 1] == index) {
      grid[i + 1][j + 1] = 0;
      flag++;
    }

    if (!flag) {
      return grid;
    }

    return checkBlock(grid, i, j, index, 0);
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
