import { removeSelection, displaySelectedAreas } from "./dom2";
export const createBoard = function (boardName) {
  const gameBoard = document.querySelector(`#${boardName}`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const box = document.createElement("div");
      box.classList.add("gridBox");
      const coordinate = `${i}` + j;

      if (boardName == "ai") {
        box.classList.add("gridBoxAi");
        box.setAttribute("data-coori", coordinate);
      }
      if (boardName == "player") {
        box.classList.add("gridBoxPlayer");
        box.setAttribute("data-coor", coordinate);
      }
      gameBoard.append(box);
    }
  }
};

const placeTaken = function (placedShips, coors) {
  let taken = false;
  placedShips.forEach((ship) => {
    coors.forEach((coor) => {
      ship.forEach((x) => {
        if (x.join("") == coor.join("")) taken = true;
      });
    });
  });
  return taken;
};
const dontPaint = function (placedShips, coor) {
  let taken = false;
  placedShips.forEach((ship) => {
    ship.forEach((x) => {
      if (x.join("" == coor)) taken = true;
    });
  });
  return taken;
};

export const selectShips = function (shiptype, placedShips) {
  shiptype = parseInt(shiptype);
  const hoverShips = function (e) {
    const shipcoors = [];
    const shipcoor = e.target.getAttribute("data-coor");
    shipcoors.push(shipcoor.split("").map((x) => parseInt(x)));
    if (shiptype + shipcoors[0][1] > 10) {
      return;
    }
    for (let i = 1; i < shiptype; i++) {
      shipcoors.push([parseInt(shipcoor[0]), parseInt(shipcoors[0][1]) + i]);
    }
    const canBeplaced = placeTaken(placedShips, shipcoors);

    if (placeTaken(placedShips, shipcoors)) {
      return;
    }
    shipcoors.forEach((ship) => {
      const gridBox = document.querySelector(`[data-coor='${ship.join("")}']`);
      gridBox.style.background = "grey";
    });
  };
  const gameBoard = document.querySelector(`#player`);
  gameBoard.addEventListener("mouseover", hoverShips);
  const boxes = document.querySelectorAll(".gridBox");
  const leaveBox = function () {
    boxes.forEach((x) => {
      x.style.background = "antiquewhite";
      displaySelectedAreas(placedShips);
    });
  };
  boxes.forEach((box) => {
    box.addEventListener("mouseleave", leaveBox);
  });

  gameBoard.addEventListener(
    "click",
    (e) => {
      gameBoard.removeEventListener("mouseover", hoverShips);
      const shipcoors = [];
      const shipcoor = e.target.getAttribute("data-coor");
      shipcoors.push(shipcoor.split("").map((x) => parseInt(x)));
      if (shiptype + shipcoors[0][1] > 10) {
        return;
      }
      for (let i = 1; i < shiptype; i++) {
        shipcoors.push([parseInt(shipcoor[0]), parseInt(shipcoors[0][1]) + i]);
      }
      placedShips.push(shipcoors);
      removeSelection(shiptype);
      displaySelectedAreas(placedShips);
      boxes.forEach((box) => {
        box.removeEventListener("mouseleave", leaveBox);
      });
    },
    { once: true }
  );
};
