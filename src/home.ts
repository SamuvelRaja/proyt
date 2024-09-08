import { exData, loadStates, addYTList,removeYTList } from "./utility/constants";
import {  subState } from "./utility/types";


// Load whitelist from chrome.storage.sync
function loadWhitelist() {
  chrome.storage.sync.get(['whitelist'], (result) => {
    exData.whitelist = result.whitelist || [];
    console.log('Loaded whitelist:', exData.whitelist);

  });
}
loadWhitelist()

const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-channel-name.complex-string>a");

    nodeList.forEach((node: HTMLAnchorElement) => {
      if (!exData.whitelist.includes(node.href)) {
        const vidContainer: HTMLDivElement = node.closest(".ytd-rich-grid-renderer")!;
        vidContainer.style.display = "none";
      }
    });