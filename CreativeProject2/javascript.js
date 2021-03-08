URLS = {
  "NY": "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=SvqX553AOTQqZYVAu96qv4UXJz2BvLF4",
  "IEX": "https://cloud.iexapis.com/stable/stock/FB/chart/date/20191107?token=pk_ad623b236dcf4be7bdadffe78a86ce22",
  "CARDS": "https://deckofcardsapi.com/api/deck/new/draw/?count=13"
}

STEPS = [
  "Meet Tom Brobot the Robot. Tom loves reading, games, and money. He can also move around and is eager to show off his skills. Go ahead and drag Tom around.",
  "Way to go you! You dragged Tom and allowed him to show off. Feel free to give Tom an appreciative hand. Now, let's reset Tom to his initial position",
  "Ok. Now that you've got the basics, Let's cover Tom's likes. First are books. Go ahead and click to view his favorite books from the New York Times.",
  "Look at all of Tom's favorite books. Go ahead and move Tom so he can start reading (hint: move Tom to Tom's Book. If Tom's already at his book just jiggle him a bit. Sorry, Tom's programming isn't perfected yet.)",
  "Yay! Tom likes reading. He's very smart now, having read every book on the list. Let's reset Tom again.",
  "The second thing that Tom likes are games. Go ahead and hit submit to view cards.",
  "Nice. Now take place Tom on the first card so he can play Hearts.",
  "Perfect. Now go ahead and reset Tom in preparation for his last trick.",
  "Perfect. For this submission, we'll have him pull stock information from the Evil Empi... ahem... Facebook. Go ahead and hit submit to see stock info (25 minute span).",
  "Tom is all done! We hope you and Tom had fun and are now friends :). If you'd like to play with Tom again go ahead and reset Tom's brain"
]



const player = document.getElementById('player');
const content = document.getElementById('content');
const apiContent = document.getElementById('api-content');

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let step = 0;

function onLoad() {
  addContent();
}

function resetTom() {
  apiContent.innerHTML = "";
  player.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0)";
  currentX = 0;
  currentY = 0;
  initialX = 0;
  initialY = 0;
  xOffset = 0;
  yOffset = 0;
  step++;
  addContent();
}

function resetTomsBrain() {
  apiContent.innerHTML = "";
  player.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0)";
  currentX = 0;
  currentY = 0;
  initialX = 0;
  initialY = 0;
  xOffset = 0;
  yOffset = 0;
  step = 0;
  addContent();

  alert("You are resetting Tom. He will soon forget everything... Even you :(... But don't worry! You can become good friends again.");
}

function submitBooks() {
  apiContent.innerHTML = "";
  let h = document.createElement('img');
  h.className = "grid-header";
  h.src = "/bookLarge.png";
  h.style.zIndex = "99999";
  apiContent.appendChild(h);

  fetch (URLS.NY)
    .then (response => {
      console.log(response);
      return response.json();
    })
    .then (json => {
        console.log(json);
        for (let i = 0; i < json.results.books.length; i++) {
          let d = document.createElement('div');
          let ul = document.createElement('ul');
          let liOne = document.createElement('li');
          let liTwo = document.createElement('li');
          let liThree = document.createElement('li');
          let liFour = document.createElement('li');
          let img = document.createElement('img');

          d.className = 'grid-item';
          liOne.innerHTML = "Rank: " + json.results.books[i].rank;
          liTwo.innerHTML = "Purchase: " + json.results.books[i].buy_links[0].name;
          liThree.innerHTML = "Description: " + json.results.books[i].description;
          liFour.innerHTML = "Publisher: " + json.results.books[i].publisher;

          img.src = json.results.books[i].book_image;

          d.append(img);
          ul.appendChild(liOne);
          ul.appendChild(liTwo);
          ul.appendChild(liThree);
          ul.appendChild(liFour);
          d.appendChild(ul);
          apiContent.append(d);
        }

        step++;
        addContent();
    })
    .catch (rejected => {
      let p = document.createElement('div');
      p.className = 'error';
      p.innerHTML = "Looks like there was an error calling the NY Times book API. Go ahead and try to submit again.";
      content.appendChild(p);
    })
}

