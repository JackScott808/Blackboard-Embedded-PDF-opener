chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: findAndOpenDoc
  });
});

function findAndOpenDoc() {
  // Get all iframes
  const iframes = document.querySelectorAll('iframe');
  
  // Look for iframes with relevant URLs
  for (const iframe of iframes) {
    const src = iframe.src;
    if (src && (
      src.includes('learn.ed.ac.uk/bbcswebdav') ||
      src.includes('basic-doc-viewer.eu.api.blackboard.com') ||
      src.includes('blackboard.com/ui') ||
      src.includes('/webapps/') ||
      src.includes('content-rid')
    )) {
      window.open(src, '_blank');
      return;
    }
  }

  // If no matching iframe found, log for debugging
  console.log('Available iframes:', iframes);
  alert('No document viewer found - check console for details');
}
