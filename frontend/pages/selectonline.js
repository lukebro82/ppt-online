"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selectonline = void 0;
const state_1 = require("../state");
const router_1 = require("@vaadin/router");
class Selectonline extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        state_1.state.setUserMove("papel");
        let counter = 6;
        let typesPiedra = "hand-img ";
        let typesPapel = "hand-img ";
        let typesTijera = "hand-img ";
        const interval = setInterval(() => {
            counter--;
            this.innerHTML = `       
      <div class="select">        
                <div class="div-redondo"> <h2 class="h2-redondo">${counter}</h2> </div>


                <div class="hands-div">  
                  <hands-el hand="piedra" type="${typesPiedra}" class="piedra"></hands-el>
                  <hands-el hand="papel"  type="${typesPapel}" class="papel"></hands-el>
                  <hands-el hand="tijera" type="${typesTijera}" class="tijera"></hands-el>
                 </div>
 </div>  
                 `;
            const piedraEl = this.querySelector(".piedra");
            const papelEl = this.querySelector(".papel");
            const tijeraEl = this.querySelector(".tijera");
            piedraEl?.addEventListener("click", () => {
                typesPiedra = "hand-grande";
                typesPapel = "hand-none";
                typesTijera = "hand-none";
                state_1.state.data.userChoice = "piedra";
            });
            papelEl?.addEventListener("click", () => {
                typesPiedra = "hand-none";
                typesPapel = "hand-grande";
                typesTijera = "hand-none";
                state_1.state.data.userChoice = "papel";
            });
            tijeraEl?.addEventListener("click", () => {
                typesPiedra = "hand-none";
                typesPapel = "hand-none";
                typesTijera = "hand-grande";
                state_1.state.data.userChoice = "tijera";
            });
            if (counter === 0) {
                // Detener el intervalo
                clearInterval(interval);
                state_1.state.updateRoom(state_1.state.data.roomIdRtadb, state_1.state.data.userID).then(() => {
                    router_1.Router.go("/selectend");
                });
            }
        }, 1000);
    }
}
exports.Selectonline = Selectonline;
customElements.define("selectonline-page", Selectonline);
