"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingresarsala = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
class Ingresarsala extends HTMLElement {
    connectedCallback() {
        this.render();
        const startButtonEl = this.querySelector(".nuevojuego-form");
        startButtonEl?.addEventListener("submit", function (e) {
            e.preventDefault();
            state_1.state.data.roomId = e.target["codigo"].value;
            console.log(e.target["codigo"].value);
            console.log(state_1.state.data);
            router_1.Router.go("/comojugar");
        });
    }
    render() {
        this.innerHTML = `
  <div class="welcome">
  
  <h1 class="welcome-title">Piedra</h1>
  <h1 class="welcome-title">Papel</h1>
  <h1 class="welcome-title">Tijera</h1>
 
  <form class="nuevojuego-form">
  <input class="nuevojuego-input" placeholder="Codigo" name="codigo"></input>
  <el-button class="empezar-button">Ingresar sala</el-button>  
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
exports.Ingresarsala = Ingresarsala;
customElements.define("ingresar-sala", Ingresarsala);
