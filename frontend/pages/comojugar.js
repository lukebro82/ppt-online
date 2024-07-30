"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comojugar = void 0;
const router_1 = require("@vaadin/router");
class Comojugar extends HTMLElement {
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
            router_1.Router.go("/select");
        });
    }
}
exports.Comojugar = Comojugar;
customElements.define("como-jugar", Comojugar);
