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
        const nodeList = document.querySelectorAll(".ytd-channel-name.complex-string>a");
        const feedList: HTMLAnchorElement[] = Array.from(nodeList) as HTMLAnchorElement[];
        feedList.forEach((node:HTMLAnchorElement)=>{
          console.log(node,node.href,!exData.whitelist.includes(node.href),"am")
          if(!exData.whitelist.includes(node.href)){
            console.log(node.parentElement,node.closest(".ytd-rich-grid-renderer"),"rm")
            const vidContainer:HTMLDivElement=node.closest(".ytd-rich-grid-renderer")!
            vidContainer.style.display="none"
          }
        })
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