"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resultado = void 0;
const state_1 = require("../state");
const router_1 = require("@vaadin/router");
class Resultado extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
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
        this.innerHTML = `
   <div class="resultado-div"> 
      <div class="${resultado}">  
      
      <winlost-el resultado="${resultado}" ></winlost-el>
  
      <score-el></score-el>
      
      <el-button class="button-reinicar">Volver</el-button>
      </div>
   
   </div>
          `;
        const reiniciarButtonEl = this.querySelector(".button-reinicar");
        reiniciarButtonEl?.addEventListener("click", () => {
            router_1.Router.go("/comojugar");
        });
    }
}
exports.Resultado = Resultado;
customElements.define("resultado-page", Resultado);
