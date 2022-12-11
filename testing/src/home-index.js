import HomeController from "./home-controller.js";

const controller = new HomeController();

window.addEventListener("load", (e) => {controller.init();});