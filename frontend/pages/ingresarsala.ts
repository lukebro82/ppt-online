import { Router } from "@vaadin/router";
import { state } from "../state";
import Swal from "sweetalert2";

export class Ingresarsala extends HTMLElement {
  connectedCallback() {
    this.render();

    const startButtonEl = this.querySelector(".nuevojuego-form");
    startButtonEl?.addEventListener("submit", function (e) {
      e.preventDefault();
      state.data.roomId = e.target["codigo"].value;
      state.getRoomId(state.data.userID, state.data.roomId).then((res) => {
        state.data.roomIdRtadb = res.rtdbRoomId;
        state
          .joinRoom(
            state.data.roomIdRtadb,
            state.data.userID,
            state.data.userName
          )
          .then((res) => {
            if (res.message == "room lleno") {
              Swal.fire({
                icon: "error",
                title: "El Room esta lleno!",
                confirmButtonColor: "#9CBBE9",
              });
            } else {
              state.getRoomData(state.data.roomIdRtadb).then(() => {
                Router.go("/playonline");
              });
            }
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

customElements.define("ingresar-sala", Ingresarsala);
