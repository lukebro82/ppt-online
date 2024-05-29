class ButtonEl extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.innerHTML = `
    .root{
          width: 330px;
          height: 80px;
          border-style: solid; 
          border-radius: 10px;          
          border-width: 10px;
          background-color:#006CFC;
          border-color: #001997;
          font-size: 45px;
          font-family: "Work Sans", sans-serif;
          color: white;
         }`;

    this.shadow.appendChild(style);
    this.render();
  }

  render() {
    const buttonEl = document.createElement("button");
    buttonEl.textContent = this.textContent;
    buttonEl.className = "root";
    this.shadow.appendChild(buttonEl);
  }
}

customElements.define("el-button", ButtonEl);
