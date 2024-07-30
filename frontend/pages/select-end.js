"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selectend = void 0;
const state_1 = require("../state");
const router_1 = require("@vaadin/router");
class Selectend extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        const currentSate = state_1.state.getState();
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
                router_1.Router.go("/resultado");
            }
        }, 1000);
    }
}
exports.Selectend = Selectend;
customElements.define("select-end", Selectend);
