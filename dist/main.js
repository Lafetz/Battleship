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
      gridBox.style.background = "#64748b";
    });
  };
  const gameBoard = document.querySelector(`#player`);
  gameBoard.addEventListener("mouseover", hoverShips);
  const boxes = document.querySelectorAll(".gridBox");
  const leaveBox = function () {
    boxes.forEach((x) => {
      x.style.background = "#1d4ed8";
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
      gridBox.style.background = " #047857"; //green
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
        box.style.backgroundColor = "#1d4ed8"; ///miss
      } else if (gameBoard.board[i][j] == 1) {
        box.style.background = "#047857";
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "#71717a";
      } else {
        box.style.background = "#dc2626"; //red
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
        box.style.backgroundColor = "#dc2626"; //red
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "#1d4ed8";
      } else {
        box.style.backgroundColor = "#1e293b"; ///
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
    (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.gameFinished)(board2.name);
  }
  if (board2.shipsSunk()) {
    (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.gameFinished)(board1.name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7O0FDTmlEO0FBQ0E7QUFDVjs7QUFFdkM7QUFDQSxFQUFFLGlEQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saURBQVc7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdEQUFTO0FBQ3JCLFlBQVksb0RBQVM7QUFDckI7QUFDQSxTQUFTO0FBQ1QsVUFBVTtBQUNWO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW1vdmVTZWxlY3Rpb24sIGRpc3BsYXlTZWxlY3RlZEFyZWFzIH0gZnJvbSBcIi4vZG9tMlwiO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24gKGJvYXJkTmFtZSkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZE5hbWV9YCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJncmlkQm94XCIpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGAke2l9YCArIGo7XG5cbiAgICAgIGlmIChib2FyZE5hbWUgPT0gXCJhaVwiKSB7XG4gICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZ3JpZEJveEFpXCIpO1xuICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yaVwiLCBjb29yZGluYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChib2FyZE5hbWUgPT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hQbGF5ZXJcIik7XG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIiwgY29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kKGJveCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBwbGFjZVRha2VuID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29ycykge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvb3JzLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICBpZiAoeC5qb2luKFwiXCIpID09IGNvb3Iuam9pbihcIlwiKSkgdGFrZW4gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFrZW47XG59O1xuY29uc3QgZG9udFBhaW50ID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29yKSB7XG4gIGxldCB0YWtlbiA9IGZhbHNlO1xuICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC5qb2luKFwiXCIgPT0gY29vcikpIHRha2VuID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YWtlbjtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaGlwcyA9IGZ1bmN0aW9uIChzaGlwdHlwZSwgcGxhY2VkU2hpcHMpIHtcbiAgc2hpcHR5cGUgPSBwYXJzZUludChzaGlwdHlwZSk7XG4gIGNvbnN0IGhvdmVyU2hpcHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IHNoaXBjb29ycyA9IFtdO1xuICAgIGNvbnN0IHNoaXBjb29yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpO1xuICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICBpZiAoc2hpcHR5cGUgKyBzaGlwY29vcnNbMF1bMV0gPiAxMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXB0eXBlOyBpKyspIHtcbiAgICAgIHNoaXBjb29ycy5wdXNoKFtwYXJzZUludChzaGlwY29vclswXSksIHBhcnNlSW50KHNoaXBjb29yc1swXVsxXSkgKyBpXSk7XG4gICAgfVxuICAgIGNvbnN0IGNhbkJlcGxhY2VkID0gcGxhY2VUYWtlbihwbGFjZWRTaGlwcywgc2hpcGNvb3JzKTtcblxuICAgIGlmIChwbGFjZVRha2VuKHBsYWNlZFNoaXBzLCBzaGlwY29vcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNoaXBjb29ycy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj0nJHtzaGlwLmpvaW4oXCJcIil9J11gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiIzY0NzQ4YlwiO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEJveFwiKTtcbiAgY29uc3QgbGVhdmVCb3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgYm94ZXMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgeC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjMWQ0ZWQ4XCI7XG4gICAgICBkaXNwbGF5U2VsZWN0ZWRBcmVhcyhwbGFjZWRTaGlwcyk7XG4gICAgfSk7XG4gIH07XG4gIGJveGVzLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBsZWF2ZUJveCk7XG4gIH0pO1xuXG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgZ2FtZUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXJTaGlwcyk7XG4gICAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICAgIGNvbnN0IHNoaXBjb29yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpO1xuICAgICAgc2hpcGNvb3JzLnB1c2goc2hpcGNvb3Iuc3BsaXQoXCJcIikubWFwKCh4KSA9PiBwYXJzZUludCh4KSkpO1xuICAgICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwdHlwZTsgaSsrKSB7XG4gICAgICAgIHNoaXBjb29ycy5wdXNoKFtwYXJzZUludChzaGlwY29vclswXSksIHBhcnNlSW50KHNoaXBjb29yc1swXVsxXSkgKyBpXSk7XG4gICAgICB9XG4gICAgICBwbGFjZWRTaGlwcy5wdXNoKHNoaXBjb29ycyk7XG4gICAgICByZW1vdmVTZWxlY3Rpb24oc2hpcHR5cGUpO1xuICAgICAgZGlzcGxheVNlbGVjdGVkQXJlYXMocGxhY2VkU2hpcHMpO1xuICAgICAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICAgIGJveC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBsZWF2ZUJveCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQgfSBmcm9tIFwiLi9kb21cIjtcbmV4cG9ydCBjb25zdCByZW1vdmVTZWxlY3Rpb24gPSBmdW5jdGlvbiAobikge1xuICBjb25zdCByZW1vdmVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcHM9JyR7bn0nXWApO1xuICBpZiAocmVtb3ZlU2hpcCA9PT0gbnVsbCkgcmV0dXJuO1xuICByZW1vdmVTaGlwLnJlbW92ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyA9IGZ1bmN0aW9uIChhcmVhcykge1xuICBhcmVhcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKChjb29yKSA9PiB7XG4gICAgICBjb29yID0gY29vci5qb2luKFwiXCIpO1xuICAgICAgY29uc3QgZ3JpZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9XCIke2Nvb3J9XCJdYCk7XG4gICAgICBncmlkQm94LnN0eWxlLmJhY2tncm91bmQgPSBcIiAjMDQ3ODU3XCI7IC8vZ3JlZW5cbiAgICB9KTtcbiAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHN0YXJ0R2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxhY2VkU2hpcHNTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllclNoaXBzXCIpO1xuICBwbGFjZWRTaGlwc1NlbGVjdGlvbi5yZW1vdmUoKTtcbiAgY3JlYXRlQm9hcmQoXCJhaVwiKTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGxheUJvYXJkID0gZnVuY3Rpb24gKGdhbWVCb2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbaSwgal0uam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9XCIke2Nvb3JkaW5hdGV9XCJdYCk7XG4gICAgICBpZiAoZ2FtZUJvYXJkLmJvYXJkW2ldW2pdID09IDApIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFkNGVkOFwiOyAvLy9taXNzXG4gICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAxKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjMDQ3ODU3XCI7XG4gICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAyKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjNzE3MTdhXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiI2RjMjYyNlwiOyAvL3JlZFxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRpc3BsYXlCb2FyZEFpID0gZnVuY3Rpb24gKGdhbWVCb2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbaSwgal0uam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JpPVwiJHtjb29yZGluYXRlfVwiXWApO1xuICAgICAgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAzKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNkYzI2MjZcIjsgLy9yZWRcbiAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkLmJvYXJkW2ldW2pdID09IDIpIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcIiMxZDRlZDhcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMxZTI5M2JcIjsgLy8vXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuZXhwb3J0IGNvbnN0IGdhbWVGaW5pc2hlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZChcImJhY2tncm91bmRcIik7XG4gIGNvbnN0IG1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlRGl2LmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlRGl2XCIpO1xuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBtZXNzYWdlLnRleHRDb250ZW50ID0gYCR7bmFtZX0gaGFzIHdvbiEhYDtcbiAgbWVzc2FnZURpdi5hcHBlbmQobWVzc2FnZSk7XG4gIGJhY2tncm91bmQuYXBwZW5kKG1lc3NhZ2VEaXYpO1xuICBib2R5LmFwcGVuZChiYWNrZ3JvdW5kKTtcbn07XG4iLCIvLzAgbm90IHRha2VuIGFuZCBub3QgaGl0XG4vLzEgdGFrZW4gYnkgYSBzaGlwXG4vLzIgYXJlYSB0aGF0IGlzIGhpdFxuLy8zIGhpdCBzaGlwXG4vL3NoaXBzIDUgdHlwZXMgNSA0IDMgMyAyXG5pbXBvcnQgeyBuZXdTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuZXhwb3J0IGNvbnN0IGdhbWVCb2FyZCA9IGZ1bmN0aW9uIChmbGVldCwgbmFtZSkge1xuICBjb25zdCBib2FyZCA9IG5ldyBBcnJheSgxMCkuZmlsbCgwKS5tYXAoKHgpID0+IG5ldyBBcnJheSgxMCkuZmlsbCgwKSk7XG4gIGNvbnN0IHNoaXBzID0gWy4uLmZsZWV0XTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbLi4uc2hpcC5jb29yZGluYXRlXTtcbiAgICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBjWzBdO1xuICAgICAgICBjb25zdCB5ID0gY1sxXTtcbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgaWYgKGJvYXJkW3hdW3ldID09IDIgfHwgYm9hcmRbeF1beV0gPT0gMykge1xuICAgICAgY29uc29sZS5sb2coXCJhaVwiKTtcbiAgICAgIHJldHVybiBcIkVycm9yOmFyZWEgaGl0IGJlZm9yZVwiO1xuICAgIH1cbiAgICBpZiAoYm9hcmRbeF1beV0gPT0gMCkgYm9hcmRbeF1beV0gPSAyO1xuICAgIGVsc2UgaWYgKGJvYXJkW3hdW3ldID09IDEpIHtcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcbiAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwKGZsZWV0LCB4LCB5KTtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNoaXBzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuaygpID09IHRydWUpO1xuICB9O1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBzaGlwc1N1bmssXG4gICAgYm9hcmQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFNoaXAgPSBmdW5jdGlvbiAoZmxlZXQsIHgsIHkpIHtcbiAgbGV0IHNoaXBJZDtcbiAgZmxlZXQuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICAgIHNoaXAuY29vcmRpbmF0ZS5mb3JFYWNoKChjKSA9PiB7XG4gICAgICBpZiAoY1swXSA9PSB4ICYmIGNbMV0gPT0geSkge1xuICAgICAgICBzaGlwSWQgPSBpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHNoaXBJZDtcbn07XG4iLCJpbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlCb2FyZEFpLCBnYW1lRmluaXNoZWQgfSBmcm9tIFwiLi9kb20yXCI7XG5pbXBvcnQgeyBtYWtlU2hpcHMgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IGFpUGxheWVyQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gZnVuY3Rpb24gKHBsYXllckNvb3JkaW5hdGVzKSB7XG4gIGNvbnN0IHBsYXllckZsZWV0ID0gbWFrZVNoaXBzKHBsYXllckNvb3JkaW5hdGVzKTtcbiAgY29uc3QgYWlGbGVldCA9IG1ha2VTaGlwcyhhaVBsYXllckNvb3JkaW5hdGVzKCkpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lQm9hcmQocGxheWVyRmxlZXQsIFwicGxheWVyXCIpO1xuICBjb25zdCBhaUdhbWVib2FyZCA9IGdhbWVCb2FyZChhaUZsZWV0LCBcImFpXCIpO1xuICBkaXNwbGF5Qm9hcmQocGxheWVyR2FtZWJvYXJkKTtcbiAgZGlzcGxheUJvYXJkQWkoYWlHYW1lYm9hcmQpO1xuICBoaXRBaUJvYXJkKGFpR2FtZWJvYXJkLCBwbGF5ZXJHYW1lYm9hcmQpO1xufTtcbmNvbnN0IGhpdEFpQm9hcmQgPSBmdW5jdGlvbiAoYWlHYW1lYm9hcmQsIHBsYXllckdhbWVib2FyZCkge1xuICBjb25zdCBhaUJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkQm94QWlcIik7XG4gIGFpQm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm94LmdldEF0dHJpYnV0ZShcImRhdGEtY29vcmlcIikuc3BsaXQoXCJcIik7XG4gICAgICBpZiAoY2hlY2tDb29yKGNvb3JkaW5hdGUsIGFpR2FtZWJvYXJkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhaUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVbMF0sIGNvb3JkaW5hdGVbMV0pO1xuICAgICAgZGlzcGxheUJvYXJkQWkoYWlHYW1lYm9hcmQpO1xuICAgICAgZ2FtZWZpbmlzaGVkKGFpR2FtZWJvYXJkLCBwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgY29uc3QgYWlDb29yZGluYXRlID0gYWlIaXRDb29yZG5hdGVzKHBsYXllckdhbWVib2FyZCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhaUNvb3JkaW5hdGVbMF0sIGFpQ29vcmRpbmF0ZVsxXSk7IC8vLy8vLy8vLy8vbXVzdCBub3QgcmVwZWF0XG4gICAgICBkaXNwbGF5Qm9hcmQocGxheWVyR2FtZWJvYXJkKTtcbiAgICAgIGdhbWVmaW5pc2hlZChhaUdhbWVib2FyZCwgcGxheWVyR2FtZWJvYXJkKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWlIaXRDb29yZG5hdGVzID0gZnVuY3Rpb24gKGFpR2FtZWJvYXJkKSB7XG4gIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIGxldCBjb29yID0gW3gsIHldO1xuICBpZiAoYWlHYW1lYm9hcmQuYm9hcmRbeF1beV0gPT0gMiB8fCBhaUdhbWVib2FyZC5ib2FyZFt4XVt5XSA9PSAzKSB7XG4gICAgY29vciA9IGFpSGl0Q29vcmRuYXRlcyhhaUdhbWVib2FyZCk7XG4gIH1cblxuICByZXR1cm4gY29vcjtcbn07XG5jb25zdCBjaGVja0Nvb3IgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgZ2FtZUJvYXJkKSB7XG4gIGNvbnN0IHggPSBjb29yZGluYXRlWzBdO1xuICBjb25zdCB5ID0gY29vcmRpbmF0ZVsxXTtcbiAgaWYgKGdhbWVCb2FyZC5ib2FyZFt4XVt5XSA9PSAyIHx8IGdhbWVCb2FyZC5ib2FyZFt4XVt5XSA9PSAzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5jb25zdCBnYW1lZmluaXNoZWQgPSBmdW5jdGlvbiAoYm9hcmQxLCBib2FyZDIpIHtcbiAgaWYgKGJvYXJkMS5zaGlwc1N1bmsoKSkge1xuICAgIGdhbWVGaW5pc2hlZChib2FyZDIubmFtZSk7XG4gIH1cbiAgaWYgKGJvYXJkMi5zaGlwc1N1bmsoKSkge1xuICAgIGdhbWVGaW5pc2hlZChib2FyZDEubmFtZSk7XG4gIH1cbn07XG4iLCJleHBvcnQgY29uc3QgcGxheWVyID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBoaXRDb29yZHMgPSBuZXcgQXJyYXkoKTtcbiAgY29uc3QgaGl0U2hpcCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgbGV0IHJlcGVhdCA9IGZhbHNlO1xuICAgIGhpdENvb3Jkcy5mb3JFYWNoKChjb29yLCBpKSA9PiB7XG4gICAgICBpZiAoY29vclswXSA9PSB4ICYmIGNvb3JbMV0gPT0geSkge1xuICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChyZXBlYXQpIHJldHVybiBcInJlcGVhdFwiO1xuICAgIGhpdENvb3Jkcy5wdXNoKFt4LCB5XSk7XG4gIH07XG4gIHJldHVybiB7XG4gICAgaGl0U2hpcCxcbiAgfTtcbn07XG5leHBvcnQgY29uc3QgYWlQbGF5ZXJDb29yZGluYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbnVtYmVycyA9IFtdO1xuICBjb25zdCBnaXZlTm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBpZiAoY2hlY2tObyhyYW5kb20sIG51bWJlcnMpKSB7XG4gICAgICBjb25zb2xlLmxvZyhyYW5kb20pO1xuICAgIH1cbiAgICBudW1iZXJzLnB1c2gocmFuZG9tKTtcbiAgICByZXR1cm4gcmFuZG9tO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbTUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KTtcbiAgY29uc3Qgc2hpcDUgPSBuZXcgQXJyYXkoNSkuZmlsbCgwKS5tYXAoKHgsIGkpID0+IFsxLCByYW5kb201ICsgaV0pO1xuICBjb25zdCByYW5kb200ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyk7XG4gIGNvbnN0IHNoaXA0ID0gbmV3IEFycmF5KDQpLmZpbGwoMCkubWFwKCh4LCBpKSA9PiBbMywgcmFuZG9tNCArIGldKTtcbiAgY29uc3QgcmFuZG9tMyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICBjb25zdCBzaGlwMyA9IG5ldyBBcnJheSgzKS5maWxsKDApLm1hcCgoeCwgaSkgPT4gWzQsIHJhbmRvbTMgKyBpXSk7XG4gIGNvbnN0IHNoaXAzMyA9IG5ldyBBcnJheSgzKS5maWxsKDApLm1hcCgoeCwgaSkgPT4gWzYsIHJhbmRvbTMgKyBpXSk7XG4gIGNvbnN0IHJhbmRvbTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgY29uc3Qgc2hpcDIgPSBuZXcgQXJyYXkoMikuZmlsbCgwKS5tYXAoKHgsIGkpID0+IFs5LCByYW5kb20yICsgaV0pO1xuICBjb25zb2xlLmxvZyhzaGlwMiwgc2hpcDMsIHNoaXAzMywgc2hpcDQsIHNoaXA1KTtcbiAgcmV0dXJuIFtzaGlwMiwgc2hpcDMsIHNoaXAzMywgc2hpcDQsIHNoaXA1XTtcbn07XG5jb25zdCBjaGVja05vID0gZnVuY3Rpb24gKHgsIG51bWJlcnMpIHtcbiAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICBudW1iZXJzLmZvckVhY2goKG4pID0+IHtcbiAgICBpZiAobiA9PSB4KSB7XG4gICAgICBleGlzdHMgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBleGlzdHM7XG59O1xuIiwiZXhwb3J0IGNvbnN0IG5ld1NoaXAgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSkge1xuICBjb25zdCBsZW5ndGggPSBjb29yZGluYXRlLmxlbmd0aDtcbiAgY29uc3QgdG90YWxIaXRzID0gW107XG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0b3RhbEhpdHMucHVzaCgxKTtcbiAgfTtcbiAgY29uc3Qgc3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodG90YWxIaXRzLmxlbmd0aCA9PT0gbGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBzdW5rLFxuICAgIGNvb3JkaW5hdGUsXG4gICAgdG90YWxIaXRzLFxuICB9O1xufTtcbmV4cG9ydCBjb25zdCBtYWtlU2hpcHMgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMpIHtcbiAgY29uc3QgZmxlZXQgPSBbXTtcbiAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoYykgPT4ge1xuICAgIGNvbnN0IHNoaXAgPSBuZXdTaGlwKGMpO1xuICAgIGZsZWV0LnB1c2goc2hpcCk7XG4gIH0pO1xuICByZXR1cm4gZmxlZXQ7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCwgc2VsZWN0U2hpcHMgfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IGRpc3BsYXlCb2FyZCwgc3RhcnRHYW1lIH0gZnJvbSBcIi4vZG9tMlwiO1xuaW1wb3J0IHsgZ2FtZVN0YXJ0IH0gZnJvbSBcIi4vZ2FtZWxvb3BcIjtcblxuY29uc3QgdXNlclNoaXBTZWxjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gIGNyZWF0ZUJvYXJkKFwicGxheWVyXCIpO1xuICBjb25zdCBwbGF5ZXJTaGlwcyA9IFtdO1xuICBjb25zdCBzaGlwc1RvU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwc1wiKTtcbiAgc2hpcHNUb1NlbGVjdC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcFNpemUgPSBzaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtc2hpcHNcIik7XG4gICAgICBzZWxlY3RTaGlwcyhzaGlwU2l6ZSwgcGxheWVyU2hpcHMpO1xuXG4gICAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gICAgICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHBsYXllclNoaXBzLmxlbmd0aCA9PSA1KSB7XG4gICAgICAgICAgICBzdGFydEdhbWUoKTtcbiAgICAgICAgICAgIGdhbWVTdGFydChwbGF5ZXJTaGlwcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9