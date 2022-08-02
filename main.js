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
  while (numbers.length !== 5) {
    const random = Math.floor(Math.random() * 10);
    let loopCon = false;
    numbers.forEach((x) => {
      if (x == random) {
        loopCon = true;
        return;
      }
    });
    if (loopCon) continue;
    numbers.push(random);
  }

  const random5 = Math.floor(Math.random() * 6);
  const ship5 = new Array(5).fill(0).map((x, i) => [numbers[0], random5 + i]);
  const random4 = Math.floor(Math.random() * 7);
  const ship4 = new Array(4).fill(0).map((x, i) => [numbers[1], random4 + i]);
  const random3 = Math.floor(Math.random() * 8);
  const ship3 = new Array(3).fill(0).map((x, i) => [numbers[2], random3 + i]);
  const ship33 = new Array(3).fill(0).map((x, i) => [numbers[3], random3 + i]);
  const random2 = Math.floor(Math.random() * 9);
  const ship2 = new Array(2).fill(0).map((x, i) => [numbers[4], random2 + i]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNBO0FBQ1Y7O0FBRXZDO0FBQ0EsRUFBRSxpREFBVztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlEQUFXOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnREFBUztBQUNyQixZQUFZLG9EQUFTO0FBQ3JCO0FBQ0EsU0FBUztBQUNULFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tMi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVtb3ZlU2VsZWN0aW9uLCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyB9IGZyb20gXCIuL2RvbTJcIjtcbmV4cG9ydCBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZE5hbWUpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmROYW1lfWApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZ3JpZEJveFwiKTtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBgJHtpfWAgKyBqO1xuXG4gICAgICBpZiAoYm9hcmROYW1lID09IFwiYWlcIikge1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hBaVwiKTtcbiAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImRhdGEtY29vcmlcIiwgY29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgICBpZiAoYm9hcmROYW1lID09IFwicGxheWVyXCIpIHtcbiAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJncmlkQm94UGxheWVyXCIpO1xuICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIsIGNvb3JkaW5hdGUpO1xuICAgICAgfVxuICAgICAgZ2FtZUJvYXJkLmFwcGVuZChib3gpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgcGxhY2VUYWtlbiA9IGZ1bmN0aW9uIChwbGFjZWRTaGlwcywgY29vcnMpIHtcbiAgbGV0IHRha2VuID0gZmFsc2U7XG4gIHBsYWNlZFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb29ycy5mb3JFYWNoKChjb29yKSA9PiB7XG4gICAgICBzaGlwLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgaWYgKHguam9pbihcIlwiKSA9PSBjb29yLmpvaW4oXCJcIikpIHRha2VuID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRha2VuO1xufTtcbmNvbnN0IGRvbnRQYWludCA9IGZ1bmN0aW9uIChwbGFjZWRTaGlwcywgY29vcikge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgaWYgKHguam9pbihcIlwiID09IGNvb3IpKSB0YWtlbiA9IHRydWU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFrZW47XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hpcHMgPSBmdW5jdGlvbiAoc2hpcHR5cGUsIHBsYWNlZFNoaXBzKSB7XG4gIHNoaXB0eXBlID0gcGFyc2VJbnQoc2hpcHR5cGUpO1xuICBjb25zdCBob3ZlclNoaXBzID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwdHlwZTsgaSsrKSB7XG4gICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgIH1cbiAgICBjb25zdCBjYW5CZXBsYWNlZCA9IHBsYWNlVGFrZW4ocGxhY2VkU2hpcHMsIHNoaXBjb29ycyk7XG5cbiAgICBpZiAocGxhY2VUYWtlbihwbGFjZWRTaGlwcywgc2hpcGNvb3JzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzaGlwY29vcnMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9JyR7c2hpcC5qb2luKFwiXCIpfSddYCk7XG4gICAgICBncmlkQm94LnN0eWxlLmJhY2tncm91bmQgPSBcIiM2NDc0OGJcIjtcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllcmApO1xuICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3ZlclNoaXBzKTtcbiAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRCb3hcIik7XG4gIGNvbnN0IGxlYXZlQm94ID0gZnVuY3Rpb24gKCkge1xuICAgIGJveGVzLmZvckVhY2goKHgpID0+IHtcbiAgICAgIHguc3R5bGUuYmFja2dyb3VuZCA9IFwiIzFkNGVkOFwiO1xuICAgICAgZGlzcGxheVNlbGVjdGVkQXJlYXMocGxhY2VkU2hpcHMpO1xuICAgIH0pO1xuICB9O1xuICBib3hlcy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgbGVhdmVCb3gpO1xuICB9KTtcblxuICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICAgICAgY29uc3Qgc2hpcGNvb3JzID0gW107XG4gICAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICAgIGlmIChzaGlwdHlwZSArIHNoaXBjb29yc1swXVsxXSA+IDEwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgICAgfVxuICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwY29vcnMpO1xuICAgICAgcmVtb3ZlU2VsZWN0aW9uKHNoaXB0eXBlKTtcbiAgICAgIGRpc3BsYXlTZWxlY3RlZEFyZWFzKHBsYWNlZFNoaXBzKTtcbiAgICAgIGJveGVzLmZvckVhY2goKGJveCkgPT4ge1xuICAgICAgICBib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgbGVhdmVCb3gpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5leHBvcnQgY29uc3QgcmVtb3ZlU2VsZWN0aW9uID0gZnVuY3Rpb24gKG4pIHtcbiAgY29uc3QgcmVtb3ZlU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNoaXBzPScke259J11gKTtcbiAgaWYgKHJlbW92ZVNoaXAgPT09IG51bGwpIHJldHVybjtcbiAgcmVtb3ZlU2hpcC5yZW1vdmUoKTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGxheVNlbGVjdGVkQXJlYXMgPSBmdW5jdGlvbiAoYXJlYXMpIHtcbiAgYXJlYXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuZm9yRWFjaCgoY29vcikgPT4ge1xuICAgICAgY29vciA9IGNvb3Iuam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGdyaWRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yPVwiJHtjb29yfVwiXWApO1xuICAgICAgZ3JpZEJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIgIzA0Nzg1N1wiOyAvL2dyZWVuXG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBjb25zdCBzdGFydEdhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYWNlZFNoaXBzU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJTaGlwc1wiKTtcbiAgcGxhY2VkU2hpcHNTZWxlY3Rpb24ucmVtb3ZlKCk7XG4gIGNyZWF0ZUJvYXJkKFwiYWlcIik7XG59O1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlCb2FyZCA9IGZ1bmN0aW9uIChnYW1lQm9hcmQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gW2ksIGpdLmpvaW4oXCJcIik7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yPVwiJHtjb29yZGluYXRlfVwiXWApO1xuICAgICAgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAwKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMxZDRlZDhcIjsgLy8vbWlzc1xuICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbaV1bal0gPT0gMSkge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiIzA0Nzg1N1wiO1xuICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmQuYm9hcmRbaV1bal0gPT0gMikge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiIzcxNzE3YVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcIiNkYzI2MjZcIjsgLy9yZWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkaXNwbGF5Qm9hcmRBaSA9IGZ1bmN0aW9uIChnYW1lQm9hcmQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gW2ksIGpdLmpvaW4oXCJcIik7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yaT1cIiR7Y29vcmRpbmF0ZX1cIl1gKTtcbiAgICAgIGlmIChnYW1lQm9hcmQuYm9hcmRbaV1bal0gPT0gMykge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZGMyNjI2XCI7IC8vcmVkXG4gICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZC5ib2FyZFtpXVtqXSA9PSAyKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjMWQ0ZWQ4XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMWUyOTNiXCI7IC8vL1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbmV4cG9ydCBjb25zdCBnYW1lRmluaXNoZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoXCJiYWNrZ3JvdW5kXCIpO1xuICBjb25zdCBtZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWVzc2FnZURpdi5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZURpdlwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IGAke25hbWV9IGhhcyB3b24hIWA7XG4gIG1lc3NhZ2VEaXYuYXBwZW5kKG1lc3NhZ2UpO1xuICBiYWNrZ3JvdW5kLmFwcGVuZChtZXNzYWdlRGl2KTtcbiAgYm9keS5hcHBlbmQoYmFja2dyb3VuZCk7XG59O1xuIiwiLy8wIG5vdCB0YWtlbiBhbmQgbm90IGhpdFxuLy8xIHRha2VuIGJ5IGEgc2hpcFxuLy8yIGFyZWEgdGhhdCBpcyBoaXRcbi8vMyBoaXQgc2hpcFxuLy9zaGlwcyA1IHR5cGVzIDUgNCAzIDMgMlxuaW1wb3J0IHsgbmV3U2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmV4cG9ydCBjb25zdCBnYW1lQm9hcmQgPSBmdW5jdGlvbiAoZmxlZXQsIG5hbWUpIHtcbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoMCkubWFwKCh4KSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoMCkpO1xuICBjb25zdCBzaGlwcyA9IFsuLi5mbGVldF07XG5cbiAgY29uc3QgcGxhY2VTaGlwcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gWy4uLnNoaXAuY29vcmRpbmF0ZV07XG4gICAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBjb25zdCB4ID0gY1swXTtcbiAgICAgICAgY29uc3QgeSA9IGNbMV07XG4gICAgICAgIGJvYXJkW3hdW3ldID0gMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIGlmIChib2FyZFt4XVt5XSA9PSAyIHx8IGJvYXJkW3hdW3ldID09IDMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWlcIik7XG4gICAgICByZXR1cm4gXCJFcnJvcjphcmVhIGhpdCBiZWZvcmVcIjtcbiAgICB9XG4gICAgaWYgKGJvYXJkW3hdW3ldID09IDApIGJvYXJkW3hdW3ldID0gMjtcbiAgICBlbHNlIGlmIChib2FyZFt4XVt5XSA9PSAxKSB7XG4gICAgICBib2FyZFt4XVt5XSA9IDM7XG4gICAgICBjb25zdCBzaGlwSW5kZXggPSBmaW5kU2hpcChmbGVldCwgeCwgeSk7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzaGlwc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmsoKSA9PSB0cnVlKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgc2hpcHNTdW5rLFxuICAgIGJvYXJkLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmRTaGlwID0gZnVuY3Rpb24gKGZsZWV0LCB4LCB5KSB7XG4gIGxldCBzaGlwSWQ7XG4gIGZsZWV0LmZvckVhY2goKHNoaXAsIGkpID0+IHtcbiAgICBzaGlwLmNvb3JkaW5hdGUuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgaWYgKGNbMF0gPT0geCAmJiBjWzFdID09IHkpIHtcbiAgICAgICAgc2hpcElkID0gaTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBzaGlwSWQ7XG59O1xuIiwiaW1wb3J0IHsgZGlzcGxheUJvYXJkLCBkaXNwbGF5Qm9hcmRBaSwgZ2FtZUZpbmlzaGVkIH0gZnJvbSBcIi4vZG9tMlwiO1xuaW1wb3J0IHsgbWFrZVNoaXBzIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBhaVBsYXllckNvb3JkaW5hdGVzIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuZXhwb3J0IGNvbnN0IGdhbWVTdGFydCA9IGZ1bmN0aW9uIChwbGF5ZXJDb29yZGluYXRlcykge1xuICBjb25zdCBwbGF5ZXJGbGVldCA9IG1ha2VTaGlwcyhwbGF5ZXJDb29yZGluYXRlcyk7XG4gIGNvbnN0IGFpRmxlZXQgPSBtYWtlU2hpcHMoYWlQbGF5ZXJDb29yZGluYXRlcygpKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZUJvYXJkKHBsYXllckZsZWV0LCBcInBsYXllclwiKTtcbiAgY29uc3QgYWlHYW1lYm9hcmQgPSBnYW1lQm9hcmQoYWlGbGVldCwgXCJhaVwiKTtcbiAgZGlzcGxheUJvYXJkKHBsYXllckdhbWVib2FyZCk7XG4gIGRpc3BsYXlCb2FyZEFpKGFpR2FtZWJvYXJkKTtcbiAgaGl0QWlCb2FyZChhaUdhbWVib2FyZCwgcGxheWVyR2FtZWJvYXJkKTtcbn07XG5jb25zdCBoaXRBaUJvYXJkID0gZnVuY3Rpb24gKGFpR2FtZWJvYXJkLCBwbGF5ZXJHYW1lYm9hcmQpIHtcbiAgY29uc3QgYWlCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEJveEFpXCIpO1xuICBhaUJveGVzLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGJveC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JpXCIpLnNwbGl0KFwiXCIpO1xuICAgICAgaWYgKGNoZWNrQ29vcihjb29yZGluYXRlLCBhaUdhbWVib2FyZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYWlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlWzBdLCBjb29yZGluYXRlWzFdKTtcbiAgICAgIGRpc3BsYXlCb2FyZEFpKGFpR2FtZWJvYXJkKTtcbiAgICAgIGdhbWVmaW5pc2hlZChhaUdhbWVib2FyZCwgcGxheWVyR2FtZWJvYXJkKTtcbiAgICAgIGNvbnN0IGFpQ29vcmRpbmF0ZSA9IGFpSGl0Q29vcmRuYXRlcyhwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYWlDb29yZGluYXRlWzBdLCBhaUNvb3JkaW5hdGVbMV0pOyAvLy8vLy8vLy8vL211c3Qgbm90IHJlcGVhdFxuICAgICAgZGlzcGxheUJvYXJkKHBsYXllckdhbWVib2FyZCk7XG4gICAgICBnYW1lZmluaXNoZWQoYWlHYW1lYm9hcmQsIHBsYXllckdhbWVib2FyZCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFpSGl0Q29vcmRuYXRlcyA9IGZ1bmN0aW9uIChhaUdhbWVib2FyZCkge1xuICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICBsZXQgY29vciA9IFt4LCB5XTtcbiAgaWYgKGFpR2FtZWJvYXJkLmJvYXJkW3hdW3ldID09IDIgfHwgYWlHYW1lYm9hcmQuYm9hcmRbeF1beV0gPT0gMykge1xuICAgIGNvb3IgPSBhaUhpdENvb3JkbmF0ZXMoYWlHYW1lYm9hcmQpO1xuICB9XG5cbiAgcmV0dXJuIGNvb3I7XG59O1xuY29uc3QgY2hlY2tDb29yID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUsIGdhbWVCb2FyZCkge1xuICBjb25zdCB4ID0gY29vcmRpbmF0ZVswXTtcbiAgY29uc3QgeSA9IGNvb3JkaW5hdGVbMV07XG4gIGlmIChnYW1lQm9hcmQuYm9hcmRbeF1beV0gPT0gMiB8fCBnYW1lQm9hcmQuYm9hcmRbeF1beV0gPT0gMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuY29uc3QgZ2FtZWZpbmlzaGVkID0gZnVuY3Rpb24gKGJvYXJkMSwgYm9hcmQyKSB7XG4gIGlmIChib2FyZDEuc2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lRmluaXNoZWQoYm9hcmQyLm5hbWUpO1xuICB9XG4gIGlmIChib2FyZDIuc2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lRmluaXNoZWQoYm9hcmQxLm5hbWUpO1xuICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHBsYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaGl0Q29vcmRzID0gbmV3IEFycmF5KCk7XG4gIGNvbnN0IGhpdFNoaXAgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIGxldCByZXBlYXQgPSBmYWxzZTtcbiAgICBoaXRDb29yZHMuZm9yRWFjaCgoY29vciwgaSkgPT4ge1xuICAgICAgaWYgKGNvb3JbMF0gPT0geCAmJiBjb29yWzFdID09IHkpIHtcbiAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocmVwZWF0KSByZXR1cm4gXCJyZXBlYXRcIjtcbiAgICBoaXRDb29yZHMucHVzaChbeCwgeV0pO1xuICB9O1xuICByZXR1cm4ge1xuICAgIGhpdFNoaXAsXG4gIH07XG59O1xuZXhwb3J0IGNvbnN0IGFpUGxheWVyQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG51bWJlcnMgPSBbXTtcbiAgd2hpbGUgKG51bWJlcnMubGVuZ3RoICE9PSA1KSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBsb29wQ29uID0gZmFsc2U7XG4gICAgbnVtYmVycy5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeCA9PSByYW5kb20pIHtcbiAgICAgICAgbG9vcENvbiA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAobG9vcENvbikgY29udGludWU7XG4gICAgbnVtYmVycy5wdXNoKHJhbmRvbSk7XG4gIH1cblxuICBjb25zdCByYW5kb201ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNik7XG4gIGNvbnN0IHNoaXA1ID0gbmV3IEFycmF5KDUpLmZpbGwoMCkubWFwKCh4LCBpKSA9PiBbbnVtYmVyc1swXSwgcmFuZG9tNSArIGldKTtcbiAgY29uc3QgcmFuZG9tNCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpO1xuICBjb25zdCBzaGlwNCA9IG5ldyBBcnJheSg0KS5maWxsKDApLm1hcCgoeCwgaSkgPT4gW251bWJlcnNbMV0sIHJhbmRvbTQgKyBpXSk7XG4gIGNvbnN0IHJhbmRvbTMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgY29uc3Qgc2hpcDMgPSBuZXcgQXJyYXkoMykuZmlsbCgwKS5tYXAoKHgsIGkpID0+IFtudW1iZXJzWzJdLCByYW5kb20zICsgaV0pO1xuICBjb25zdCBzaGlwMzMgPSBuZXcgQXJyYXkoMykuZmlsbCgwKS5tYXAoKHgsIGkpID0+IFtudW1iZXJzWzNdLCByYW5kb20zICsgaV0pO1xuICBjb25zdCByYW5kb20yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG4gIGNvbnN0IHNoaXAyID0gbmV3IEFycmF5KDIpLmZpbGwoMCkubWFwKCh4LCBpKSA9PiBbbnVtYmVyc1s0XSwgcmFuZG9tMiArIGldKTtcbiAgY29uc29sZS5sb2coc2hpcDIsIHNoaXAzLCBzaGlwMzMsIHNoaXA0LCBzaGlwNSk7XG4gIHJldHVybiBbc2hpcDIsIHNoaXAzLCBzaGlwMzMsIHNoaXA0LCBzaGlwNV07XG59O1xuY29uc3QgY2hlY2tObyA9IGZ1bmN0aW9uICh4LCBudW1iZXJzKSB7XG4gIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgbnVtYmVycy5mb3JFYWNoKChuKSA9PiB7XG4gICAgaWYgKG4gPT0geCkge1xuICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZXhpc3RzO1xufTtcbiIsImV4cG9ydCBjb25zdCBuZXdTaGlwID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUpIHtcbiAgY29uc3QgbGVuZ3RoID0gY29vcmRpbmF0ZS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsSGl0cyA9IFtdO1xuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdG90YWxIaXRzLnB1c2goMSk7XG4gIH07XG4gIGNvbnN0IHN1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRvdGFsSGl0cy5sZW5ndGggPT09IGxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgc3VuayxcbiAgICBjb29yZGluYXRlLFxuICAgIHRvdGFsSGl0cyxcbiAgfTtcbn07XG5leHBvcnQgY29uc3QgbWFrZVNoaXBzID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzKSB7XG4gIGNvbnN0IGZsZWV0ID0gW107XG4gIGNvb3JkaW5hdGVzLmZvckVhY2goKGMpID0+IHtcbiAgICBjb25zdCBzaGlwID0gbmV3U2hpcChjKTtcbiAgICBmbGVldC5wdXNoKHNoaXApO1xuICB9KTtcbiAgcmV0dXJuIGZsZWV0O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHNlbGVjdFNoaXBzIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2RvbTJcIjtcbmltcG9ydCB7IGdhbWVTdGFydCB9IGZyb20gXCIuL2dhbWVsb29wXCI7XG5cbmNvbnN0IHVzZXJTaGlwU2VsY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICBjcmVhdGVCb2FyZChcInBsYXllclwiKTtcbiAgY29uc3QgcGxheWVyU2hpcHMgPSBbXTtcbiAgY29uc3Qgc2hpcHNUb1NlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcHNcIik7XG4gIHNoaXBzVG9TZWxlY3QuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHNoaXBTaXplID0gc2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBzXCIpO1xuICAgICAgc2VsZWN0U2hpcHMoc2hpcFNpemUsIHBsYXllclNoaXBzKTtcblxuICAgICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllcmApO1xuICAgICAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChwbGF5ZXJTaGlwcy5sZW5ndGggPT0gNSkge1xuICAgICAgICAgICAgc3RhcnRHYW1lKCk7XG4gICAgICAgICAgICBnYW1lU3RhcnQocGxheWVyU2hpcHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==