import { Router } from "@vaadin/router";

export class Comojugar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
<div class="comojugar-div">

<h2 class="comojugar-title">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h2>


<el-button class="jugar-button">¡Jugar!</el-button>


<div class="hands-div">  
   <hands-el hand="piedra" type="hand-img"></hands-el>
   <hands-el hand="papel"  type="hand-img"></hands-el>
   <hands-el hand="tijera" type="hand-img"></hands-el>
</div>

</div>
`;

    const jugarButtonEl = this.querySelector(".jugar-button");
    jugarButtonEl?.addEventListener("click", () => {
      Router.go("/select");
    });
  }
}

customElements.define("como-jugar", Comojugar);
