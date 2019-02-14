chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log('Hello. This message was sent from scripts/inject.js');

    }
  }, 10);
});

// Set reddit search bar text to val
function setRedditSearchBar(val) {
  let headerSearch = document.getElementById('header-search-bar');
  headerSearch.setAttribute('placeholder', val);
  //console.log(headerSearch)
}

//listen for message from browser_action
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    setRedditSearchBar(request.value);
    resetPage();
  });

function replaceImages(max) {
  let images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    let random = Math.random();
      if (random > 0.5){
      images[i].src = 'https://media1.tenor.com/images/0e92a52dd3bdd7d6c2c17b9d2a45e1a3/tenor.gif?itemid=11675089';

      images[i].style.animation = `shake ${random}s`;
      images[i].style.animationIterationCount ='infinite';
      }
  }
}

function insertRandomImg(num) {
  for (let i = 0; i < num; i++) {
    let random = Math.random();
    let x = Math.floor(Math.random()*document.documentElement.clientWidth)
    let y = Math.floor(Math.random()*document.documentElement.clientHeight)
    let image = document.createElement('img');
    image.src = 'https://media1.tenor.com/images/0e92a52dd3bdd7d6c2c17b9d2a45e1a3/tenor.gif?itemid=11675089';
    image.setAttribute('style', `animation: shake ${random}s infinite; position: absolute; top: ${y}px; left: ${x}px; z-index: 999;`)
    imgDiv.appendChild(image);
  }
}

// Break the page based on hunger levels
function breakShit(hungerLevel) {
  if (hungerLevel > 5 && hungerLevel < 10) {
    setRedditSearchBar("I could use a snack");
  } else if (hungerLevel > 9 && hungerLevel < 17) {
    setRedditSearchBar("HEY! I'm hungryyyy!");
    replaceImages(10);
    insertRandomImg(1);
  } else if (hungerLevel > 17) {
    setRedditSearchBar("FEED ME NOW!!!!!!!!");
    replaceImages(5);
    insertRandomImg(3);
  }
}

function resetPage() {
  location.reload();
//   while (imgDiv.firstChild) {
//     imgDiv.removeChild(imgDiv.firstChild);
// }
}
// let newImage = document.createElement('img');
// newImage.src = "http://www.clker.com/cliparts/5/2/7/a/15161488931682472222ugly-monster-clipart.hi.png";
// newImage.setAttribute('style', 'position:absolute; top:0; left:0; z-index: 999;');
// console.log('TCL: newImage', newImage)

// document.getElementsByTagName('body').item(0).appendChild(newImage)

function refresh(){
  chrome.storage.sync.get(['lastFed'], (items) => {
    breakShit(getHungerLevel(items.lastFed));



    setTimeout(refresh, 5000);
  });
}

setTimeout(refresh, 5000);


imgDiv = document.createElement('div');
imgDiv.setAttribute('id', 'imgDiv');
document.getElementsByTagName('body').item(0).appendChild(imgDiv);



function loopAndReplaceText(){
  var elements = document.getElementsByTagName('*');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

       if (node.nodeType === 3) {
          var text = node.nodeValue;
          var replacedText = text.replace(/\w+?\b/gi, 'FOOD ');
          if (replacedText !== text) {
              element.replaceChild(document.createTextNode(replacedText), node);
          }
      }
    }
  }
}
