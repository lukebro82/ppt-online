"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
class Home extends HTMLElement {
    connectedCallback() {
        this.render();
        const nuevoButtonEl = this.querySelector(".nuevo-button");
        nuevoButtonEl?.addEventListener("click", function () {
            router_1.Router.go("/nuevojuego");
        });
        const startButtonEl = this.querySelector(".empezar-button");
        startButtonEl?.addEventListener("click", function () {
            router_1.Router.go("/ingresarnombre");
        });
        const pruebaButtonEl = this.querySelector(".prueba-button");
        pruebaButtonEl?.addEventListener("click", async function () {
            state_1.state.data.userName = "ana";
            state_1.state.data.userID = "12kj3ñ32j1213j";
            state_1.state.data.roomIdRtadb = "pLrocuinKMMQWUuenPpTv";
            state_1.state.getRoomData(state_1.state.data.roomIdRtadb).then(() => {
                router_1.Router.go("/comojugaronline");
            });
        });
    }
    render() {
        this.innerHTML = `
  <div class="welcome">
  
  <h1 class="welcome-title">Piedra</h1>
  <h1 class="welcome-title">Papel</h1>
  <h1 class="welcome-title">Tijera</h1>
 
  <el-button class="nuevo-button">Nuevo Juego</el-button>
  <el-button class="empezar-button">Entrar a sala</el-button>
  <el-button class="prueba-button">Prueba</el-button>
  

  <div class="hands-div">  
  <hands-el hand="piedra" type="hand-img"></hands-el>
  <hands-el hand="papel"  type="hand-img"></hands-el>
  <hands-el hand="tijera" type="hand-img"></hands-el>
  </div>
  
  </div>
  `;
    }
}
exports.Home = Home;
customElements.define("home-page", Home);
