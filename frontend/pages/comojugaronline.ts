import { state } from "../state";
import { Router } from "@vaadin/router";

export class Comojugaronline extends HTMLElement {
  connectedCallback() {
    this.comoJugar();
    this.render();

    state.onRtdb();
    state.subscribe(() => {
      this.render();
      this.comoJugar();
    });
  }
  comoJugar() {
    if (
      state.data.userReady == true &&
      state.data.rivalReady == true &&
      state.data.userOnline == true &&
      state.data.rivalOnline == true
    ) {
      state.data.userReady = false;
      Router.go("/selectonline");
    }
  }

  render() {
    this.innerHTML = `
<div class="comojugar-div">

<div class="comojugar-divsuperior">
   
  <div>

     <h2>${state.data.userName}:${state.data.userScore}</h2>
     ${
       state.data.rivalName != ""
         ? `<h2>${state.data.rivalName}:${state.data.rivalScore}</h2>`
         : ""
     }

  
  
    </div>
   
   <div>
    <h2>Sala:  ${state.data.roomId}</h2>
    </div>
    
</div>


${
  state.data.rivalOnline == false && state.data.userReady == false
    ? `<div class="comojugar-title"> Compartí el código <br> ${state.data.roomId} con tu contrincante </div>`
    : ""
}

${
  state.data.userReady == true &&
  state.data.rivalOnline == true &&
  state.data.rivalReady == false
    ? `<h2 class="comojugar-title">Esperando a que <br> ${state.data.rivalName} presione <br> ¡Jugar!...</h2>`
    : ``
}

${
  state.data.userReady == false && state.data.rivalOnline == true
    ? `<h2 class="comojugar-title">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h2>
       <el-button class="jugar-button">¡Jugar!</el-button>`
    : ``
}



<div class="hands-div">  
   <hands-el hand="piedra" type="hand-img"></hands-el>
   <hands-el hand="papel"  type="hand-img"></hands-el>
   <hands-el hand="tijera" type="hand-img"></hands-el>
</div>

</div>
`;

    const jugarButtonEl = this.querySelector(".jugar-button");
    jugarButtonEl?.addEventListener("click", async () => {
      state.data.userReady = true;
      state.updateRoom(state.data.roomIdRtadb, state.data.userID);
    });
  }
}

customElements.define("playonline-page", Comojugaronline);
