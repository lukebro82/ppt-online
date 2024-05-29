const resultados = {
  Ganaste: require("url:../images/ganaste.svg"),
  Empate: require("url:../images/empate.png"),
  Perdiste: require("url:../images/perdiste.svg"),
};

class WinLost extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();

    const style = document.createElement("style");
    style.innerHTML = `
      
    .estrella {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
      }
      
      .imagen {
        position: relative;
        z-index: 0;
      }
      
      .texto {
        font-size: 45px;
        text-shadow: 0 0 8px black;
        color: white;
        padding: 0px;
        margin: 0px;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
        `;
    this.render();
    this.shadow.appendChild(style);
  }

  render() {
    const handAttr: any = this.getAttribute("resultado");

    this.shadow.innerHTML = `
    <div class="estrella">
    <img class="imagen" src="${resultados[handAttr]}">
    <h1 class="texto">${handAttr}</h1>
  </div>
          `;
  }
}

customElements.define("winlost-el", WinLost);
