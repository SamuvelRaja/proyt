console.log("watch.js loaded!");
import { makebutton,loadWhitelist  } from "./utility/constants";

export function watch(){


loadWhitelist()
    const customButton = document.createElement("button");
          window.addEventListener("load",()=>{
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor)
            watchSub?.appendChild(customButton)
          })
}