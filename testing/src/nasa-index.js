import NasaController from "./nasa-controller.js";

const controller = new NasaController();

window.addEventListener("load", (e) => {controller.init();});