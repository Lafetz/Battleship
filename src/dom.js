import { removeSelection, displaySelectedAreas } from "./selectDom";
export const createBoard = function (boardName) {
  const gameBoard = document.querySelector(`#${boardName}`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const box = document.createElement("div");
      box.classList.add("gridBox");
      const coordinate = `${i}` + j;
      box.setAttribute("data-coor", coordinate);
      gameBoard.append(box);
    }
  }
};
//45 //46 //47 //48[[x],[y]]

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
// ship.forEach((x) => {
//   if (x[0] + x[1] == ) {
//   }

//
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
    console.log(canBeplaced);
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
  boxes.forEach((box) => {
    box.addEventListener("mouseleave", () => {
      boxes.forEach((x) => {
        // const taken = dontPaint(placedShips, x.getAttribute("data-coor"));
        // console.log(taken);
        x.style.background = "antiquewhite";
        displaySelectedAreas(placedShips);
      });
    });
  });
  gameBoard.addEventListener(
    "click",
    (e) => {
      const shipcoors = [];
      const shipcoor = e.target.getAttribute("data-coor");
      shipcoors.push(shipcoor.split("").map((x) => parseInt(x)));
      if (shiptype + shipcoors[0][1] > 10) {
        return;
      }
      for (let i = 1; i < shiptype; i++) {
        shipcoors.push([parseInt(shipcoor[0]), parseInt(shipcoors[0][1]) + i]);
      }
      console.log(shipcoors);
      gameBoard.removeEventListener("mouseover", hoverShips);
      placedShips.push(shipcoors);
      removeSelection(shiptype);
      displaySelectedAreas(placedShips);
    },
    { once: true }
  );
};
