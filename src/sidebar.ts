import { makebutton, loadStates } from "./utility/constants";
import { subState } from "./utility/types";
import { clearOldBtn } from "./utility/constants";


export function sidebarChange() {
  function sidebarInit(){
  // observer start
    function observeHidden(targetNode: HTMLElement, inject: (homeSub: NodeListOf<HTMLAnchorElement>, status: subState) => void) {
  const config: MutationObserverInit = {
    attributes: true,
    childList: false,
    subtree: false
  };

  const callback = (mutationsList: MutationRecord[]) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const expandableSub = targetNode.querySelectorAll<HTMLAnchorElement>("#expandable-items a")!;
        inject(expandableSub, loadStates.hiddensub);
      }
    }
  };

  const observer = new MutationObserver(callback);

  if (targetNode) {
    observer.observe(targetNode, config);
  } else {
    console.error("Target node not found");
  }
}
//observer end

    const subSection = document.querySelector<HTMLElement>("#sections>:nth-child(2)")!;
    
    
    const visibleSub = subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a");
    
    function injectCustomButton(homeSub: NodeListOf<HTMLAnchorElement>, state: subState) {
      console.log("injcall")
      if (homeSub && !state.state) {
        console.log("true injcall ")
        for (let i = 0; i < homeSub.length; i++) {
          const customButton = document.createElement("button");

          makebutton(customButton,homeSub[i].href)
          clearOldBtn(homeSub[i])
          homeSub[i].appendChild(customButton);

          if (i == homeSub.length - 3 && state.id == 1) {
            loadStates.homesub.state = true;
            break;
          } else if (i == homeSub.length - 2 && state.id == 2) {
            loadStates.hiddensub.state = true;
            break;
          }
        }

        const expandSub = subSection.querySelector("#expander-item");
        if (expandSub && !loadStates.hiddensub.state) {
          const targetNode: HTMLElement = subSection.querySelector('ytd-guide-collapsible-entry-renderer')!;
          observeHidden(targetNode, injectCustomButton);
        }
      }
    }

    injectCustomButton(visibleSub, loadStates.homesub);
  }
  const sidecon=document.querySelector<HTMLElement>("#contentContainer")
  console.log(sidecon?.getAttribute("opened"),"side op")
 if(sidecon?.getAttribute("opened")!==null){
  console.log("side op true")
  sidebarInit()
 }

}




