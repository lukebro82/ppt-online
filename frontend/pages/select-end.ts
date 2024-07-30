import { state } from "../state";
import { Router } from "@vaadin/router";

export class Selectend extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const currentSate = state.getState();
    const computerSelect = currentSate.currentGame.computerPlay;
    const userSelect = currentSate.currentGame.userPlay;

    this.innerHTML = `  
  <div class="select-end">
  <hands-el hand="${computerSelect}" type="hand-grande" class="select-end-computer"></hands-el>
  <hands-el hand="${userSelect}"  type="hand-grande" class="select-end-user"></hands-el>
   </div>
  `;

    let counter = 1;
    const interval = setInterval(() => {
      counter--;

      if (counter === 0) {
        // Detener el intervalo
        clearInterval(interval);
        Router.go("/resultado");
      }
    }, 1000);
  }
}

customElements.define("select-end", Selectend);
