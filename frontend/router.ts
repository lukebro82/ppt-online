import { initWelcome } from "./pages/welcome";
import { initComoJugar } from "./pages/comojugar";
import { initSelect } from "./pages/select";
import { initResultado } from "./pages/resultado";
import { initSelectEnd } from "./pages/select-end";

const BASE_PATH = "/desafio5-piedrapapeltijera";

function isGithubPages() {
  return location.host.includes("lukebro82.github.io");
}

const routes = [
  {
    path: /\/welcome/,
    component: initWelcome,
  },
  {
    path: /\/comojugar/,
    component: initComoJugar,
  },
  {
    path: /\/elegir/,
    component: initSelect,
  },
  {
    path: /\/versus/,
    component: initSelectEnd,
  },
  {
    path: /\/resultado/,
    component: initResultado,
  },
];

export function initRouter(container: Element) {
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
  if (
    location.pathname == "/" ||
    location.pathname == "/desafio5-piedrapapeltijera/"
  ) {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
