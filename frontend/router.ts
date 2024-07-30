import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/nuevojuego", component: "nuevo-juego" },
  { path: "/ingresarsala", component: "ingresar-sala" },
  { path: "/ingresarnombre", component: "ingresar-nombre" },
  { path: "/comojugar", component: "como-jugar" },
  { path: "/playonline", component: "playonline-page" },
  { path: "/select", component: "select-page" },
  { path: "/selectonline", component: "selectonline-page" },
  { path: "/selectend", component: "select-end" },
  { path: "/selectendonline", component: "select-endonline" },
  { path: "/resultado", component: "resultado-page" },
  { path: "/resultadoonline", component: "resultadoonline-page" },
  { path: "(.*)", redirect: "/" },
]);
