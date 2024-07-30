import { state } from "../state";
import { Router } from "@vaadin/router";

export class Resultado extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const currentState = state.getState();
    let jugadaUser = currentState.currentGame.userPlay;
    let jugadaComputer = currentState.currentGame.computerPlay;
    let verGanador = state.whoWins(jugadaUser, jugadaComputer);
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
       <el-button class="button-inicio">Inicio</el-button>
      </div>
   
   </div>
          `;

    const reiniciarButtonEl = this.querySelector(".button-reinicar");
    reiniciarButtonEl?.addEventListener("click", () => {
      Router.go("/comojugar");
    });

    const inicioButtonEl = this.querySelector(".button-inicio");
    inicioButtonEl?.addEventListener("click", () => {
      Router.go("/");
    });
  }
}

customElements.define("resultado-page", Resultado);
