import { makebutton, loadWhitelist, clearOldBtn } from "./utility/constants";
import { sidebarChange } from "./sidebar";


export function watch() {
  console.log("watchrun");

  function watchInit() {
    const customButton = document.createElement("button");
    const watchSub = document.querySelector<HTMLDivElement>("#owner")!;
    const watchAnchor = document.querySelector<HTMLAnchorElement>("#owner a")!;
    makebutton(customButton, watchAnchor.href);
    clearOldBtn(watchSub)
    watchSub.appendChild(customButton);
    sidebarChange()
    console.log("sidecall",watchAnchor)
  }
  async function loadWhitelistAndFilterVideos() {
    try {
      let lstate = await loadWhitelist();
      console.log("homdomloaded", lstate);
      watchInit(); // Call the function to init
    } catch (error) {
      console.error("Failed to load whitelist:", error);
    }
  }

  loadWhitelistAndFilterVideos();
}
