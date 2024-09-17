import { sidebarChange } from "./sidebar";
import {
  makebutton,
  loadWhitelist,
  getChannelBaseUrl,
} from "./utility/constants";

export function channel() {
  console.log("channelloaded");
  function channelInit() {
    const customButton = document.createElement("button");

    const watchSub = document.querySelector<HTMLDivElement>(
      ".yt-flexible-actions-view-model-wiz__action"
    )!;
    const FullUrl = window.location.href;
    const channelUrl = getChannelBaseUrl(FullUrl);

    makebutton(customButton, channelUrl);
    watchSub?.appendChild(customButton);
    watchSub.classList.add("proyt-watchsub")
    
    sidebarChange();
    console.log("sidecall");
  }
  async function loadWhitelistAndFilterVideos() {
    try {
      let lstate = await loadWhitelist();
      console.log("homdomloaded", lstate);
      channelInit(); // Call the function to filter videos
    } catch (error) {
      console.error("Failed to load whitelist:", error);
    }
  }

  loadWhitelistAndFilterVideos();
}
