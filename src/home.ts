import { exData} from "./utility/constants";
import { sidebarChange } from "./sidebar";

// Load whitelist from chrome.storage.sync
function loadWhitelist() {
  chrome.storage.sync.get(['whitelist'], (result) => {
    exData.whitelist = result.whitelist || [];
    console.log('Loaded whitelist:', exData.whitelist);

  });
}
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
}
    const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });

// window.addEventListener('load', () => {
//   sidebarChange()
// })