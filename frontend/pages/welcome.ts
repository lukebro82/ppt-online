export function initWelcome(params) {
  const div = document.createElement("div");
  div.className = "welcome";
  div.innerHTML = `
  <h1 class="welcome-title">Piedra</h1>
  <h1 class="welcome-title">Papel</h1>
  <h1 class="welcome-title">Tijera</h1>
 
  <el-button class="empezar-button">Empezar</el-button>

  <div class="hands-div">  
  <hands-el hand="piedra" type="hand-img"></hands-el>
  <hands-el hand="papel"  type="hand-img"></hands-el>
  <hands-el hand="tijera" type="hand-img"></hands-el>
  </div>
  `;

  const startButtonEl = div.querySelector(".empezar-button");
  startButtonEl?.addEventListener("click", function () {
    params.goTo("/comojugar");
  });

  return div;
}
