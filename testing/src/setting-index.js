import SettingsController from "./setting-controller.js";

const controller = new SettingsController();

window.addEventListener("load", (e) => {controller.init();});