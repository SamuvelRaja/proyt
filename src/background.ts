const ythome = 'https://www.youtube.com';
const ytwatch='https://www.youtube.com/watch'
const ytresults='https://www.youtube.com/results'

const exData={
  whitelist:['@Mrwhosetheboss','@A2DChannel']
}

chrome.action.onClicked.addListener(async (tab:chrome.tabs.Tab) => {
  if (tab?.url?.startsWith(ythome)) {
    const nodeList = document.querySelectorAll(".ytd-channel-name.complex-string>a");
    const feedList: HTMLAnchorElement[] = Array.from(nodeList) as HTMLAnchorElement[];
    feedList.forEach((node:HTMLAnchorElement)=>{
      console.log(node)
      if(!exData.whitelist.includes(node.href)){
        console.log(node.parentElement,node.parentElement?.closest(".ytd-rich-grid-renderer"))
      }
    })
  }
  if(tab?.url?.startsWith(ytwatch)){

  }if(tab?.url?.startsWith(ytresults)){

  }
  
});
