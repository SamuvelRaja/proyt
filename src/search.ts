console.log("search.js loaded!");
import { makebutton,loadWhitelist  } from "./utility/constants";


export function search(){


loadWhitelist()
    const customButton = document.createElement("button");
          window.addEventListener("load",()=>{
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor)
            watchSub?.appendChild(customButton)
          })
    
}