
function sendMSG(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {value:"Search Reddit - Thanks for food =)"}, function(response){

    });
});
}

// Feeds the monster (Sets hunger to 0, sets lastFed date/time)
function feedMonster() {
  let today = new Date();
  console.log(JSON.stringify(today));
  chrome.storage.sync.set({ lastFed: JSON.stringify(today), hunger: 0 });

  sendMSG();
}


// Reset all monster values. (lastFed - null, happiness - 50, hunger - 50)
function resetVals(){

  chrome.storage.sync.set(
    {lastFed: null, happiness: 50, hunger: 50}
  );
}

function getHungerLevel(lastFed) {
  let now = new Date();
  let fed = new Date(JSON.parse(lastFed));
  let diff = now - fed;
  return diff/1000;
}

function showNom(hungerLevel) {
  console.log('shownom')
  let nomImg = document.getElementById('om-nom');
  let candyImg = document.getElementById('candy');
  let body = document.querySelector('#main-popup');

  if (hungerLevel < 3) {
    if (nomImg.src != 'https://media1.tenor.com/images/1c28530a936fe9d5e335387de3aeee34/tenor.gif?itemid=7592257')
      nomImg.src = 'https://media1.tenor.com/images/1c28530a936fe9d5e335387de3aeee34/tenor.gif?itemid=7592257'
    nomImg.style.width = '250px';
  } else if (hungerLevel < 10) {
    if (nomImg.src != 'https://media1.tenor.com/images/807f1c4353d720f994b19150791012a3/tenor.gif?itemid=12563236')
      nomImg.src = 'https://media1.tenor.com/images/807f1c4353d720f994b19150791012a3/tenor.gif?itemid=12563236'
    nomImg.style.width = '250px';
  } else if (hungerLevel < 18) {
    if (nomImg.src != 'https://media1.tenor.com/images/0e92a52dd3bdd7d6c2c17b9d2a45e1a3/tenor.gif?itemid=11675089')
      nomImg.src = 'https://media1.tenor.com/images/0e92a52dd3bdd7d6c2c17b9d2a45e1a3/tenor.gif?itemid=11675089';
    nomImg.style.width = '300px';
  } else if (hungerLevel > 18) {
    if (nomImg.src != 'https://media1.tenor.com/images/f3810588b271f74d6ee7fcc556a924fe/tenor.gif?itemid=12563608')
      nomImg.src = 'https://media1.tenor.com/images/f3810588b271f74d6ee7fcc556a924fe/tenor.gif?itemid=12563608';
    nomImg.style.width = '500px';
  }
}


// Render monster values to pop-up
function renderVals(){
  chrome.storage.sync.get(['hunger', 'happiness', 'lastFed'], (items) => {
    let hunger = document.getElementById('hunger-level');
    let hungerLevel = getHungerLevel(items.lastFed);
    hunger.innerHTML = hungerLevel;

    // let happiness = document.getElementById('happiness');
    // happiness.innerHTML = items.happiness;

    let lastFed = document.getElementById('last-fed');
    lastFed.innerHTML = new Date(JSON.parse(items.lastFed)).toTimeString();

    showNom(hungerLevel);

  });
  setTimeout(renderVals, 1000);
}

renderVals();

function playWithMonster() {
  chrome.storage.sync.set({ lastPlayed: new Date() });
}


document.addEventListener("dragstart", function( event ) {
  // store a ref. on the dragged elem
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function( event ) {
  // reset the transparency
  event.target.style.opacity = "";

}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
  // highlight potential drop target when the draggable element enters it


}, false);

document.addEventListener("dragleave", function( event ) {
  // reset background of potential drop target when the draggable element leaves it


}, false);

document.addEventListener("drop", function( event ) {
  console.log('dropped 2');
  feedMonster();

}, false);

