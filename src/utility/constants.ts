import { extstate } from "./types";

export let exData = {
  whitelist: [] as string[]
};


export const loadStates: extstate = {
  homesub: {
    state: false,
    id: 1
  },
  hiddensub: {
    state: false,
    id: 2
  }
};

export function addYTList(channelUrl: string) {
  if (!exData.whitelist.includes(channelUrl)) {
    exData.whitelist.push(channelUrl);
    saveWhitelist();
    console.log("Channel added to whitelist!");
  } else {
    console.log("Channel is already whitelisted!");
  }
}

// Remove a channel from the whitelist
export function removeYTList(channelUrl: string) {
  const index = exData.whitelist.indexOf(channelUrl);
  if (index > -1) {
    exData.whitelist.splice(index, 1);
    saveWhitelist();
    console.log("Channel removed from whitelist!");
  } else {
    console.log("Channel is not in the whitelist!");
  }
}

export function saveWhitelist() {
  chrome.storage.sync.set({ whitelist: exData.whitelist }, () => {
    console.log('Whitelist saved:', exData.whitelist);
  });
}
function handleAction(customButton:HTMLButtonElement|null,a:string){
  console.log(customButton?.classList)
  if(customButton?.classList.contains("rmyt-btn")){
              customButton.classList.remove("rmyt-btn")
              console.log(customButton.removeEventListener)
              customButton.classList.add("addyt-btn");
            customButton.textContent = "+";
              removeYTList(a);
  }else if(customButton?.classList.contains("addyt-btn")){
    customButton.classList.remove("addyt-btn")
              customButton.classList.add("rmyt-btn");
            customButton.textContent = "-";
            addYTList(a);
  }
}

export function makebutton(customButton:HTMLButtonElement,href:string){
    console.log(exData.whitelist,href,exData.whitelist.includes(href),"mb")
  if (exData.whitelist.includes(href)) {
            customButton.classList.add("rmyt-btn");
            customButton.textContent = "-";
            console.log("rmbtn")
            customButton.addEventListener("click", function(this: HTMLButtonElement,e){
              e.stopPropagation();
              e.preventDefault();
              handleAction(this,href)
            });
          } else {
            customButton.classList.add("addyt-btn");
            customButton.textContent = "+";
            console.log("addbtn")
            customButton.addEventListener("click", function(this: HTMLButtonElement,e){
              e.stopPropagation();
              e.preventDefault();
              handleAction(this,href)
            });
          }
}
export function loadWhitelist() {
  console.log("Runningwhitelist")
  return  new Promise((resolve) => {
      chrome.storage.sync.get(['whitelist'], (result) => {
        exData.whitelist = result.whitelist || [];
        console.log('Loaded whitelist:', exData.whitelist);
        resolve(true);
      });
    });

}

export function getChannelBaseUrl(fullUrl:string) {
  const channelPattern = /^(https:\/\/www\.youtube\.com\/@[\w\d_-]+)/;
  const match = fullUrl.match(channelPattern);

  if (match && match[1]) {
    return match[1];  // Return the base channel URL
  } else {
    return fullUrl;  // If it's not a channel URL, return the original URL
  }
}