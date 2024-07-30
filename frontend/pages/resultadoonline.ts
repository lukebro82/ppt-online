import { state } from "../state";
import { Router } from "@vaadin/router";

export class Resultadoonline extends HTMLElement {
  connectedCallback() {
    state.data.userReady = false;

    let verGanador = state.whoWinsOnline(
      state.data.userChoice,
      state.data.rivalChoice
    );

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
    state.updateRoom(state.data.roomIdRtadb, state.data.userID).then(() => {
      state.getRoomData(state.data.roomIdRtadb).then(() => {
        this.render(resultado);
      });
    });
  }
  render(resultado) {
    this.innerHTML = `
   <div class="resultado-div"> 
      <div class="${resultado}">  
      
      <winlost-el resultado="${resultado}" ></winlost-el>
  
      <scoreonline-el></scoreonline-el>
      
      <el-button class="button-reinicar">Volver</el-button>
      </div>
   
   </div>
          `;
    const reiniciarButtonEl = this.querySelector(".button-reinicar");
    reiniciarButtonEl?.addEventListener("click", async () => {
      Router.go("/playonline");
    });
  }
}

customElements.define("resultadoonline-page", Resultadoonline);
