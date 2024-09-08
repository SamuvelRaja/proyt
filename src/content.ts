const ythome = 'https://www.youtube.com/';
const ytwatch = 'https://www.youtube.com/watch';
const ytresults = 'https://www.youtube.com/results';
const currentURL = window.location.href;
import { exData, loadStates, addYTList,removeYTList } from "./utility/constants";
import {  subState } from "./utility/types";



// Placeholder for whitelist data


// Load whitelist from chrome.storage.sync
function loadWhitelist() {
  chrome.storage.sync.get(['whitelist'], (result) => {
    exData.whitelist = result.whitelist || [];
    console.log('Loaded whitelist:', exData.whitelist);
    filterVideos();
  });
}



function makebutton(customButton:HTMLButtonElement,a:HTMLAnchorElement){
  if (exData.whitelist.includes(a.href)) {
            customButton.classList.add("rmyt-btn");
            customButton.textContent = "-";
            customButton.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              removeYTList(a.href);
              customButton.classList.remove("rmyt-btn")
              customButton.classList.add("addyt-btn");
            customButton.textContent = "+";
            });
          } else {
            customButton.classList.add("addyt-btn");
            customButton.textContent = "+";
            customButton.addEventListener("click", (e) => {
              e.stopPropagation();
              e.preventDefault();
              addYTList(a.href);
              customButton.classList.remove("addyt-btn")
              customButton.classList.add("rmyt-btn");
            customButton.textContent = "-";
            });
          }
}

console.log('Content script loaded', currentURL == ythome);

// Function to filter videos on the homepage based on the whitelist
function filterVideos() {
  if (currentURL == ythome) {
    

    const subSection = document.querySelector<HTMLElement>("#sections>:nth-child(2)")!;
    const visibleSub = subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a");

    function injectCustomButton(homeSub: NodeListOf<HTMLAnchorElement>, state: subState) {
      if (homeSub && !state.state) {
        for (let i = 0; i < homeSub.length; i++) {
          const customButton = document.createElement("button");

          makebutton(customButton,homeSub[i])

          homeSub[i].appendChild(customButton);

          if (i == homeSub.length - 3 && state.id == 1) {
            loadStates.homesub.state = true;
            break;
          } else if (i == homeSub.length - 2 && state.id == 2) {
            loadStates.hiddensub.state = true;
            break;
          }
        }

        const expandSub = subSection.querySelector("#expander-item");
        if (expandSub && !loadStates.hiddensub.state) {
          const targetNode: HTMLElement = subSection.querySelector('ytd-guide-collapsible-entry-renderer')!;
          observeHidden(targetNode, injectCustomButton);
        }
      }
    }

    injectCustomButton(visibleSub, loadStates.homesub);
  }
console.log("oyw",currentURL,ytwatch)
  if (currentURL?.startsWith(ytwatch)) {
    // Implement specific watch page logic if needed
    

    const customButton = document.createElement("button");
          document.addEventListener("DOMContentLoaded",()=>{
            console.log("yw",currentURL,ytwatch)
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor)
            watchSub?.appendChild(customButton)
          })
          
  }

  if (currentURL?.startsWith(ytresults)) {
    // Implement specific results page logic if needed
  }
}

// MutationObserver to monitor hidden sections
function observeHidden(targetNode: HTMLElement, inject: (homeSub: NodeListOf<HTMLAnchorElement>, status: subState) => void) {
  const config: MutationObserverInit = {
    attributes: true,
    childList: false,
    subtree: false
  };

  const callback = (mutationsList: MutationRecord[]) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const expandableSub = targetNode.querySelectorAll<HTMLAnchorElement>("#expandable-items a")!;
        inject(expandableSub, loadStates.hiddensub);
      }
    }
  };

  const observer = new MutationObserver(callback);

  if (targetNode) {
    observer.observe(targetNode, config);
  } else {
    console.error("Target node not found");
  }
}

// Add a channel to the whitelist




// Run filtering immediately on page load after loading the whitelist
loadWhitelist();

const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });
