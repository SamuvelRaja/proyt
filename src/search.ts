console.log("search.js loaded!");
import { makebutton,loadWhitelist  } from "./utility/constants";


loadWhitelist()
    const customButton = document.createElement("button");
          window.addEventListener("load",()=>{
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor)
            watchSub?.appendChild(customButton)
          })