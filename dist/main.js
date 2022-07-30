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
      const toPlace = coors[0] + coors[1];
      ship.forEach((x) => {
        if (x[0] + x[1] == toPlace) return true;
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
  const hoverShips = function (e) {
    const shipcoors = [];
    const shipcoor = e.target.getAttribute("data-coor");
    shipcoors.push(shipcoor.split("").map((x) => parseInt(x)));
    if (shiptype + shipcoors[0][1] > 10) {
      console.log("error");
      return;
    }
    for (let i = 1; i < shiptype; i++) {
      shipcoors.push([parseInt(shipcoor[0]), parseInt(shipcoors[0][1]) + i]);
    }
    if (placeTaken(placedShips, shipcoors))
      shipcoors.forEach((ship) => {
        const gridBox = document.querySelector(
          `[data-coor='${ship.join("")}']`
        );
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
      return shipcoors;
    },
    { once: true }
  );
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

(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBoard)("player");
(0,_dom__WEBPACK_IMPORTED_MODULE_0__.selectShips)(5);

//5 4 3 3 2
// const playerShipsPlacement = (function () {
//   const playerShips = [];

// })();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQLCtDQUErQyxVQUFVO0FBQ3pELGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSw0QkFBNEIsRUFBRTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsY0FBYztBQUN2QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLE1BQU07QUFDTjtBQUNBOzs7Ozs7O1VDaEZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0U7QUFDaEUsaURBQVc7QUFDWCxpREFBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZE5hbWUpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmROYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBib3guY2xhc3NMaXN0LmFkZChcImdyaWRCb3hcIik7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYCR7aX1gICsgajtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIiwgY29vcmRpbmF0ZSk7XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kKGJveCk7XG4gICAgfVxuICB9XG59O1xuLy80NSAvLzQ2IC8vNDcgLy80OFtbeF0sW3ldXVxuXG5jb25zdCBwbGFjZVRha2VuID0gZnVuY3Rpb24gKHBsYWNlZFNoaXBzLCBjb29ycykge1xuICBsZXQgdGFrZW4gPSBmYWxzZTtcbiAgcGxhY2VkU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvb3JzLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIGNvbnN0IHRvUGxhY2UgPSBjb29yc1swXSArIGNvb3JzWzFdO1xuICAgICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgIGlmICh4WzBdICsgeFsxXSA9PSB0b1BsYWNlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRha2VuO1xufTtcblxuLy8gc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4vLyAgIGlmICh4WzBdICsgeFsxXSA9PSApIHtcbi8vICAgfVxuXG4vL1xuZXhwb3J0IGNvbnN0IHNlbGVjdFNoaXBzID0gZnVuY3Rpb24gKHNoaXB0eXBlLCBwbGFjZWRTaGlwcykge1xuICBjb25zdCBob3ZlclNoaXBzID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICBjb25zdCBzaGlwY29vciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vclwiKTtcbiAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcHR5cGU7IGkrKykge1xuICAgICAgc2hpcGNvb3JzLnB1c2goW3BhcnNlSW50KHNoaXBjb29yWzBdKSwgcGFyc2VJbnQoc2hpcGNvb3JzWzBdWzFdKSArIGldKTtcbiAgICB9XG4gICAgaWYgKHBsYWNlVGFrZW4ocGxhY2VkU2hpcHMsIHNoaXBjb29ycykpXG4gICAgICBzaGlwY29vcnMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtY29vcj0nJHtzaGlwLmpvaW4oXCJcIil9J11gXG4gICAgICAgICk7XG4gICAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JleVwiO1xuICAgICAgfSk7XG4gIH07XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXJgKTtcbiAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXJTaGlwcyk7XG4gIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkQm94XCIpO1xuICBib3hlcy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuICAgICAgYm94ZXMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICB4LnN0eWxlLmJhY2tncm91bmQgPSBcImFudGlxdWV3aGl0ZVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNvbnN0IHNoaXBjb29ycyA9IFtdO1xuICAgICAgY29uc3Qgc2hpcGNvb3IgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIik7XG4gICAgICBzaGlwY29vcnMucHVzaChzaGlwY29vci5zcGxpdChcIlwiKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKSk7XG4gICAgICBpZiAoc2hpcHR5cGUgKyBzaGlwY29vcnNbMF1bMV0gPiAxMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXB0eXBlOyBpKyspIHtcbiAgICAgICAgc2hpcGNvb3JzLnB1c2goW3BhcnNlSW50KHNoaXBjb29yWzBdKSwgcGFyc2VJbnQoc2hpcGNvb3JzWzBdWzFdKSArIGldKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHNoaXBjb29ycyk7XG4gICAgICBnYW1lQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBob3ZlclNoaXBzKTtcbiAgICAgIHJldHVybiBzaGlwY29vcnM7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHNlbGVjdFNoaXBzLCBzaGlwUGxhY2VtZW50IH0gZnJvbSBcIi4vZG9tXCI7XG5jcmVhdGVCb2FyZChcInBsYXllclwiKTtcbnNlbGVjdFNoaXBzKDUpO1xuXG4vLzUgNCAzIDMgMlxuLy8gY29uc3QgcGxheWVyU2hpcHNQbGFjZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xuLy8gICBjb25zdCBwbGF5ZXJTaGlwcyA9IFtdO1xuXG4vLyB9KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9