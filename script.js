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

        divEl.style.cssFloat = 'left';
        divEl.style.backgroundColor = colors[grid[i][j]];
        divEl.style.width = '1.5rem';
        divEl.style.height = '1.5rem';
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
            grid = checkBlock(grid, i, j, index + 1);
          }
        }
      }
      score.textContent = ++stepCount;
      displayGrid(grid);
    });
  });

  function checkBlock(grid, i, j, index) {
    console.log(index);
    if (grid[i]?.[j + 1] == index) {
      grid[i][j + 1] = 0;
    }

    if (j >= 1) {
      if (grid[i][j - 1] == index) {
        grid[i][j - 1] = 0;
      }
    }

    if (i >= 1) {
      if (grid[i - 1][j] == index) {
        grid[i - 1][j] = 0;
      }
    }

    if (grid[i + 1]?.[j] == index) {
      grid[i + 1][j] = 0;
    }
    return grid;
  }

  function isFinish() {
    if (grid.every((i) => i.every((j) => j === 0))) {
      alert('Bitti');
    }
  }
}

start();
