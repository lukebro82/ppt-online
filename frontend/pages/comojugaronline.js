"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comojugaronline = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
class Comojugaronline extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
<div class="comojugar-div">

<div class="comojugar-divsuperior">
   
  <div>

     <h2>${state_1.state.data.userName}:${state_1.state.data.userScore}</h2>
     ${state_1.state.data.rivalName != ""
            ? `<h2>${state_1.state.data.rivalName}:${state_1.state.data.rivalScore}</h2>`
            : ""}

  
  
    </div>
   
   <div>
    <h2>Sala:  ${state_1.state.data.roomId}</h2>
    </div>
    
</div>


${state_1.state.data.rivalOnline == false
            ? `<div class="comojugar-title"> Compartí el código <br> ${state_1.state.data.roomId} con tu contrincante </div>`
            : ""}

${state_1.state.data.userReady == true &&
            state_1.state.data.rivalOnline == true &&
            state_1.state.data.rivalReady == false
            ? `<h2 class="comojugar-title">Esperando a que <br> ${state_1.state.data.rivalName} presione <br> ¡Jugar!...</h2>`
            : ``}

${state_1.state.data.userReady == false
            ? `<h2 class="comojugar-title">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h2>
       <el-button class="jugar-button">¡Jugar!</el-button>`
            : ``}


${state_1.state.data.userReady &&
            state_1.state.data.rivalReady &&
            state_1.state.data.userOnline &&
            state_1.state.data.rivalOnline
            ? router_1.Router.go("/selectonline")
            : ""}


<div class="hands-div">  
   <hands-el hand="piedra" type="hand-img"></hands-el>
   <hands-el hand="papel"  type="hand-img"></hands-el>
   <hands-el hand="tijera" type="hand-img"></hands-el>
</div>

</div>
`;
        const jugarButtonEl = this.querySelector(".jugar-button");
        jugarButtonEl?.addEventListener("click", () => {
            state_1.state.data.userReady = true;
            state_1.state.updateRoom(state_1.state.data.roomIdRtadb, state_1.state.data.userID);
        });
    }
}
exports.Comojugaronline = Comojugaronline;
customElements.define("como-jugaronline", Comojugaronline);
