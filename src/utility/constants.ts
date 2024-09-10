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

export function makebutton(customButton:HTMLButtonElement,a:HTMLAnchorElement){
    console.log(exData.whitelist,a,"mb")
  if (exData.whitelist.includes(a.href)) {
            customButton.classList.add("rmyt-btn");
            customButton.textContent = "-";
            console.log("rmbtn")
            customButton.addEventListener("click", function(this: HTMLButtonElement,e){
              e.stopPropagation();
              e.preventDefault();
              handleAction(this,a.href)
            });
          } else {
            customButton.classList.add("addyt-btn");
            customButton.textContent = "+";
            console.log("addbtn")
            customButton.addEventListener("click", function(this: HTMLButtonElement,e){
              e.stopPropagation();
              e.preventDefault();
              handleAction(this,a.href)
            });
          }
}
export function loadWhitelist() {
  chrome.storage.sync.get(['whitelist'], (result) => {
    exData.whitelist = result.whitelist || [];
    console.log('Loaded whitelist:', exData.whitelist);

  });
}