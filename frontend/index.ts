import "./router.ts";
import "./pages/comojugar.ts";
import "./pages/comojugaronline.ts";
import "./pages/nuevojuego.ts";
import "./pages/ingresarsala.ts";
import "./pages/ingresarnombre.ts";
import "./pages/resultado.ts";
import "./pages/select.ts";
import "./pages/select-end.ts";
import "./pages/welcome.ts";
import "./pages/select-endonline.ts";
import "./pages/selectonline.ts";
import "./pages/resultadoonline.ts";
import "./components/hands-el.ts";
import "./components/button-el.ts";
import "./components/score-el.ts";
import "./components/scoreonline-el.ts";
import "./components/winlost-el.ts";

export const API_BASE_URL =
  process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://chatroom-m2pt.onrender.com";

(function () {})();
