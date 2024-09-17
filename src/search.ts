import { makebutton, loadWhitelist,clearOldBtn } from "./utility/constants";
import { sidebarChange } from "./sidebar";

export function search() {
  
  function searchInit() {
    
    
      const watchAtags =document.querySelectorAll<HTMLAnchorElement>("#main-link")!;
      watchAtags.forEach((watchAnchor)=>{
      const customButton = document.createElement("button");
      const watchSub = watchAnchor.parentElement!;
      makebutton(customButton, watchAnchor.href);
      watchSub.style.alignItems="center"
      customButton.style.marginBottom="16px"
      clearOldBtn(watchSub)
      watchSub.appendChild(customButton);
      })
     

    sidebarChange()
    console.log("sidecall")
  }
  async function loadWhitelistAndFilterVideos() {
    try {
      let lstate = await loadWhitelist();
      console.log("homdomloaded", lstate);
      searchInit(); // Call the function to filter videos
    } catch (error) {
      console.error("Failed to load whitelist:", error);
    }
  }

  loadWhitelistAndFilterVideos();
}
