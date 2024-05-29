"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouter = void 0;
const welcome_1 = require("./pages/welcome");
const comojugar_1 = require("./pages/comojugar");
const select_1 = require("./pages/select");
const resultado_1 = require("./pages/resultado");
const select_end_1 = require("./pages/select-end");
const BASE_PATH = "/desafio5-piedrapapeltijera";
function isGithubPages() {
    return location.host.includes("lukebro82.github.io");
}
const routes = [
    {
        path: /\/welcome/,
        component: welcome_1.initWelcome,
    },
    {
        path: /\/comojugar/,
        component: comojugar_1.initComoJugar,
    },
    {
        path: /\/elegir/,
        component: select_1.initSelect,
    },
    {
        path: /\/versus/,
        component: select_end_1.initSelectEnd,
    },
    {
        path: /\/resultado/,
        component: resultado_1.initResultado,
    },
];
function initRouter(container) {
    function goTo(path) {
        const completePath = isGithubPages() ? BASE_PATH + path : path;
        history.pushState({}, "", completePath);
        handleRoute(completePath);
    }
    function handleRoute(route) {
        //    console.log("el handle Route recibio una nueva ruta y es", route);
        const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
        for (const r of routes) {
            if (r.path.test(newRoute)) {
                const el = r.component({ goTo: goTo });
                if (container.firstChild) {
                    container.firstChild.remove();
                }
                container.appendChild(el);
            }
        }
    }
    if (location.pathname == "/" ||
        location.pathname == "/desafio5-piedrapapeltijera/") {
        goTo("/welcome");
    }
    else {
        handleRoute(location.pathname);
    }
    window.onpopstate = function () {
        handleRoute(location.pathname);
    };
}
exports.initRouter = initRouter;
