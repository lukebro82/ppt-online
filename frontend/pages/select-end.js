"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSelectEnd = void 0;
const state_1 = require("../state");
function initSelectEnd(params) {
    const div = document.createElement("div");
    div.className = "select-end";
    const currentSate = state_1.state.getState();
    const computerSelect = currentSate.currentGame.computerPlay;
    const userSelect = currentSate.currentGame.userPlay;
    div.innerHTML = `  
  
  <hands-el hand="${computerSelect}" type="hand-grande" class="select-end-computer"></hands-el>
  <hands-el hand="${userSelect}"  type="hand-grande" class="select-end-user"></hands-el>
   
  `;
    let counter = 1;
    const interval = setInterval(() => {
        counter--;
        if (counter === 0) {
            // Detener el intervalo
            clearInterval(interval);
            params.goTo("/resultado");
        }
    }, 1000);
    return div;
}
exports.initSelectEnd = initSelectEnd;
