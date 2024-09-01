
const ythome = 'https://www.youtube.com/';
const ytwatch='https://www.youtube.com/watch'
const ytresults='https://www.youtube.com/results'
const currentURL=window.location.href

type subState={
  state:boolean,
  id:number
}
type extstate = {
  homesub:subState,
  hiddensub:subState
}

const loadStates:extstate={
  homesub:{
    state:false,
    id:1
  },
  hiddensub:{
    state:false,
    id:2
  }
}
console.log('Content script loaded',currentURL==ythome);
const exData={
  whitelist:['https://www.youtube.com/@Mrwhosetheboss','https://www.youtube.com/@A2DChannel']
}
function filterVideos(){
    if (currentURL==ythome) {
        
        const nodeList = document.querySelectorAll<HTMLAnchorElement>(".ytd-channel-name.complex-string>a");
        
        nodeList.forEach((node:HTMLAnchorElement)=>{
          if(!exData.whitelist.includes(node.href)){
            const vidContainer:HTMLDivElement=node.closest(".ytd-rich-grid-renderer")!
            vidContainer.style.display="none"
          }
        })
        const subSection=document.querySelector<HTMLElement>("#sections>:nth-child(2)")!
        const visibleSub=subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer a")
      function injectCustomButton(homeSub:NodeListOf<HTMLAnchorElement>,state:subState) {
          console.log("inj",homeSub, homeSub&&!state.state,state,loadStates.hiddensub)
          if (homeSub&&!state.state) {
            console.log("injsuccess")
            for (let i = 0; i < homeSub.length; i++) {
              const customButton = document.createElement("button");
              
              
              // Store data using chrome.storage.sync
              
              if(homeSub[i].href=="https://www.youtube.com/@Mrwhosetheboss"){
                customButton.classList.add("rmyt-btn");
                customButton.textContent = "-";
                customButton.addEventListener("click",(e)=>{
                   e.stopPropagation(); // Stops event from reaching the parent <a>
                    e.preventDefault()
                  removeYTList();
                });
              }else{
                customButton.classList.add("addyt-btn");
                customButton.textContent = "+";
                customButton.addEventListener("click",(e)=>{
                  e.stopPropagation()
                  e.preventDefault()
                  addYTList()
                })
              }

              homeSub[i].appendChild(customButton);
              if(i==homeSub.length-3&&state.id==1){
                loadStates.homesub.state=true
                break;
              }else if(i==homeSub.length-2&&state.id==2){
                loadStates.hiddensub.state=true
                break;
              }
            }
            const expandSub=subSection.querySelector("#expander-item")
            if(expandSub&&!loadStates.hiddensub.state){
              const targetNode: HTMLElement  = subSection.querySelector('ytd-guide-collapsible-entry-renderer')!;
              observehidden(targetNode, injectCustomButton)
              
            }
          }
        }

        

        injectCustomButton(visibleSub,loadStates.homesub)
        
      }
      if(currentURL?.startsWith(ytwatch)){

      }if(currentURL?.startsWith(ytresults)){

      }
}

  // hidden observer
  function observehidden(targetNode:HTMLElement,inject:(homessub:NodeListOf<HTMLAnchorElement>,status:subState)=>void){
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
                              
                              inject(expandableSub,loadStates.hiddensub)
                                console.log("hidden toggled")
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

    //add btn handlers
    function addYTList(){
        console.log("addlist")
    }
    //remove event handler
    function removeYTList(){
        console.log("removelist")
    }
        
  // YouTube homepage dynamically loads content, so we need to monitor the DOM
const observer = new MutationObserver(filterVideos);
observer.observe(document.querySelector("#contents")!, { childList: true, subtree: true });

// Run filtering immediately on page load
filterVideos();