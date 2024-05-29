"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
require("./components/hands-el");
require("./components/button-el");
require("./components/score-el");
require("./components/winlost-el");
(function () {
    const root = document.querySelector(".root");
    (0, router_1.initRouter)(root);
})();
