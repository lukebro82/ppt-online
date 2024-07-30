import { state } from "../state";

class ScoreElonline extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");

    style.innerHTML = `
      .score {
        font-family: "Work Sans", sans-serif;
        width: 250px;
        height: 215px;
        border: solid;
        border-color: black;
        border-radius: 15px;
        border-width: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        }

        .textoh1{
           font-size: 40px;
        }

        .div-score{
          display: flex;
          flex-direction: column;
          align-items: end;
        }
        
        .textoh2 {
          font-family: "Work Sans", sans-serif;
          margin:0;  
        }

        `;

    this.shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const userName = state.data.userName;
    const rivalName = state.data.rivalName;
    const userScore = state.data.userScore;
    const rivalScore = state.data.rivalScore;
    const scoreEl = document.createElement("div");
    scoreEl.className = "score";
    scoreEl.innerHTML = `
    <h1 class="textoh1">SCORE</h1>
    <div class="div-score"><h1 class="textoh2">${userName}: ${userScore}</h1> 
          <h1 class="textoh2">${rivalName}: ${rivalScore}</h1>
    </div>
   
       `;
    this.shadow.appendChild(scoreEl);
  }
}

customElements.define("scoreonline-el", ScoreElonline);
