"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/nuevojuego", component: "nuevo-juego" },
    { path: "/ingresarsala", component: "ingresar-sala" },
    { path: "/ingresarnombre", component: "ingresar-nombre" },
    { path: "/comojugar", component: "como-jugar" },
    { path: "/comojugaronline", component: "como-jugaronline" },
    { path: "/select", component: "select-page" },
    { path: "/selectonline", component: "selectonline-page" },
    { path: "/selectend", component: "select-end" },
    { path: "/resultado", component: "resultado-page" },
    { path: "(.*)", redirect: "/" },
]);
