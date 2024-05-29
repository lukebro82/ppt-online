import { state } from "./state";
import { initRouter } from "./router";
import "./components/hands-el";
import "./components/button-el";
import "./components/score-el";
import "./components/winlost-el";

(function () {
  const root = document.querySelector(".root");
  initRouter(root);
})();
