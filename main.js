/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard),
/* harmony export */   "selectShips": () => (/* binding */ selectShips)
/* harmony export */ });
/* harmony import */ var _dom2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom2 */ "./src/dom2.js");

const createBoard = function (boardName) {
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

const selectShips = function (shiptype, placedShips) {
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
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
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
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.removeSelection)(shiptype);
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
      boxes.forEach((box) => {
        box.removeEventListener("mouseleave", leaveBox);
      });
    },
    { once: true }
  );
};


/***/ }),

/***/ "./src/dom2.js":
/*!*********************!*\
  !*** ./src/dom2.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayBoard": () => (/* binding */ displayBoard),
/* harmony export */   "displayBoardAi": () => (/* binding */ displayBoardAi),
/* harmony export */   "displaySelectedAreas": () => (/* binding */ displaySelectedAreas),
/* harmony export */   "gameFinished": () => (/* binding */ gameFinished),
/* harmony export */   "removeSelection": () => (/* binding */ removeSelection),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

const removeSelection = function (n) {
  const removeShip = document.querySelector(`[data-ships='${n}']`);
  if (removeShip === null) return;
  removeShip.remove();
};
const displaySelectedAreas = function (areas) {
  areas.forEach((ship) => {
    ship.forEach((coor) => {
      coor = coor.join("");
      const gridBox = document.querySelector(`[data-coor="${coor}"]`);
      gridBox.style.background = "green";
    });
  });
};
const startGame = function () {
  const placedShipsSelection = document.querySelector(".playerShips");
  placedShipsSelection.remove();
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBoard)("ai");
};
const displayBoard = function (gameBoard) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinate = [i, j].join("");
      const box = document.querySelector(`[data-coor="${coordinate}"]`);
      if (gameBoard.board[i][j] == 0) {
        box.style.backgroundColor = "antiquewhite";
      } else if (gameBoard.board[i][j] == 1) {
        box.style.background = "green";
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "blue";
      } else {
        box.style.background = "red";
      }
    }
  }
};

const displayBoardAi = function (gameBoard) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinate = [i, j].join("");
      const box = document.querySelector(`[data-coori="${coordinate}"]`);
      if (gameBoard.board[i][j] == 3) {
        box.style.backgroundColor = "red";
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "blue";
      } else {
        box.style.backgroundColor = "antiquewhite";
      }
    }
  }
};
const gameFinished = function (name) {
  const body = document.querySelector("body");
  const background = document.createElement("div");
  background.classList.add("background");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("messageDiv");
  const message = document.createElement("h3");
  message.textContent = `${name} has won!!`;
  messageDiv.append(message);
  background.append(messageDiv);
  body.append(background);
};


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findShip": () => (/* binding */ findShip),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
//0 not taken and not hit
//1 taken by a ship
//2 area that is hit
//3 hit ship
//ships 5 types 5 4 3 3 2

const gameBoard = function (fleet, name) {
  const board = new Array(10).fill(0).map((x) => new Array(10).fill(0));
  const ships = [...fleet];

  const placeShips = (function () {
    ships.forEach((ship) => {
      const shipCoordinates = [...ship.coordinate];
      shipCoordinates.forEach((c) => {
        const x = c[0];
        const y = c[1];
        board[x][y] = 1;
      });
    });
  })();

  const receiveAttack = function (x, y) {
    if (board[x][y] == 2 || board[x][y] == 3) {
      console.log("ai");
      return "Error:area hit before";
    }
    if (board[x][y] == 0) board[x][y] = 2;
    else if (board[x][y] == 1) {
      board[x][y] = 3;
      const shipIndex = findShip(fleet, x, y);
      ships[shipIndex].hit();
    }
  };

  const shipsSunk = function () {
    return ships.every((ship) => ship.sunk() == true);
  };
  return {
    name,
    receiveAttack,
    shipsSunk,
    board,
  };
};

const findShip = function (fleet, x, y) {
  let shipId;
  fleet.forEach((ship, i) => {
    ship.coordinate.forEach((c) => {
      if (c[0] == x && c[1] == y) {
        shipId = i;
      }
    });
  });
  return shipId;
};


