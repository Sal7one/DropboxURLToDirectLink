const goBtn = document.getElementById('goBtn');
const copyBtn = document.getElementById('copyBtn');
const newLinkText = document.getElementById('newLinkText');
const transformedLink = document.getElementById('transformedLink');
const originalLinkInput = document.getElementById('originalLink');

newLinkText.style.display = "none";
originalLinkInput.addEventListener("input", linkTyped);
goBtn.addEventListener("click", () => transformedLink.click());
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(transformedLink.href)
      .then(() => {
        console.log("All good");
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
});

function linkTyped() {
  const linkValue = originalLinkInput.value;
  if (linkValue.length > 11) {
    const newLink = transformDropboxLink(linkValue);
    if (newLink === "error") {
      disableStuff();
      transformedLink.innerText = "Bad or incomplete Link provided...";
      return;
    }
    enableStuff(newLink);
    return;
  }
  disableStuff();
}

function disableStuff() {
  newLinkText.style.display = "none";
  goBtn.disabled = true;
  copyBtn.disabled = true;
}

function enableStuff(newLink) {
  newLinkText.innerText = "New Link";
  newLinkText.style.display = "inline";
  transformedLink.href = newLink;
  transformedLink.innerText = newLink;
  goBtn.disabled = false;
  copyBtn.disabled = false;
}

function transformDropboxLink(link) {
  try {
    const cleanedLink = link.toLowerCase();
    const dropboxIndex = cleanedLink.indexOf("dropbox.com");
    if (dropboxIndex === -1)
      throw new Error('Invalid Link');

    const trimmedLink = link.substring(dropboxIndex);
    const completeURL = `https://${trimmedLink}`.replaceAll(" ", "");
    const url = new URL(completeURL);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    if(fileName.length < 5) 
      throw new Error('Invalid Link');

    const transformedLink = `https://dl.dropboxusercontent.com${url.pathname.substring(0, url.pathname.lastIndexOf('/'))}/${fileName}`;
    return transformedLink;
  } catch (error) {
    console.error(error);
    return "error";
  }
}
