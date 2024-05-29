export function initComoJugar(params) {
  const div = document.createElement("div");
  div.className = "comojugar-div";
  div.innerHTML = `
      <h2 class="comojugar-title">Presioná jugar y elegí: <br> piedra, papel o tijera <br> antes de que <br> pasen los 5<br>segundos.</h2>


      <el-button class="jugar-button">¡Jugar!</el-button>


      <div class="hands-div">  
         <hands-el hand="piedra" type="hand-img"></hands-el>
         <hands-el hand="papel"  type="hand-img"></hands-el>
         <hands-el hand="tijera" type="hand-img"></hands-el>
      </div>

      `;

  const jugarButtonEl = div.querySelector(".jugar-button");
  jugarButtonEl?.addEventListener("click", () => {
    params.goTo("/elegir");
  });

  return div;
}
