console.log("watch.js loaded!");
import { makebutton } from "./utility/constants";

    const customButton = document.createElement("button");
          document.addEventListener("DOMContentLoaded",()=>{
            const watchSub=document.querySelector<HTMLDivElement>("#owner")
            const watchAnchor=document.querySelector<HTMLAnchorElement>("#owner a")!
            makebutton(customButton,watchAnchor)
            watchSub?.appendChild(customButton)
          })