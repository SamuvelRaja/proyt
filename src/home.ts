import { exData,loadWhitelist } from "./utility/constants";
import { sidebarChange } from "./sidebar";
// Load whitelist from chrome.storage.sync


export function home(){


  console.log("homerun")
  const subSection = document.querySelector<HTMLElement>("#sections>:nth-child(2)")!;
    
    const visibleSub = subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a");
  console.log(visibleSub,"home")

loadWhitelist()

function filterVideos(){
const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-rich-grid-renderer .ytd-channel-name.complex-string>a");
    
    nodeList.forEach((node: HTMLAnchorElement) => {
      if (!exData.whitelist.includes(node.href)) {
        const vidContainer: HTMLDivElement = node.closest(".ytd-rich-grid-renderer")!;
        console.log(vidContainer,"homevid")
        vidContainer.style.display = "none";
      }
    });
    sidebarChange()
    console.log("sidecall")
}
    const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });

  console.log("homdomloaded")
  filterVideos()


}