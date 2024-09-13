
import { makebutton,loadWhitelist  } from "./utility/constants";

export function watch(){


  console.log("watchrun")

loadWhitelist()
    const customButton = document.createElement("button");
  
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor.href)
            watchSub?.appendChild(customButton)
      
}