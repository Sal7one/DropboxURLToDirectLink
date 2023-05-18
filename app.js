const goBtn = document.getElementById('goBtn');
const newLinkText = document.getElementById('newLinkText');
const transformedLink = document.getElementById('transformedLink');
const originalLinkInput = document.getElementById('originalLink');

newLinkText.style.display = "none";
originalLinkInput.addEventListener("input", linkTyped);
goBtn.addEventListener("click", () => transformedLink.click());

function linkTyped() {
  const linkValue = originalLinkInput.value;
  if (linkValue.length > 11) {
    const newLink = transformDropboxLink(linkValue);
    if (newLink === "error") {
      disableStuff("Bad Link provided...");
      transformedLink.innerText = newLink;
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
}

function enableStuff(newLink) {
  newLinkText.innerText = "New Link";
  newLinkText.style.display = "inline";
  transformedLink.href = newLink;
  transformedLink.innerText = newLink;
  goBtn.disabled = false;
}

function transformDropboxLink(link) {
  try {
    const cleanedLink = link.toLowerCase();
    const dropboxIndex = cleanedLink.indexOf("dropbox.com");
    if (dropboxIndex === -1)
      throw new Error('Invalid Link');

    const trimmedLink = link.substring(dropboxIndex);
    const url = new URL(`https://${trimmedLink}`);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    const transformedLink = `https://dl.dropboxusercontent.com${url.pathname.substring(0, url.pathname.lastIndexOf('/'))}/${fileName}`;
    return transformedLink;
  } catch (error) {
    console.error(error);
    return "error";
  }
}
