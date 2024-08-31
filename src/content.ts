console.log('Content script loaded');
const ythome = 'https://www.youtube.com';
const ytwatch='https://www.youtube.com/watch'
const ytresults='https://www.youtube.com/results'
const currentURL=window.location.href
console.log(currentURL,"cl")
const exData={
  whitelist:['https://www.youtube.com/@Mrwhosetheboss','https://www.youtube.com/@A2DChannel']
}
function filterVideos(){
    if (currentURL?.startsWith(ythome)) {
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

        //add btn
        function injectCustomButton() {
          const subSection=document.querySelector<HTMLElement>("#sections>:nth-child(2)")!
          const homeSub=subSection.querySelectorAll<HTMLAnchorElement>(".ytd-guide-section-renderer>a")
          homeSub.forEach((subs:HTMLAnchorElement)=>{
            subs.style.backgroundColor="red"
          })
          
        }
        injectCustomButton()
      }
      if(currentURL?.startsWith(ytwatch)){

      }if(currentURL?.startsWith(ytresults)){

      }
}
  // YouTube homepage dynamically loads content, so we need to monitor the DOM
const observer = new MutationObserver(filterVideos);
observer.observe(document.body, { childList: true, subtree: true });

// Run filtering immediately on page load
filterVideos();