/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aiHitCoordnates": () => (/* binding */ aiHitCoordnates),
/* harmony export */   "gameStart": () => (/* binding */ gameStart)
/* harmony export */ });
/* harmony import */ var _dom2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom2 */ "./src/dom2.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./players */ "./src/players.js");




const gameStart = function (playerCoordinates) {
  const playerFleet = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.makeShips)(playerCoordinates);
  const aiFleet = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.makeShips)((0,_players__WEBPACK_IMPORTED_MODULE_3__.aiPlayerCoordinates)());
  const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.gameBoard)(playerFleet, "player");
  const aiGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.gameBoard)(aiFleet, "ai");
  (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displayBoard)(playerGameboard);
  (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displayBoardAi)(aiGameboard);
  hitAiBoard(aiGameboard, playerGameboard);
};
const hitAiBoard = function (aiGameboard, playerGameboard) {
  const aiBoxes = document.querySelectorAll(".gridBoxAi");
  aiBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const coordinate = box.getAttribute("data-coori").split("");
      if (checkCoor(coordinate, aiGameboard)) {
        return;
      }
      aiGameboard.receiveAttack(coordinate[0], coordinate[1]);
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displayBoardAi)(aiGameboard);
      gamefinished(aiGameboard, playerGameboard);
      const aiCoordinate = aiHitCoordnates(playerGameboard);
      playerGameboard.receiveAttack(aiCoordinate[0], aiCoordinate[1]); ///////////must not repeat
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displayBoard)(playerGameboard);
      gamefinished(aiGameboard, playerGameboard);
    });
  });
};

const aiHitCoordnates = function (aiGameboard) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  let coor = [x, y];
  if (aiGameboard.board[x][y] == 2 || aiGameboard.board[x][y] == 3) {
    coor = aiHitCoordnates(aiGameboard);
  }

  return coor;
};
const checkCoor = function (coordinate, gameBoard) {
  const x = coordinate[0];
  const y = coordinate[1];
  if (gameBoard.board[x][y] == 2 || gameBoard.board[x][y] == 3) {
    return true;
  }
};
const gamefinished = function (board1, board2) {
  if (board1.shipsSunk()) {
    (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.gameFinished)(board1.name);
    console.log(12);
  }
  if (board2.shipsSunk()) {
    (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.gameFinished)(board2.name);
    console.log(12);
  }
};


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aiPlayerCoordinates": () => (/* binding */ aiPlayerCoordinates),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
const player = function () {
  const hitCoords = new Array();
  const hitShip = function (x, y) {
    let repeat = false;
    hitCoords.forEach((coor, i) => {
      if (coor[0] == x && coor[1] == y) {
        repeat = true;
      }
    });
    if (repeat) return "repeat";
    hitCoords.push([x, y]);
  };
  return {
    hitShip,
  };
};
const aiPlayerCoordinates = function () {
  const numbers = [];
  const giveNo = function () {
    let random = Math.floor(Math.random() * 10);
    if (checkNo(random, numbers)) {
      console.log(random);
    }
    numbers.push(random);
    return random;
  };

  const random5 = Math.floor(Math.random() * 6);
  const ship5 = new Array(5).fill(0).map((x, i) => [1, random5 + i]);
  const random4 = Math.floor(Math.random() * 7);
  const ship4 = new Array(4).fill(0).map((x, i) => [3, random4 + i]);
  const random3 = Math.floor(Math.random() * 8);
  const ship3 = new Array(3).fill(0).map((x, i) => [4, random3 + i]);
  const ship33 = new Array(3).fill(0).map((x, i) => [6, random3 + i]);
  const random2 = Math.floor(Math.random() * 9);
  const ship2 = new Array(2).fill(0).map((x, i) => [9, random2 + i]);
  console.log(ship2, ship3, ship33, ship4, ship5);
  return [ship2, ship3, ship33, ship4, ship5];
};
const checkNo = function (x, numbers) {
  let exists = false;
  numbers.forEach((n) => {
    if (n == x) {
      exists = true;
    }
  });
  return exists;
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeShips": () => (/* binding */ makeShips),
/* harmony export */   "newShip": () => (/* binding */ newShip)
/* harmony export */ });
const newShip = function (coordinate) {
  const length = coordinate.length;
  const totalHits = [];
  const hit = function () {
    totalHits.push(1);
  };
  const sunk = function () {
    if (totalHits.length === length) return true;
    else return false;
  };

  return {
    hit,
    sunk,
    coordinate,
    totalHits,
  };
};
const makeShips = function (coordinates) {
  const fleet = [];
  coordinates.forEach((c) => {
    const ship = newShip(c);
    fleet.push(ship);
  });
  return fleet;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _dom2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom2 */ "./src/dom2.js");
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameloop */ "./src/gameloop.js");




