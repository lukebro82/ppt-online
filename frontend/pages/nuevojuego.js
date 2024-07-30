"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nuevojuego = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
class Nuevojuego extends HTMLElement {
    connectedCallback() {
        this.render();
        const startButtonEl = this.querySelector(".nuevojuego-form");
        startButtonEl?.addEventListener("submit", (e) => {
            e.preventDefault();
            state_1.state.auth(e.target["nombre"].value).then((data) => {
                state_1.state.setUserName(e.target["nombre"].value);
                state_1.state.setUserId(data.id);
                state_1.state.createRoom(state_1.state.data.userID, state_1.state.data.userName).then((r) => {
                    state_1.state.setRoomId(r.id);
                    state_1.state.data.roomIdRtadb = r.idLong;
                    state_1.state.getRoomData(state_1.state.data.roomIdRtadb).then(() => {
                        router_1.Router.go("/comojugaronline");
                    });
                });
            });
        });
    }
    render() {
        this.innerHTML = `
  <div class="welcome">
  
  <h1 class="welcome-title">Piedra</h1>
  <h1 class="welcome-title">Papel</h1>
  <h1 class="welcome-title">Tijera</h1>
 
  <form class="nuevojuego-form">
  <label class="nuevojuego-label">TU NOMBRE</label>
  <input class="nuevojuego-input" name="nombre" ></input>
  <el-button class="empezar-button">Ingresar</el-button>  
  </form>

  <div class="hands-div">  
  <hands-el hand="piedra" type="hand-img"></hands-el>
  <hands-el hand="papel"  type="hand-img"></hands-el>
  <hands-el hand="tijera" type="hand-img"></hands-el>
  </div>
  
  </div>
  `;
    }
}
exports.Nuevojuego = Nuevojuego;
customElements.define("nuevo-juego", Nuevojuego);
