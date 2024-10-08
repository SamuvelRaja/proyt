import { exData,loadWhitelist } from "./utility/constants";
import { sidebarChange } from "./sidebar";
// Load whitelist from chrome.storage.sync


export function home(){


  
  const subSection = document.querySelector<HTMLElement>("#sections>:nth-child(2)")!;
    
    const visibleSub = subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a");
  console.log(visibleSub,"home")


function filterVideos(){
const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-rich-grid-renderer .ytd-channel-name.complex-string>a");
    console.log(nodeList)
    nodeList.forEach((node: HTMLAnchorElement) => {
      console.log("nodelist true")
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

  console.log("homerun")
async function loadWhitelistAndFilterVideos() {
  try {
    let lstate =await loadWhitelist();
    console.log("homdomloaded",lstate);
    filterVideos();  // Call the function to filter videos
  } catch (error) {
    console.error('Failed to load whitelist:', error);
  }
}

loadWhitelistAndFilterVideos();

}