const userShipSelction = (function () {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBoard)("player");
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const shipSize = ship.getAttribute("data-ships");
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__.selectShips)(shipSize, playerShips);

      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          if (playerShips.length == 5) {
            (0,_dom2__WEBPACK_IMPORTED_MODULE_1__.startGame)();
            (0,_gameloop__WEBPACK_IMPORTED_MODULE_2__.gameStart)(playerShips);
          }
        },
        { once: true }
      );
    });
  });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpREFBVzs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQVM7QUFDckIsWUFBWSxvREFBUztBQUNyQjtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbTIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbW92ZVNlbGVjdGlvbiwgZGlzcGxheVNlbGVjdGVkQXJlYXMgfSBmcm9tIFwiLi9kb20yXCI7XG5leHBvcnQgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbiAoYm9hcmROYW1lKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkTmFtZX1gKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJncmlkQm94XCIpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGAke2l9YCArIGo7XG5cbiAgICAgIGlmIChib2FyZE5hbWUgPT0gXCJhaVwiKSB7XG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZ3JpZEJveEFpXCIpO1xuICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yaVwiLCBjb29yZGluYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChib2FyZE5hbWUgPT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hQbGF5ZXJcIik7XG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIiwgY29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kKGJveCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwbGFjZVRha2VuID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29ycykge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvb3JzLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICBpZiAoeC5qb2luKFwiXCIpID09IGNvb3Iuam9pbihcIlwiKSkgdGFrZW4gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFrZW47XG59O1xuY29uc3QgZG9udFBhaW50ID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29yKSB7XG4gIGxldCB0YWtlbiA9IGZhbHNlO1xuICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC5qb2luKFwiXCIgPT0gY29vcikpIHRha2VuID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YWtlbjtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaGlwcyA9IGZ1bmN0aW9uIChzaGlwdHlwZSwgcGxhY2VkU2hpcHMpIHtcbiAgc2hpcHR5cGUgPSBwYXJzZUludChzaGlwdHlwZSk7XG4gIGNvbnN0IGhvdmVyU2hpcHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IHNoaXBjb29ycyA9IFtdO1xuICAgIGNvbnN0IHNoaXBjb29yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpO1xuICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICBpZiAoc2hpcHR5cGUgKyBzaGlwY29vcnNbMF1bMV0gPiAxMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXB0eXBlOyBpKyspIHtcbiAgICAgIHNoaXBjb29ycy5wdXNoKFtwYXJzZUludChzaGlwY29vclswXSksIHBhcnNlSW50KHNoaXBjb29yc1swXVsxXSkgKyBpXSk7XG4gICAgfVxuICAgIGNvbnN0IGNhbkJlcGxhY2VkID0gcGxhY2VUYWtlbihwbGFjZWRTaGlwcywgc2hpcGNvb3JzKTtcblxuICAgIGlmIChwbGFjZVRha2VuKHBsYWNlZFNoaXBzLCBzaGlwY29vcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNoaXBjb29ycy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj0nJHtzaGlwLmpvaW4oXCJcIil9J11gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JleVwiO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEJveFwiKTtcbiAgY29uc3QgbGVhdmVCb3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgYm94ZXMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgeC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJhbnRpcXVld2hpdGVcIjtcbiAgICAgIGRpc3BsYXlTZWxlY3RlZEFyZWFzKHBsYWNlZFNoaXBzKTtcbiAgICB9KTtcbiAgfTtcbiAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGxlYXZlQm94KTtcbiAgfSk7XG5cbiAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBnYW1lQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3ZlclNoaXBzKTtcbiAgICAgIGNvbnN0IHNoaXBjb29ycyA9IFtdO1xuICAgICAgY29uc3Qgc2hpcGNvb3IgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIik7XG4gICAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgICBpZiAoc2hpcHR5cGUgKyBzaGlwY29vcnNbMF1bMV0gPiAxMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXB0eXBlOyBpKyspIHtcbiAgICAgICAgc2hpcGNvb3JzLnB1c2goW3BhcnNlSW50KHNoaXBjb29yWzBdKSwgcGFyc2VJbnQoc2hpcGNvb3JzWzBdWzFdKSArIGldKTtcbiAgICAgIH1cbiAgICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcGNvb3JzKTtcbiAgICAgIHJlbW92ZVNlbGVjdGlvbihzaGlwdHlwZSk7XG4gICAgICBkaXNwbGF5U2VsZWN0ZWRBcmVhcyhwbGFjZWRTaGlwcyk7XG4gICAgICBib3hlcy5mb3JFYWNoKChib3gpID0+IHtcbiAgICAgICAgYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGxlYXZlQm94KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCB9IGZyb20gXCIuL2RvbVwiO1xuZXhwb3J0IGNvbnN0IHJlbW92ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIChuKSB7XG4gIGNvbnN0IHJlbW92ZVNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zaGlwcz0nJHtufSddYCk7XG4gIGlmIChyZW1vdmVTaGlwID09PSBudWxsKSByZXR1cm47XG4gIHJlbW92ZVNoaXAucmVtb3ZlKCk7XG59O1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlTZWxlY3RlZEFyZWFzID0gZnVuY3Rpb24gKGFyZWFzKSB7XG4gIGFyZWFzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIGNvb3IgPSBjb29yLmpvaW4oXCJcIik7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj1cIiR7Y29vcn1cIl1gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JlZW5cIjtcbiAgICB9KTtcbiAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHN0YXJ0R2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxhY2VkU2hpcHNTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllclNoaXBzXCIpO1xuICBwbGFjZWRTaGlwc1NlbGVjdGlvbi5yZW1vdmUoKTtcbiAgY3JlYXRlQm9hcmQoXCJhaVwiKTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGxheUJvYXJkID0gZnVuY3Rpb24gKGdhbWVCb2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbaSwgal0uam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9XCIke2Nvb3JkaW5hdGV9XCJdYCk7XG4gICAgICBpZiAoZ2FtZUJvYXJkLmJvYXJkW2ldW2pdID09IDApIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYW50aXF1ZXdoaXRlXCI7XG4gICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAxKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJncmVlblwiO1xuICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbaV1bal0gPT0gMikge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiYmx1ZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlCb2FyZEFpID0gZnVuY3Rpb24gKGdhbWVCb2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbaSwgal0uam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JpPVwiJHtjb29yZGluYXRlfVwiXWApO1xuICAgICAgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAzKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbaV1bal0gPT0gMikge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiYmx1ZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYW50aXF1ZXdoaXRlXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuZXhwb3J0IGNvbnN0IGdhbWVGaW5pc2hlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZChcImJhY2tncm91bmRcIik7XG4gIGNvbnN0IG1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlRGl2LmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlRGl2XCIpO1xuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBtZXNzYWdlLnRleHRDb250ZW50ID0gYCR7bmFtZX0gaGFzIHdvbiEhYDtcbiAgbWVzc2FnZURpdi5hcHBlbmQobWVzc2FnZSk7XG4gIGJhY2tncm91bmQuYXBwZW5kKG1lc3NhZ2VEaXYpO1xuICBib2R5LmFwcGVuZChiYWNrZ3JvdW5kKTtcbn07XG4iLCIvLzAgbm90IHRha2VuIGFuZCBub3QgaGl0XG4vLzEgdGFrZW4gYnkgYSBzaGlwXG4vLzIgYXJlYSB0aGF0IGlzIGhpdFxuLy8zIGhpdCBzaGlwXG4vL3NoaXBzIDUgdHlwZXMgNSA0IDMgMyAyXG5pbXBvcnQgeyBuZXdTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuZXhwb3J0IGNvbnN0IGdhbWVCb2FyZCA9IGZ1bmN0aW9uIChmbGVldCwgbmFtZSkge1xuICBjb25zdCBib2FyZCA9IG5ldyBBcnJheSgxMCkuZmlsbCgwKS5tYXAoKHgpID0+IG5ldyBBcnJheSgxMCkuZmlsbCgwKSk7XG4gIGNvbnN0IHNoaXBzID0gWy4uLmZsZWV0XTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbLi4uc2hpcC5jb29yZGluYXRlXTtcbiAgICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBjWzBdO1xuICAgICAgICBjb25zdCB5ID0gY1sxXTtcbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgaWYgKGJvYXJkW3hdW3ldID09IDIgfHwgYm9hcmRbeF1beV0gPT0gMykge1xuICAgICAgY29uc29sZS5sb2coXCJhaVwiKTtcbiAgICAgIHJldHVybiBcIkVycm9yOmFyZWEgaGl0IGJlZm9yZVwiO1xuICAgIH1cbiAgICBpZiAoYm9hcmRbeF1beV0gPT0gMCkgYm9hcmRbeF1beV0gPSAyO1xuICAgIGVsc2UgaWYgKGJvYXJkW3hdW3ldID09IDEpIHtcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcbiAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwKGZsZWV0LCB4LCB5KTtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNoaXBzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuaygpID09IHRydWUpO1xuICB9O1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwc1N1bmssXG4gICAgYm9hcmQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFNoaXAgPSBmdW5jdGlvbiAoZmxlZXQsIHgsIHkpIHtcbiAgbGV0IHNoaXBJZDtcbiAgZmxlZXQuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICAgIHNoaXAuY29vcmRpbmF0ZS5mb3JFYWNoKChjKSA9PiB7XG4gICAgICBpZiAoY1swXSA9PSB4ICYmIGNbMV0gPT0geSkge1xuICAgICAgICBzaGlwSWQgPSBpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHNoaXBJZDtcbn07XG4iLCJpbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlCb2FyZEFpLCBnYW1lRmluaXNoZWQgfSBmcm9tIFwiLi9kb20yXCI7XG5pbXBvcnQgeyBtYWtlU2hpcHMgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IGFpUGxheWVyQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gZnVuY3Rpb24gKHBsYXllckNvb3JkaW5hdGVzKSB7XG4gIGNvbnN0IHBsYXllckZsZWV0ID0gbWFrZVNoaXBzKHBsYXllckNvb3JkaW5hdGVzKTtcbiAgY29uc3QgYWlGbGVldCA9IG1ha2VTaGlwcyhhaVBsYXllckNvb3JkaW5hdGVzKCkpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lQm9hcmQocGxheWVyRmxlZXQsIFwicGxheWVyXCIpO1xuICBjb25zdCBhaUdhbWVib2FyZCA9IGdhbWVCb2FyZChhaUZsZWV0LCBcImFpXCIpO1xuICBkaXNwbGF5Qm9hcmQocGxheWVyR2FtZWJvYXJkKTtcbiAgZGlzcGxheUJvYXJkQWkoYWlHYW1lYm9hcmQpO1xuICBoaXRBaUJvYXJkKGFpR2FtZWJvYXJkLCBwbGF5ZXJHYW1lYm9hcmQpO1xufTtcbmNvbnN0IGhpdEFpQm9hcmQgPSBmdW5jdGlvbiAoYWlHYW1lYm9hcmQsIHBsYXllckdhbWVib2FyZCkge1xuICBjb25zdCBhaUJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkQm94QWlcIik7XG4gIGFpQm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm94LmdldEF0dHJpYnV0ZShcImRhdGEtY29vcmlcIikuc3BsaXQoXCJcIik7XG4gICAgICBpZiAoY2hlY2tDb29yKGNvb3JkaW5hdGUsIGFpR2FtZWJvYXJkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhaUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVbMF0sIGNvb3JkaW5hdGVbMV0pO1xuICAgICAgZGlzcGxheUJvYXJkQWkoYWlHYW1lYm9hcmQpO1xuICAgICAgZ2FtZWZpbmlzaGVkKGFpR2FtZWJvYXJkLCBwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgY29uc3QgYWlDb29yZGluYXRlID0gYWlIaXRDb29yZG5hdGVzKHBsYXllckdhbWVib2FyZCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhaUNvb3JkaW5hdGVbMF0sIGFpQ29vcmRpbmF0ZVsxXSk7IC8vLy8vLy8vLy8vbXVzdCBub3QgcmVwZWF0XG4gICAgICBkaXNwbGF5Qm9hcmQocGxheWVyR2FtZWJvYXJkKTtcbiAgICAgIGdhbWVmaW5pc2hlZChhaUdhbWVib2FyZCwgcGxheWVyR2FtZWJvYXJkKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWlIaXRDb29yZG5hdGVzID0gZnVuY3Rpb24gKGFpR2FtZWJvYXJkKSB7XG4gIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGxldCBjb29yID0gW3gsIHldO1xuICBpZiAoYWlHYW1lYm9hcmQuYm9hcmRbeF1beV0gPT0gMiB8fCBhaUdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PSAzKSB7XG4gICAgY29vciA9IGFpSGl0Q29vcmRuYXRlcyhhaUdhbWVib2FyZCk7XG4gIH1cblxuICByZXR1cm4gY29vcjtcbn07XG5jb25zdCBjaGVja0Nvb3IgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgZ2FtZUJvYXJkKSB7XG4gIGNvbnN0IHggPSBjb29yZGluYXRlWzBdO1xuICBjb25zdCB5ID0gY29vcmRpbmF0ZVsxXTtcbiAgaWYgKGdhbWVCb2FyZC5ib2FyZFt4XVt5XSA9PSAyIHx8IGdhbWVCb2FyZC5ib2FyZFt4XVt5XSA9PSAzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5jb25zdCBnYW1lZmluaXNoZWQgPSBmdW5jdGlvbiAoYm9hcmQxLCBib2FyZDIpIHtcbiAgaWYgKGJvYXJkMS5zaGlwc1N1bmsoKSkge1xuICAgIGdhbWVGaW5pc2hlZChib2FyZDEubmFtZSk7XG4gICAgY29uc29sZS5sb2coMTIpO1xuICB9XG4gIGlmIChib2FyZDIuc2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lRmluaXNoZWQoYm9hcmQyLm5hbWUpO1xuICAgIGNvbnNvbGUubG9nKDEyKTtcbiAgfVxufTtcbiIsImV4cG9ydCBjb25zdCBwbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGhpdENvb3JkcyA9IG5ldyBBcnJheSgpO1xuICBjb25zdCBoaXRTaGlwID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICBsZXQgcmVwZWF0ID0gZmFsc2U7XG4gICAgaGl0Q29vcmRzLmZvckVhY2goKGNvb3IsIGkpID0+IHtcbiAgICAgIGlmIChjb29yWzBdID09IHggJiYgY29vclsxXSA9PSB5KSB7XG4gICAgICAgIHJlcGVhdCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHJlcGVhdCkgcmV0dXJuIFwicmVwZWF0XCI7XG4gICAgaGl0Q29vcmRzLnB1c2goW3gsIHldKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBoaXRTaGlwLFxuICB9O1xufTtcbmV4cG9ydCBjb25zdCBhaVBsYXllckNvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBudW1iZXJzID0gW107XG4gIGNvbnN0IGdpdmVObyA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGlmIChjaGVja05vKHJhbmRvbSwgbnVtYmVycykpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJhbmRvbSk7XG4gICAgfVxuICAgIG51bWJlcnMucHVzaChyYW5kb20pO1xuICAgIHJldHVybiByYW5kb207XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tNSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpO1xuICBjb25zdCBzaGlwNSA9IG5ldyBBcnJheSg1KS5maWxsKDApLm1hcCgoeCwgaSkgPT4gWzEsIHJhbmRvbTUgKyBpXSk7XG4gIGNvbnN0IHJhbmRvbTQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KTtcbiAgY29uc3Qgc2hpcDQgPSBuZXcgQXJyYXkoNCkuZmlsbCgwKS5tYXAoKHgsIGkpID0+IFszLCByYW5kb200ICsgaV0pO1xuICBjb25zdCByYW5kb20zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gIGNvbnN0IHNoaXAzID0gbmV3IEFycmF5KDMpLmZpbGwoMCkubWFwKCh4LCBpKSA9PiBbNCwgcmFuZG9tMyArIGldKTtcbiAgY29uc3Qgc2hpcDMzID0gbmV3IEFycmF5KDMpLmZpbGwoMCkubWFwKCh4LCBpKSA9PiBbNiwgcmFuZG9tMyArIGldKTtcbiAgY29uc3QgcmFuZG9tMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICBjb25zdCBzaGlwMiA9IG5ldyBBcnJheSgyKS5maWxsKDApLm1hcCgoeCwgaSkgPT4gWzksIHJhbmRvbTIgKyBpXSk7XG4gIGNvbnNvbGUubG9nKHNoaXAyLCBzaGlwMywgc2hpcDMzLCBzaGlwNCwgc2hpcDUpO1xuICByZXR1cm4gW3NoaXAyLCBzaGlwMywgc2hpcDMzLCBzaGlwNCwgc2hpcDVdO1xufTtcbmNvbnN0IGNoZWNrTm8gPSBmdW5jdGlvbiAoeCwgbnVtYmVycykge1xuICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gIG51bWJlcnMuZm9yRWFjaCgobikgPT4ge1xuICAgIGlmIChuID09IHgpIHtcbiAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGV4aXN0cztcbn07XG4iLCJleHBvcnQgY29uc3QgbmV3U2hpcCA9IGZ1bmN0aW9uIChjb29yZGluYXRlKSB7XG4gIGNvbnN0IGxlbmd0aCA9IGNvb3JkaW5hdGUubGVuZ3RoO1xuICBjb25zdCB0b3RhbEhpdHMgPSBbXTtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRvdGFsSGl0cy5wdXNoKDEpO1xuICB9O1xuICBjb25zdCBzdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0b3RhbEhpdHMubGVuZ3RoID09PSBsZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIHN1bmssXG4gICAgY29vcmRpbmF0ZSxcbiAgICB0b3RhbEhpdHMsXG4gIH07XG59O1xuZXhwb3J0IGNvbnN0IG1ha2VTaGlwcyA9IGZ1bmN0aW9uIChjb29yZGluYXRlcykge1xuICBjb25zdCBmbGVldCA9IFtdO1xuICBjb29yZGluYXRlcy5mb3JFYWNoKChjKSA9PiB7XG4gICAgY29uc3Qgc2hpcCA9IG5ld1NoaXAoYyk7XG4gICAgZmxlZXQucHVzaChzaGlwKTtcbiAgfSk7XG4gIHJldHVybiBmbGVldDtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUJvYXJkLCBzZWxlY3RTaGlwcyB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgZGlzcGxheUJvYXJkLCBzdGFydEdhbWUgfSBmcm9tIFwiLi9kb20yXCI7XG5pbXBvcnQgeyBnYW1lU3RhcnQgfSBmcm9tIFwiLi9nYW1lbG9vcFwiO1xuXG5jb25zdCB1c2VyU2hpcFNlbGN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgY3JlYXRlQm9hcmQoXCJwbGF5ZXJcIik7XG4gIGNvbnN0IHBsYXllclNoaXBzID0gW107XG4gIGNvbnN0IHNoaXBzVG9TZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBzXCIpO1xuICBzaGlwc1RvU2VsZWN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzaGlwU2l6ZSA9IHNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwc1wiKTtcbiAgICAgIHNlbGVjdFNoaXBzKHNoaXBTaXplLCBwbGF5ZXJTaGlwcyk7XG5cbiAgICAgIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXJgKTtcbiAgICAgIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAocGxheWVyU2hpcHMubGVuZ3RoID09IDUpIHtcbiAgICAgICAgICAgIHN0YXJ0R2FtZSgpO1xuICAgICAgICAgICAgZ2FtZVN0YXJ0KHBsYXllclNoaXBzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=