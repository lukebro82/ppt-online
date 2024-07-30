"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = void 0;
require("./router.ts");
require("./pages/comojugar.ts");
require("./pages/comojugaronline.ts");
require("./pages/nuevojuego.ts");
require("./pages/ingresarsala.ts");
require("./pages/ingresarnombre.ts");
require("./pages/resultado.ts");
require("./pages/select.ts");
require("./pages/select-end.ts");
require("./pages/welcome.ts");
require("./components/hands-el.ts");
require("./components/button-el.ts");
require("./components/score-el.ts");
require("./components/winlost-el.ts");
exports.API_BASE_URL = process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://chatroom-m2pt.onrender.com";
(function () { })();
