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
        (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
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

      gameBoard.removeEventListener("mouseover", hoverShips);
      placedShips.push(shipcoors);
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.removeSelection)(shiptype);
      (0,_dom2__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
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
/* harmony export */   "displaySelectedAreas": () => (/* binding */ displaySelectedAreas),
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
const displayBoard = function (gameBoard, player) {
  const gridBoxes = document.querySelector(`#${player}`);
  gameBoard.forEach((row, i) => {
    row.forEach((x, j) => {
      const coordinate = [x, j].join("");
      const box = document.querySelector(`data-coor="${coordinate}"`);
      if (gameBoard[x][y] == 0) {
        box.style.background = "antiquewhite";
      } else if (gameBoard[x][y] == 1) {
        box.style.background = "green";
      } else if (gameBoard[x][y] == 2) {
        box.style.background = "blue";
      } else {
        box.style.background = "red";
      }
    });
  });
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


const userShipSelction = (function () {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBoard)("player");
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          console.log(playerShips.length);
          if (playerShips.length == 4) {
            (0,_dom2__WEBPACK_IMPORTED_MODULE_1__.startGame)();
          }
        },
        { once: true }
      );
      const shipSize = ship.getAttribute("data-ships");
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__.selectShips)(shipSize, playerShips);
    });
  });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStEO0FBQ3hEO0FBQ1AsK0NBQStDLFVBQVU7QUFDekQsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRCQUE0QixFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkRBQW9CO0FBQzVCLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sc0RBQWU7QUFDckIsTUFBTSwyREFBb0I7QUFDMUIsS0FBSztBQUNMLE1BQU07QUFDTjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZvQztBQUM3QjtBQUNQLDREQUE0RCxFQUFFO0FBQzlEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNERBQTRELEtBQUs7QUFDakU7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ087QUFDUDtBQUNBO0FBQ0EsRUFBRSxpREFBVztBQUNiO0FBQ087QUFDUCwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsV0FBVztBQUNsRTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7O1VDckNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlEO0FBQ0E7QUFDakQ7QUFDQSxFQUFFLGlEQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdEQUFTO0FBQ3JCO0FBQ0EsU0FBUztBQUNULFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTSxpREFBVztBQUNqQixLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbTIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVtb3ZlU2VsZWN0aW9uLCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyB9IGZyb20gXCIuL2RvbTJcIjtcbmV4cG9ydCBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZE5hbWUpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmROYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hcIik7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYCR7aX1gICsgajtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIiwgY29vcmRpbmF0ZSk7XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kKGJveCk7XG4gICAgfVxuICB9XG59O1xuLy80NSAvLzQ2IC8vNDcgLy80OFtbeF0sW3ldXVxuXG5jb25zdCBwbGFjZVRha2VuID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29ycykge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvb3JzLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICBpZiAoeC5qb2luKFwiXCIpID09IGNvb3Iuam9pbihcIlwiKSkgdGFrZW4gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFrZW47XG59O1xuY29uc3QgZG9udFBhaW50ID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29yKSB7XG4gIGxldCB0YWtlbiA9IGZhbHNlO1xuICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC5qb2luKFwiXCIgPT0gY29vcikpIHRha2VuID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YWtlbjtcbn07XG4vLyBzaGlwLmZvckVhY2goKHgpID0+IHtcbi8vICAgaWYgKHhbMF0gKyB4WzFdID09ICkge1xuLy8gICB9XG5cbi8vXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hpcHMgPSBmdW5jdGlvbiAoc2hpcHR5cGUsIHBsYWNlZFNoaXBzKSB7XG4gIHNoaXB0eXBlID0gcGFyc2VJbnQoc2hpcHR5cGUpO1xuICBjb25zdCBob3ZlclNoaXBzID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwdHlwZTsgaSsrKSB7XG4gICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgIH1cbiAgICBjb25zdCBjYW5CZXBsYWNlZCA9IHBsYWNlVGFrZW4ocGxhY2VkU2hpcHMsIHNoaXBjb29ycyk7XG4gICAgY29uc29sZS5sb2coY2FuQmVwbGFjZWQpO1xuICAgIGlmIChwbGFjZVRha2VuKHBsYWNlZFNoaXBzLCBzaGlwY29vcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNoaXBjb29ycy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj0nJHtzaGlwLmpvaW4oXCJcIil9J11gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JleVwiO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEJveFwiKTtcbiAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICAgIGJveGVzLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgLy8gY29uc3QgdGFrZW4gPSBkb250UGFpbnQocGxhY2VkU2hpcHMsIHguZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFrZW4pO1xuICAgICAgICB4LnN0eWxlLmJhY2tncm91bmQgPSBcImFudGlxdWV3aGl0ZVwiO1xuICAgICAgICBkaXNwbGF5U2VsZWN0ZWRBcmVhcyhwbGFjZWRTaGlwcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgY29uc3Qgc2hpcGNvb3JzID0gW107XG4gICAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICAgIGlmIChzaGlwdHlwZSArIHNoaXBjb29yc1swXVsxXSA+IDEwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgICAgfVxuXG4gICAgICBnYW1lQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3ZlclNoaXBzKTtcbiAgICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcGNvb3JzKTtcbiAgICAgIHJlbW92ZVNlbGVjdGlvbihzaGlwdHlwZSk7XG4gICAgICBkaXNwbGF5U2VsZWN0ZWRBcmVhcyhwbGFjZWRTaGlwcyk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5leHBvcnQgY29uc3QgcmVtb3ZlU2VsZWN0aW9uID0gZnVuY3Rpb24gKG4pIHtcbiAgY29uc3QgcmVtb3ZlU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNoaXBzPScke259J11gKTtcbiAgaWYgKHJlbW92ZVNoaXAgPT09IG51bGwpIHJldHVybjtcbiAgcmVtb3ZlU2hpcC5yZW1vdmUoKTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGxheVNlbGVjdGVkQXJlYXMgPSBmdW5jdGlvbiAoYXJlYXMpIHtcbiAgYXJlYXMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuZm9yRWFjaCgoY29vcikgPT4ge1xuICAgICAgY29vciA9IGNvb3Iuam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGdyaWRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yPVwiJHtjb29yfVwiXWApO1xuICAgICAgZ3JpZEJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJncmVlblwiO1xuICAgIH0pO1xuICB9KTtcbn07XG5leHBvcnQgY29uc3Qgc3RhcnRHYW1lID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGFjZWRTaGlwc1NlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyU2hpcHNcIik7XG4gIHBsYWNlZFNoaXBzU2VsZWN0aW9uLnJlbW92ZSgpO1xuICBjcmVhdGVCb2FyZChcImFpXCIpO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Qm9hcmQgPSBmdW5jdGlvbiAoZ2FtZUJvYXJkLCBwbGF5ZXIpIHtcbiAgY29uc3QgZ3JpZEJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7cGxheWVyfWApO1xuICBnYW1lQm9hcmQuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgcm93LmZvckVhY2goKHgsIGopID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbeCwgal0uam9pbihcIlwiKTtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGRhdGEtY29vcj1cIiR7Y29vcmRpbmF0ZX1cImApO1xuICAgICAgaWYgKGdhbWVCb2FyZFt4XVt5XSA9PSAwKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJhbnRpcXVld2hpdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkW3hdW3ldID09IDEpIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XG4gICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZFt4XVt5XSA9PSAyKSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibHVlXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHNlbGVjdFNoaXBzIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2RvbTJcIjtcbmNvbnN0IHVzZXJTaGlwU2VsY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICBjcmVhdGVCb2FyZChcInBsYXllclwiKTtcbiAgY29uc3QgcGxheWVyU2hpcHMgPSBbXTtcbiAgY29uc3Qgc2hpcHNUb1NlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcHNcIik7XG4gIHNoaXBzVG9TZWxlY3QuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXJgKTtcbiAgICAgIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXJTaGlwcy5sZW5ndGgpO1xuICAgICAgICAgIGlmIChwbGF5ZXJTaGlwcy5sZW5ndGggPT0gNCkge1xuICAgICAgICAgICAgc3RhcnRHYW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNoaXBTaXplID0gc2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBzXCIpO1xuICAgICAgc2VsZWN0U2hpcHMoc2hpcFNpemUsIHBsYXllclNoaXBzKTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9