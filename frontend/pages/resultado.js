"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initResultado = void 0;
const state_1 = require("../state");
function initResultado(params) {
    const currentState = state_1.state.getState();
    let jugadaUser = currentState.currentGame.userPlay;
    let jugadaComputer = currentState.currentGame.computerPlay;
    let verGanador = state_1.state.whoWins(jugadaUser, jugadaComputer);
    let resultado;
    if (verGanador == "user") {
        resultado = "Ganaste";
    }
    if (verGanador == "empate") {
        resultado = "Empate";
    }
    if (verGanador == "computer") {
        resultado = "Perdiste";
    }
    const div = document.createElement("div");
    div.className = "resultado-div";
    div.innerHTML = `
     
    <div class="${resultado}">  
    
    <winlost-el resultado="${resultado}" ></winlost-el>

    <score-el></score-el>
    
    <el-button class="button-reinicar">Volver</el-button></div>
  
        `;
    const reiniciarButtonEl = div.querySelector(".button-reinicar");
    reiniciarButtonEl?.addEventListener("click", () => {
        params.goTo("/comojugar");
    });
    return div;
}
exports.initResultado = initResultado;
