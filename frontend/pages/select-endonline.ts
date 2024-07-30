import { state } from "../state";
import { Router } from "@vaadin/router";

export class Selectendonline extends HTMLElement {
  connectedCallback() {
    state
      .getRoomData(state.data.roomIdRtadb)
      .then(() => {
        const computerSelect = state.data.rivalChoice;
        const userSelect = state.data.userChoice;
        this.render(computerSelect, userSelect);
        console.log(computerSelect, userSelect);
      })
      .then(() => {
        let tiempoRestante = 2;
        const intervalo = setInterval(() => {
          tiempoRestante--;

          if (tiempoRestante === 0) {
            clearInterval(intervalo);
            Router.go("/resultadoonline");
          }
        }, 1000);
      });
  }

  render(computerSelect, userSelect) {
    this.innerHTML = `  
  <div class="select-end">
  <hands-el hand="${computerSelect}" type="hand-grande" class="select-end-computer"></hands-el>
  <hands-el hand="${userSelect}"  type="hand-grande" class="select-end-user"></hands-el>
   </div>
  `;
  }
}

customElements.define("select-endonline", Selectendonline);
