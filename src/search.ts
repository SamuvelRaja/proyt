import { makebutton, loadWhitelist } from "./utility/constants";

export function search() {
  
  function searchInit() {
    const customButton = document.createElement("button");
    window.addEventListener("load", () => {
      const watchSub = document.querySelector<HTMLDivElement>("#owner");
      const watchAnchor =
        document.querySelector<HTMLAnchorElement>("#owner a")!;
      makebutton(customButton, watchAnchor.href);
      watchSub?.appendChild(customButton);
    });
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
