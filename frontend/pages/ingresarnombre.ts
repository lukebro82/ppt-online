import { Router } from "@vaadin/router";
import { state } from "../state";

export class IngresarNombre extends HTMLElement {
  connectedCallback() {
    this.render();

    const startButtonEl = this.querySelector(".nuevojuego-form");
    startButtonEl?.addEventListener("submit", function (e) {
      e.preventDefault();
      state.auth(e.target["nombre"].value).then((data) => {
        state.data.userName = e.target["nombre"].value;
        state.setUserId(data.id);
        Router.go("/ingresarsala");
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

customElements.define("ingresar-nombre", IngresarNombre);
