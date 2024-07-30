import { state } from "../state";
import { Router } from "@vaadin/router";

export class Selectonline extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    state.data.userChoice = "papel";

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

        state.data.userChoice = "piedra";
      });

      papelEl?.addEventListener("click", () => {
        typesPiedra = "hand-none";
        typesPapel = "hand-grande";
        typesTijera = "hand-none";

        state.data.userChoice = "papel";
      });

      tijeraEl?.addEventListener("click", () => {
        typesPiedra = "hand-none";
        typesPapel = "hand-none";
        typesTijera = "hand-grande";

        state.data.userChoice = "tijera";
      });

      if (counter === 0) {
        // Detener el intervalo
        clearInterval(interval);
        state.updateRoom(state.data.roomIdRtadb, state.data.userID).then(() => {
          Router.go("/selectendonline");
        });
      }
    }, 1000);
  }
}

customElements.define("selectonline-page", Selectonline);
