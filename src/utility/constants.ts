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

export function makebutton(customButton:HTMLButtonElement,a:HTMLAnchorElement){
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
