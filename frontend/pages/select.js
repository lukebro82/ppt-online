"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSelect = void 0;
const state_1 = require("../state");
function initSelect(params) {
    state_1.state.setUserMove("papel");
    const div = document.createElement("div");
    div.className = "select";
    let counter = 6;
    let typesPiedra = "hand-img ";
    let typesPapel = "hand-img ";
    let typesTijera = "hand-img ";
    const interval = setInterval(() => {
        counter--;
        div.innerHTML = `                 
                <div class="div-redondo"> <h2 class="h2-redondo">${counter}</h2> </div>


                <div class="hands-div">  
                  <hands-el hand="piedra" type="${typesPiedra}" class="piedra"></hands-el>
                  <hands-el hand="papel"  type="${typesPapel}" class="papel"></hands-el>
                  <hands-el hand="tijera" type="${typesTijera}" class="tijera"></hands-el>
                 </div>

                 `;
        const piedraEl = div.querySelector(".piedra");
        const papelEl = div.querySelector(".papel");
        const tijeraEl = div.querySelector(".tijera");
        piedraEl?.addEventListener("click", () => {
            typesPiedra = "hand-grande";
            typesPapel = "hand-none";
            typesTijera = "hand-none";
            state_1.state.setUserMove("piedra");
        });
        papelEl?.addEventListener("click", () => {
            typesPiedra = "hand-none";
            typesPapel = "hand-grande";
            typesTijera = "hand-none";
            state_1.state.setUserMove("papel");
        });
        tijeraEl?.addEventListener("click", () => {
            typesPiedra = "hand-none";
            typesPapel = "hand-none";
            typesTijera = "hand-grande";
            state_1.state.setUserMove("tijera");
        });
        if (counter === 0) {
            // Detener el intervalo
            clearInterval(interval);
            state_1.state.runPlayComputer();
            params.goTo("/versus");
        }
    }, 1000);
    return div;
}
exports.initSelect = initSelect;
