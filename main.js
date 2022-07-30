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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9FO0FBQzdEO0FBQ1AsK0NBQStDLFVBQVU7QUFDekQsa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLDRCQUE0QixFQUFFO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0VBQW9CO0FBQzVCLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDJEQUFlO0FBQ3JCLE1BQU0sZ0VBQW9CO0FBQzFCLEtBQUs7QUFDTCxNQUFNO0FBQ047QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRm9DO0FBQzdCO0FBQ1AsNERBQTRELEVBQUU7QUFDOUQ7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNERBQTRELEtBQUs7QUFDakU7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pRDs7QUFFakQ7QUFDQSxFQUFFLGlEQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU0saURBQVc7QUFDakIsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zZWxlY3REb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVtb3ZlU2VsZWN0aW9uLCBkaXNwbGF5U2VsZWN0ZWRBcmVhcyB9IGZyb20gXCIuL3NlbGVjdERvbVwiO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUJvYXJkID0gZnVuY3Rpb24gKGJvYXJkTmFtZSkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZE5hbWV9YCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJveC5jbGFzc0xpc3QuYWRkKFwiZ3JpZEJveFwiKTtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBgJHtpfWAgKyBqO1xuICAgICAgYm94LnNldEF0dHJpYnV0ZShcImRhdGEtY29vclwiLCBjb29yZGluYXRlKTtcbiAgICAgIGdhbWVCb2FyZC5hcHBlbmQoYm94KTtcbiAgICB9XG4gIH1cbn07XG4vLzQ1IC8vNDYgLy80NyAvLzQ4W1t4XSxbeV1dXG5cbmNvbnN0IHBsYWNlVGFrZW4gPSBmdW5jdGlvbiAocGxhY2VkU2hpcHMsIGNvb3JzKSB7XG4gIGxldCB0YWtlbiA9IGZhbHNlO1xuICBwbGFjZWRTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29vcnMuZm9yRWFjaCgoY29vcikgPT4ge1xuICAgICAgc2hpcC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgIGlmICh4LmpvaW4oXCJcIikgPT0gY29vci5qb2luKFwiXCIpKSB0YWtlbiA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YWtlbjtcbn07XG5jb25zdCBkb250UGFpbnQgPSBmdW5jdGlvbiAocGxhY2VkU2hpcHMsIGNvb3IpIHtcbiAgbGV0IHRha2VuID0gZmFsc2U7XG4gIHBsYWNlZFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmZvckVhY2goKHgpID0+IHtcbiAgICAgIGlmICh4LmpvaW4oXCJcIiA9PSBjb29yKSkgdGFrZW4gPSB0cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRha2VuO1xufTtcbi8vIHNoaXAuZm9yRWFjaCgoeCkgPT4ge1xuLy8gICBpZiAoeFswXSArIHhbMV0gPT0gKSB7XG4vLyAgIH1cblxuLy9cbmV4cG9ydCBjb25zdCBzZWxlY3RTaGlwcyA9IGZ1bmN0aW9uIChzaGlwdHlwZSwgcGxhY2VkU2hpcHMpIHtcbiAgc2hpcHR5cGUgPSBwYXJzZUludChzaGlwdHlwZSk7XG4gIGNvbnN0IGhvdmVyU2hpcHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IHNoaXBjb29ycyA9IFtdO1xuICAgIGNvbnN0IHNoaXBjb29yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpO1xuICAgIHNoaXBjb29ycy5wdXNoKHNoaXBjb29yLnNwbGl0KFwiXCIpLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpKTtcbiAgICBpZiAoc2hpcHR5cGUgKyBzaGlwY29vcnNbMF1bMV0gPiAxMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXB0eXBlOyBpKyspIHtcbiAgICAgIHNoaXBjb29ycy5wdXNoKFtwYXJzZUludChzaGlwY29vclswXSksIHBhcnNlSW50KHNoaXBjb29yc1swXVsxXSkgKyBpXSk7XG4gICAgfVxuICAgIGNvbnN0IGNhbkJlcGxhY2VkID0gcGxhY2VUYWtlbihwbGFjZWRTaGlwcywgc2hpcGNvb3JzKTtcbiAgICBjb25zb2xlLmxvZyhjYW5CZXBsYWNlZCk7XG4gICAgaWYgKHBsYWNlVGFrZW4ocGxhY2VkU2hpcHMsIHNoaXBjb29ycykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2hpcGNvb3JzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGNvbnN0IGdyaWRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yPScke3NoaXAuam9pbihcIlwiKX0nXWApO1xuICAgICAgZ3JpZEJveC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJncmV5XCI7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXJgKTtcbiAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXJTaGlwcyk7XG4gIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkQm94XCIpO1xuICBib3hlcy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuICAgICAgYm94ZXMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAvLyBjb25zdCB0YWtlbiA9IGRvbnRQYWludChwbGFjZWRTaGlwcywgeC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JcIikpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWtlbik7XG4gICAgICAgIHguc3R5bGUuYmFja2dyb3VuZCA9IFwiYW50aXF1ZXdoaXRlXCI7XG4gICAgICAgIGRpc3BsYXlTZWxlY3RlZEFyZWFzKHBsYWNlZFNoaXBzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgZ2FtZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjb25zdCBzaGlwY29vcnMgPSBbXTtcbiAgICAgIGNvbnN0IHNoaXBjb29yID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yXCIpO1xuICAgICAgc2hpcGNvb3JzLnB1c2goc2hpcGNvb3Iuc3BsaXQoXCJcIikubWFwKCh4KSA9PiBwYXJzZUludCh4KSkpO1xuICAgICAgaWYgKHNoaXB0eXBlICsgc2hpcGNvb3JzWzBdWzFdID4gMTApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwdHlwZTsgaSsrKSB7XG4gICAgICAgIHNoaXBjb29ycy5wdXNoKFtwYXJzZUludChzaGlwY29vclswXSksIHBhcnNlSW50KHNoaXBjb29yc1swXVsxXSkgKyBpXSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhzaGlwY29vcnMpO1xuICAgICAgZ2FtZUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaG92ZXJTaGlwcyk7XG4gICAgICBwbGFjZWRTaGlwcy5wdXNoKHNoaXBjb29ycyk7XG4gICAgICByZW1vdmVTZWxlY3Rpb24oc2hpcHR5cGUpO1xuICAgICAgZGlzcGxheVNlbGVjdGVkQXJlYXMocGxhY2VkU2hpcHMpO1xuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH1cbiAgKTtcbn07XG4iLCJpbXBvcnQgeyBzZWxlY3RTaGlwcyB9IGZyb20gXCIuL2RvbVwiO1xuZXhwb3J0IGNvbnN0IHJlbW92ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIChuKSB7XG4gIGNvbnN0IHJlbW92ZVNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zaGlwcz0nJHtufSddYCk7XG4gIHJlbW92ZVNoaXAucmVtb3ZlKCk7XG59O1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlTZWxlY3RlZEFyZWFzID0gZnVuY3Rpb24gKGFyZWFzKSB7XG4gIGFyZWFzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmZvckVhY2goKGNvb3IpID0+IHtcbiAgICAgIGNvb3IgPSBjb29yLmpvaW4oXCJcIik7XG4gICAgICBjb25zdCBncmlkQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29vcj1cIiR7Y29vcn1cIl1gKTtcbiAgICAgIGdyaWRCb3guc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JlZW5cIjtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCwgc2VsZWN0U2hpcHMgfSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgdXNlclNoaXBTZWxjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gIGNyZWF0ZUJvYXJkKFwicGxheWVyXCIpO1xuICBsZXQgdG90YWxTaGlwc1BsYWNlZCA9IDA7XG4gIGNvbnN0IHBsYXllclNoaXBzID0gW107XG4gIGNvbnN0IHNoaXBzVG9TZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBzXCIpO1xuICBzaGlwc1RvU2VsZWN0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyYCk7XG4gICAgICBnYW1lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdG90YWxTaGlwc1BsYWNlZCArPSAxO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsU2hpcHNQbGFjZWQpO1xuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNoaXBTaXplID0gc2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBzXCIpO1xuICAgICAgc2VsZWN0U2hpcHMoc2hpcFNpemUsIHBsYXllclNoaXBzKTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9