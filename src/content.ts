
const ythome = 'https://www.youtube.com/';
const ytwatch='https://www.youtube.com/watch'
const ytresults='https://www.youtube.com/results'
const currentURL=window.location.href

type extstate = {
  homesub:boolean,
  hiddensub:boolean
}

const loadStates:extstate={
  homesub:false,
  hiddensub:false
}
console.log('Content script loaded',currentURL==ythome);
const exData={
  whitelist:['https://www.youtube.com/@Mrwhosetheboss','https://www.youtube.com/@A2DChannel']
}
function filterVideos(){
    if (currentURL==ythome) {
        const shorts:HTMLDivElement|null=document.querySelector(".ytd-rich-section-renderer")
          if(shorts){
            console.log(shorts,"srs")
            shorts.style.display="none"
          }
        const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-channel-name.complex-string>a");
        
        nodeList.forEach((node:HTMLAnchorElement)=>{
          if(!exData.whitelist.includes(node.href)){
            const vidContainer:HTMLDivElement=node.closest(".ytd-rich-grid-renderer")!
            vidContainer.style.display="none"
          }
        })
        const subSection=document.querySelector<HTMLElement>("#sections>:nth-child(2)")!
        const visibleSub=subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a")
      function injectCustomButton(homeSub:NodeListOf<HTMLAnchorElement>,state:boolean) {
          
          if (homeSub&&!state) {
            for (let i = 0; i < homeSub.length-2; i++) {
              const customButton = document.createElement("button");
              customButton.textContent = "+";
              customButton.classList.add("addyt-btn");
              homeSub[i].appendChild(customButton);
              if(i==homeSub.length-3){
                loadStates.homesub=true
              }
            }
            const expandSub=subSection.querySelector("#expander-item")
            if(expandSub&&!loadStates.hiddensub){
              const targetNode: HTMLElement  = subSection.querySelector('ytd-guide-collapsible-entry-renderer')!;
              observehidden(targetNode, injectCustomButton)
              loadStates.hiddensub=true
            }
          }
        }

        function observehidden(targetNode:HTMLElement,inject:(homessub:NodeListOf<HTMLAnchorElement>,status:boolean)=>void){
                  const config: MutationObserverInit = {
                      attributes: true,  // Observe attribute changes
                      childList: false,  // Don't observe changes to child elements
                      subtree: false     // Don't observe descendants
                  };

                  // Callback function to execute when mutations are observed
                  const callback = (mutationsList: MutationRecord[]) => {
                      for (let mutation of mutationsList) {
                          if (mutation.type === 'attributes') {
                              console.log(`The ${mutation.attributeName} attribute was modified.`);
                              const expandableSub=targetNode.querySelectorAll<HTMLAnchorElement>("#expandable-items a")!
                              console.log(expandableSub,"exp")
                              inject(expandableSub,loadStates.hiddensub)
                          }
                      }
                  };

                  // Create an instance of MutationObserver and pass in the callback function
                  const observer = new MutationObserver(callback);

                  // Make sure targetNode is defined as an HTMLElement
                  

                  if (targetNode) {
                      // Start observing the target node for configured mutations
                      observer.observe(targetNode, config);
                  } else {
                      console.error("Target node not found");
                  }
        }

        injectCustomButton(visibleSub,loadStates.homesub)
        
      }
      if(currentURL?.startsWith(ytwatch)){

      }if(currentURL?.startsWith(ytresults)){

      }
}

   //add btn
        
  // YouTube homepage dynamically loads content, so we need to monitor the DOM
const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });

// Run filtering immediately on page load
filterVideos();