function submitStocks() {
  apiContent.innerHTML = "";
  fetch (URLS.IEX)
    .then (response => {
      console.log(response);
      return response.json();
    })
    .then (json => {
        console.log(json);

        for (let i = 0; i < 25; i++) {
          let d = document.createElement('div');
          d.className = 'stock';
          let h = document.createElement('header');
          let p = document.createElement('p');

          h.innerHTML = json[i].minute;
          d.appendChild(h);

          // going to add a bunch of things per minute
          s = "Low: " + json[i].low + "</br>";
          s += "High: " + json[i].high + "</br>";
          s += "Close: " + json[i].close + "</br>";
          s += "Open: " + json[i].open + "</br>";
          s += "Trade number: " + json[i].numberOfTrades;
          p.innerHTML = s;
          d.appendChild(p);

          apiContent.appendChild(d);
        }
    })
    .catch (rejected => {
      console.log('rejected');
    })

  step++;
  addContent();
}

function submitCards() {
  apiContent.innerHTML = "";
  fetch (URLS.CARDS)
  .then (response => {
    return response.json();
  })
  .then (json => {
      console.log(json);
      for (let c of json.cards) {
        let d = document.createElement('div');
        d.className = 'grid-item';

        let img = document.createElement('img');
        img.src = c.image;
        d.appendChild(img);
        apiContent.appendChild(d);
      }
  })
  .catch (rejected => {
    console.log('rejected');
  })

  step++;
  addContent();
}

// Step code
function addContent() {
  let p = document.createElement('p');
  let d = document.createElement('d');
  content.innerHTML = "";

  if (step === 0) {
    p.innerHTML = STEPS[step];
    content.appendChild(p);
  } else if (step === 1) {
    p.innerHTML = STEPS[step];
    d.innerHTML = "RESET TOM";
    d.className = "btn";
    d.addEventListener('click', resetTom);

    content.appendChild(p);
    content.appendChild(d);
  } else if (step === 2) {
    p.innerHTML = STEPS[step];
    d.innerHTML = 'SUBMIT';
    d.className = "btn";
    d.addEventListener('click', (e) => submitBooks());

    content.appendChild(p);
    content.appendChild(d);
  } else if (step === 3) {
    p.innerHTML = STEPS[step];
    d.addEventListener('click', resetTom);
    content.appendChild(p);
  } else if (step === 4) { // YUM AND RESET TOM
    p.innerHTML = STEPS[step];
    d.innerHTML = "RESET TOM";
    d.className = "btn";
    d.addEventListener('click', resetTom);
    content.appendChild(p);
    content.appendChild(d);
  } else if (step === 5) {
    p.innerHTML = STEPS[step];
    d.innerHTML = 'SUBMIT';
    d.className = "btn";
    d.addEventListener('click', (e) => submitCards());

    content.appendChild(p);
    content.appendChild(d);
  } else if (step === 6) {
    p.innerHTML = STEPS[step];
    content.appendChild(p);

  } else if (step === 7) {
    p.innerHTML = STEPS[step];

    d.innerHTML = "RESET TOM";
    d.className = "btn";
    d.addEventListener('click', resetTom);
    content.appendChild(p);
    content.appendChild(d);

  } else if (step === 8) {
    p.innerHTML = STEPS[step];
    d.innerHTML = 'SUBMIT';
    d.className = "btn";
    d.addEventListener('click', (e) => submitStocks());
    content.appendChild(p);
    content.appendChild(d);

  } else if (step === 9) {
    p.innerHTML = STEPS[step];
    d.innerHTML = "RESET TOM'S BRAIN";
    d.className = "btn";
    d.addEventListener('click', resetTomsBrain);

    content.appendChild(p);
    content.appendChild(d);
  }

}



// Dragging code
function dragStart(e) {
  if (e.type === 'touchstart') {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === player) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  if (step === 0) {
    step++;
    addContent();
  } else if (step === 1) {
    addContent();
  } else if (step === 3) {
    step++;
    addContent();
  } else if (step === 6) {
    step++;
    addContent();
  }

  active = false;
}

function drag(e) {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, player);
  }

}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

//Events for player
player.addEventListener("touchstart", dragStart, false);
player.addEventListener("touchend", dragEnd, false);
player.addEventListener("touchmove", drag, false);
player.addEventListener("mousedown", dragStart, false);
player.addEventListener("mouseup", dragEnd, false);
player.addEventListener("mousemove", drag, false);
document.addEventListener("load", onLoad)
