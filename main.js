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
        x.style.background = "antiquewhite";
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
/* harmony export */   "displaySelectedAreas": () => (/* binding */ displaySelectedAreas),
/* harmony export */   "removeSelection": () => (/* binding */ removeSelection)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

const removeSelection = function (n) {
  const removeShip = document.querySelector(`[data-ships='${n}']`);
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


const userShipSelction = (function () {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBoard)("player");
  let totalShipsPlaced = 0;
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          totalShipsPlaced += 1;
          console.log(totalShipsPlaced);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9FO0FBQzdEO0FBQ1AsK0NBQStDLFVBQVU7QUFDekQsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRCQUE0QixFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkRBQWU7QUFDckIsTUFBTSxnRUFBb0I7QUFDMUIsS0FBSztBQUNMLE1BQU07QUFDTjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGb0M7QUFDN0I7QUFDUCw0REFBNEQsRUFBRTtBQUM5RDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsS0FBSztBQUNqRTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlEOztBQUVqRDtBQUNBLEVBQUUsaURBQVc7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTSxpREFBVztBQUNqQixLQUFLO0FBQ0wsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NlbGVjdERvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW1vdmVTZWxlY3Rpb24sIGRpc3BsYXlTZWxlY3RlZEFyZWFzIH0gZnJvbSBcIi4vc2VsZWN0RG9tXCI7XG5leHBvcnQgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbiAoYm9hcmROYW1lKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkTmFtZX1gKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYm94LmNsYXNzTGlzdC5hZGQoXCJncmlkQm94XCIpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGAke2l9YCArIGo7XG4gICAgICBib3guc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIsIGNvb3JkaW5hdGUpO1xuICAgICAgZ2FtZUJvYXJkLmFwcGVuZChib3gpO1xuICAgIH1cbiAgfVxufTtcbi8vNDUgLy80NiAvLzQ3IC8vNDhbW3hdLFt5XV1cblxuY29uc3QgcGxhY2VUYWtlbiA9IGZ1bmN0aW9uIChwbGFjZWRTaGlwcywgY29vcnMpIHtcbiAgbGV0IHRha2VuID0gZmFsc2U7XG4gIHBsYWNlZFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb29ycy5mb3JFYWNoKChjb29yKSA9PiB7XG4gICAgICBzaGlwLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgaWYgKHguam9pbihcIlwiKSA9PSBjb29yLmpvaW4oXCJcIikpIHRha2VuID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRha2VuO1xufTtcblxuLy8gc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4vLyAgIGlmICh4WzBdICsgeFsxXSA9PSApIHtcbi8vICAgfVxuXG4vL1xuZXhwb3J0IGNvbnN0IHNlbGVjdFNoaXBzID0gZnVuY3Rpb24gKHNoaXB0eXBlLCBwbGFjZWRTaGlwcykge1xuICBzaGlwdHlwZSA9IHBhcnNlSW50KHNoaXB0eXBlKTtcbiAgY29uc3QgaG92ZXJTaGlwcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc3Qgc2hpcGNvb3JzID0gW107XG4gICAgY29uc3Qgc2hpcGNvb3IgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIik7XG4gICAgc2hpcGNvb3JzLnB1c2goc2hpcGNvb3Iuc3BsaXQoXCJcIikubWFwKCh4KSA9PiBwYXJzZUludCh4KSkpO1xuICAgIGlmIChzaGlwdHlwZSArIHNoaXBjb29yc1swXVsxXSA+IDEwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgc2hpcGNvb3JzLnB1c2goW3BhcnNlSW50KHNoaXBjb29yWzBdKSwgcGFyc2VJbnQoc2hpcGNvb3JzWzBdWzFdKSArIGldKTtcbiAgICB9XG4gICAgY29uc3QgY2FuQmVwbGFjZWQgPSBwbGFjZVRha2VuKHBsYWNlZFNoaXBzLCBzaGlwY29vcnMpO1xuICAgIGNvbnNvbGUubG9nKGNhbkJlcGxhY2VkKTtcbiAgICBpZiAocGxhY2VUYWtlbihwbGFjZWRTaGlwcywgc2hpcGNvb3JzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzaGlwY29vcnMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9JyR7c2hpcC5qb2luKFwiXCIpfSddYCk7XG4gICAgICBncmlkQm94LnN0eWxlLmJhY2tncm91bmQgPSBcImdyZXlcIjtcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllcmApO1xuICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3ZlclNoaXBzKTtcbiAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRCb3hcIik7XG4gIGJveGVzLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICBib3hlcy5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgIHguc3R5bGUuYmFja2dyb3VuZCA9IFwiYW50aXF1ZXdoaXRlXCI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGdhbWVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICAoZSkgPT4ge1xuICAgICAgY29uc3Qgc2hpcGNvb3JzID0gW107XG4gICAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICAgIGlmIChzaGlwdHlwZSArIHNoaXBjb29yc1swXVsxXSA+IDEwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgICBzaGlwY29vcnMucHVzaChbcGFyc2VJbnQoc2hpcGNvb3JbMF0pLCBwYXJzZUludChzaGlwY29vcnNbMF1bMV0pICsgaV0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc2hpcGNvb3JzKTtcbiAgICAgIGdhbWVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhvdmVyU2hpcHMpO1xuICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwY29vcnMpO1xuICAgICAgcmVtb3ZlU2VsZWN0aW9uKHNoaXB0eXBlKTtcbiAgICAgIGRpc3BsYXlTZWxlY3RlZEFyZWFzKHBsYWNlZFNoaXBzKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgc2VsZWN0U2hpcHMgfSBmcm9tIFwiLi9kb21cIjtcbmV4cG9ydCBjb25zdCByZW1vdmVTZWxlY3Rpb24gPSBmdW5jdGlvbiAobikge1xuICBjb25zdCByZW1vdmVTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2hpcHM9JyR7bn0nXWApO1xuICByZW1vdmVTaGlwLnJlbW92ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyA9IGZ1bmN0aW9uIChhcmVhcykge1xuICBhcmVhcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5mb3JFYWNoKChjb29yKSA9PiB7XG4gICAgICBjb29yID0gY29vci5qb2luKFwiXCIpO1xuICAgICAgY29uc3QgZ3JpZEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3I9XCIke2Nvb3J9XCJdYCk7XG4gICAgICBncmlkQm94LnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHNlbGVjdFNoaXBzIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IHVzZXJTaGlwU2VsY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICBjcmVhdGVCb2FyZChcInBsYXllclwiKTtcbiAgbGV0IHRvdGFsU2hpcHNQbGFjZWQgPSAwO1xuICBjb25zdCBwbGF5ZXJTaGlwcyA9IFtdO1xuICBjb25zdCBzaGlwc1RvU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwc1wiKTtcbiAgc2hpcHNUb1NlbGVjdC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllcmApO1xuICAgICAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRvdGFsU2hpcHNQbGFjZWQgKz0gMTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0b3RhbFNoaXBzUGxhY2VkKTtcbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICBjb25zdCBzaGlwU2l6ZSA9IHNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwc1wiKTtcbiAgICAgIHNlbGVjdFNoaXBzKHNoaXBTaXplLCBwbGF5ZXJTaGlwcyk7XG4gICAgfSk7XG4gIH0pO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==