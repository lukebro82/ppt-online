import { Router } from "@vaadin/router";
import { state } from "../state";

export class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    const nuevoButtonEl = this.querySelector(".nuevo-button");
    nuevoButtonEl?.addEventListener("click", function () {
      Router.go("/nuevojuego");
    });

    const startButtonEl = this.querySelector(".empezar-button");
    startButtonEl?.addEventListener("click", function () {
      Router.go("/ingresarnombre");
    });

    const pruebaButtonEl = this.querySelector(".offline-button");
    pruebaButtonEl?.addEventListener("click", async function () {
      Router.go("/comojugar");
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
  <el-button class="offline-button">Off-Line</el-button>
  

  <div class="hands-div">  
  <hands-el hand="piedra" type="hand-img"></hands-el>
  <hands-el hand="papel"  type="hand-img"></hands-el>
  <hands-el hand="tijera" type="hand-img"></hands-el>
  </div>
  
  </div>
  `;
  }
}

customElements.define("home-page", Home);
