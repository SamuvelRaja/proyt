import { watch } from "./watch";
import { search } from "./search";
import { home } from "./home";
import { channel } from "./channel";

function onUrlChange(url:string) {
  if (url.includes('watch')) {
    // YouTube watch page logic
    runWatchScript();
  } else if (url.includes('results')) {
    // YouTube search results page logic
    runSearchScript();
  }  else if (url.startsWith('https://www.youtube.com/@')) {
    // YouTube channel page logic
    runChannelScript();
  } else {
    // YouTube home page or others
    runHomeScript();
  }
}

function runWatchScript() {
  console.log('Running watch page script...');
  watch()
}

function runSearchScript() {
  console.log('Running search page script...');
  search()
}

function runHomeScript() {
  console.log('Running home page script...');
  home()
}
function runChannelScript() {
  console.log('Running channel page script...');
  channel()
}

// // MutationObserver to detect URL changes
// let lastUrl = location.href;
// new MutationObserver(() => {
//   const newUrl = location.href;
//   console.log(newUrl,"newwwwww")
//   if (newUrl !== lastUrl) {
//     lastUrl = newUrl;
//     onUrlChange(newUrl);
//   }
// }).observe(document, { subtree: true, childList: true });

// // Initial run on page load
// onUrlChange(location.href);
let lastUrl = location.href;
document.addEventListener('yt-navigate-finish', function() {
  
    const newUrl = location.href;
  console.log(newUrl,"newwwwww")
  if (newUrl !== lastUrl) {
    lastUrl = newUrl;
    onUrlChange(newUrl);
  }
   
    const subSection = document.querySelector<HTMLElement>("#sections>:nth-child(2)")!;
    const visibleSub = subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a");
  console.log(visibleSub,"content")
});


window.addEventListener("load",()=>{
  console.log("initialload")
  onUrlChange(location.href);
})