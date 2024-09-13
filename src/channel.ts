import { sidebarChange } from "./sidebar";
import { makebutton,loadWhitelist,getChannelBaseUrl  } from "./utility/constants";

export function channel(){

  console.log("channelloaded")

  loadWhitelist()
    const customButton = document.createElement("button");
            
            const watchSub=document.querySelector<HTMLDivElement>(".yt-flexible-actions-view-model-wiz__action")!
            const FullUrl=window.location.href
            const channelUrl = getChannelBaseUrl(FullUrl)
            //tests
            makebutton(customButton,"channelUrl")
            watchSub?.appendChild(customButton)
            watchSub.classList.add('samjs')
            watchSub.style.border="1px solid yellow"
            console.log(channelUrl,customButton,watchSub,document.querySelector("H1.dynamic-text-view-model-wiz__h1"));
            //test end
            sidebarChange()
    console.log("sidecall")
}