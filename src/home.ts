import { exData,loadWhitelist } from "./utility/constants";
import { sidebarChange } from "./sidebar";
// Load whitelist from chrome.storage.sync


export function home(){
console.log("homscript")
loadWhitelist()

function filterVideos(){
const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-channel-name.complex-string>a");

    nodeList.forEach((node: HTMLAnchorElement) => {
      if (!exData.whitelist.includes(node.href)) {
        const vidContainer: HTMLDivElement = node.closest(".ytd-rich-grid-renderer")!;
        vidContainer.style.display = "none";
      }
    });
    sidebarChange()
    console.log("sidecall")
}
    const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });
window.addEventListener("load",()=>{
  console.log("homdomloaded")
  filterVideos()
})

}