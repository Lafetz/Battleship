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
/* harmony import */ var _selectDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectDom */ "./src/selectDom.js");

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
        (0,_selectDom__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
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
      (0,_selectDom__WEBPACK_IMPORTED_MODULE_0__.removeSelection)(shiptype);
      (0,_selectDom__WEBPACK_IMPORTED_MODULE_0__.displaySelectedAreas)(placedShips);
    },
    { once: true }
  );
};


/***/ }),

/***/ "./src/selectDom.js":
/*!**************************!*\
  !*** ./src/selectDom.js ***!
  \**************************/
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
/* harmony import */ var _selectDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectDom */ "./src/selectDom.js");


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
          if (playerShips.length == 5) {
            (0,_selectDom__WEBPACK_IMPORTED_MODULE_1__.startGame)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9FO0FBQzdEO0FBQ1AsK0NBQStDLFVBQVU7QUFDekQsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRCQUE0QixFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQW9CO0FBQzVCLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDJEQUFlO0FBQ3JCLE1BQU0sZ0VBQW9CO0FBQzFCLEtBQUs7QUFDTCxNQUFNO0FBQ047QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9Gb0M7QUFDN0I7QUFDUCw0REFBNEQsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxLQUFLO0FBQ2pFO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNPO0FBQ1AsK0NBQStDLE9BQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVc7QUFDbEU7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05pRDtBQUNLO0FBQ3REO0FBQ0EsRUFBRSxpREFBVztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscURBQVM7QUFDckI7QUFDQSxTQUFTO0FBQ1QsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNLGlEQUFXO0FBQ2pCLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2VsZWN0RG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbW92ZVNlbGVjdGlvbiwgZGlzcGxheVNlbGVjdGVkQXJlYXMgfSBmcm9tIFwiLi9zZWxlY3REb21cIjtcbmV4cG9ydCBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZE5hbWUpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmROYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hcIik7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYCR7aX1gICsgajtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIiwgY29vcmRpbmF0ZSk7XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kKGJveCk7XG4gICAgfVxuICB9XG59O1xuLy80NSAvLzQ2IC8vNDcgLy80OFtbeF0sW3ldXVxuXG5jb25zdCBwbGFjZVRha2VuID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29ycykge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvb3JzLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICBpZiAoeC5qb2luKFwiXCIpID09IGNvb3Iuam9pbihcIlwiKSkgdGFrZW4gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFrZW47XG59O1xuY29uc3QgZG9udFBhaW50ID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29yKSB7XG4gIGxldCB0YWtlbiA9IGZhbHNlO1xuICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICBpZiAoeC5qb2luKFwiXCIgPT0gY29vcikpIHRha2VuID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YWtlbjtcbn07XG4vLyBzaGlwLmZvckVhY2goKHgpID0+IHtcbi8vICAgaWYgKHhbMF0gKyB4WzFdID09ICkge1xuLy8gICB9XG5cbi8vXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hpcHMgPSBmdW5jdGlvbiAoc2hpcHR5cGUsIHBsYWNlZFNoaXBzKSB7XG4gIHNoaXB0eXBlID0gcGFyc2VJbnQoc2hpcHR5cGUpO1xuICBjb25zdCBob3ZlclNoaXBzID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwdHlwZTsgaSsrKSB7XG4gICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgIH1cbiAgICBjb25zdCBjYW5CZXBsYWNlZCA9IHBsYWNlVGFrZW4ocGxhY2VkU2hpcHMsIHNoaXBjb29ycyk7XG4gICAgY29uc29sZS5sb2coY2FuQmVwbGFjZWQpO1xuICAgIGlmIChwbGFjZVRha2VuKHBsYWNlZFNoaXBzLCBzaGlwY29vcnMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNoaXBjb29ycy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj0nJHtzaGlwLmpvaW4oXCJcIil9J11gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JleVwiO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZEJveFwiKTtcbiAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICAgIGJveGVzLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgLy8gY29uc3QgdGFrZW4gPSBkb250UGFpbnQocGxhY2VkU2hpcHMsIHguZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFrZW4pO1xuICAgICAgICB4LnN0eWxlLmJhY2tncm91bmQgPSBcImFudGlxdWV3aGl0ZVwiO1xuICAgICAgICBkaXNwbGF5U2VsZWN0ZWRBcmVhcyhwbGFjZWRTaGlwcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgY29uc3Qgc2hpcGNvb3JzID0gW107XG4gICAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICAgIGlmIChzaGlwdHlwZSArIHNoaXBjb29yc1swXVsxXSA+IDEwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc2hpcGNvb3JzKTtcbiAgICAgIGdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwY29vcnMpO1xuICAgICAgcmVtb3ZlU2VsZWN0aW9uKHNoaXB0eXBlKTtcbiAgICAgIGRpc3BsYXlTZWxlY3RlZEFyZWFzKHBsYWNlZFNoaXBzKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQgfSBmcm9tIFwiLi9kb21cIjtcbmV4cG9ydCBjb25zdCByZW1vdmVTZWxlY3Rpb24gPSBmdW5jdGlvbiAobikge1xuICBjb25zdCByZW1vdmVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcHM9JyR7bn0nXWApO1xuICBpZiAocmVtb3ZlU2hpcCA9PT0gbnVsbCkgcmV0dXJuO1xuICByZW1vdmVTaGlwLnJlbW92ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyA9IGZ1bmN0aW9uIChhcmVhcykge1xuICBhcmVhcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKChjb29yKSA9PiB7XG4gICAgICBjb29yID0gY29vci5qb2luKFwiXCIpO1xuICAgICAgY29uc3QgZ3JpZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9XCIke2Nvb3J9XCJdYCk7XG4gICAgICBncmlkQm94LnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBjb25zdCBzdGFydEdhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYWNlZFNoaXBzU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJTaGlwc1wiKTtcbiAgcGxhY2VkU2hpcHNTZWxlY3Rpb24ucmVtb3ZlKCk7XG4gIGNyZWF0ZUJvYXJkKFwiYWlcIik7XG59O1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlCb2FyZCA9IGZ1bmN0aW9uIChnYW1lQm9hcmQsIHBsYXllcikge1xuICBjb25zdCBncmlkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXJ9YCk7XG4gIGdhbWVCb2FyZC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoeCwgaikgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFt4LCBqXS5qb2luKFwiXCIpO1xuICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGF0YS1jb29yPVwiJHtjb29yZGluYXRlfVwiYCk7XG4gICAgICBpZiAoZ2FtZUJvYXJkW3hdW3ldID09IDApIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcImFudGlxdWV3aGl0ZVwiO1xuICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmRbeF1beV0gPT0gMSkge1xuICAgICAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JlZW5cIjtcbiAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkW3hdW3ldID09IDIpIHtcbiAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmQgPSBcImJsdWVcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCwgc2VsZWN0U2hpcHMgfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IGRpc3BsYXlCb2FyZCwgc3RhcnRHYW1lIH0gZnJvbSBcIi4vc2VsZWN0RG9tXCI7XG5jb25zdCB1c2VyU2hpcFNlbGN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgY3JlYXRlQm9hcmQoXCJwbGF5ZXJcIik7XG4gIGNvbnN0IHBsYXllclNoaXBzID0gW107XG4gIGNvbnN0IHNoaXBzVG9TZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBzXCIpO1xuICBzaGlwc1RvU2VsZWN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gICAgICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHBsYXllclNoaXBzLmxlbmd0aCA9PSA1KSB7XG4gICAgICAgICAgICBzdGFydEdhbWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgICAgY29uc3Qgc2hpcFNpemUgPSBzaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtc2hpcHNcIik7XG4gICAgICBzZWxlY3RTaGlwcyhzaGlwU2l6ZSwgcGxheWVyU2hpcHMpO1xuICAgIH0pO1xuICB9KTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=