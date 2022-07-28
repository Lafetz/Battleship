export const createBoard = function (boardName) {
  const gameBoard = document.querySelector(`#${boardName}`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; i++) {
      const box = document.createElement("div");
      box.classList.add("gridBox");
      gameBoard.append(box);
    }
  }
};
