// creating book class
class Book {
  constructor() {
    // SELECTORS
    this.bookContainer = document.querySelector(".book");
    this.playButton = this.bookContainer.querySelector(".play-button");
    this.page_cover_list = Array.from(this.bookContainer.children).slice(0, -1); // to remove the audio element
    this.audioTrack = this.bookContainer.querySelector("audio");
    this.bubbleGenerator = new BubbleGenerator();

    // necessary variables
    this.currentPageIndex = 0;
    this.page_cover_count = this.bookContainer.childElementCount - 1; // -1 to remove audio element
    this.timeBeforeFlip = 5000;
    this.flipInverval = null;
    this.bubbleInterval = null;

    // creating audio stuff
    this.audioCtx = new AudioContext();
    this.audioSource = this.audioCtx.createMediaElementSource(this.audioTrack);
    this.primaryGain = this.audioCtx.createGain();
    this.audioSource.connect(this.primaryGain);
    this.primaryGain.connect(this.audioCtx.destination);

    //initializing book
    this.init();
  }

  init() {
    // creating necessary variables

    // setting up layering of pages and covers
    for (let i = 0; i < this.page_cover_count; i++) {
      this.page_cover_list[i].style.zIndex = this.page_cover_count - i;

      //   // temporarily adding click event listeners for flipping
      //   this.page_cover_list[i].addEventListener("click", function (event) {
      //     this.classList.add("flipped");
      //     this.nextElementSibling.classList.add("next");
      //   });

      // transition end listener
      this.page_cover_list[i].addEventListener("transitionstart", (event) => {
        setTimeout(
          (page) => {
            page.style = "";
          },
          500,
          event.target
        );
      });
    }

    // EVENT LISTENERS
    this.playButton.addEventListener("click", (event) => {
      this.start();
      this.spawnBubbles();
    });
  }

  start() {
    this.audioCtx.resume();
    this.audioTrack.play();
    this.flipInverval = setInterval(() => {
      this.flip();
    }, this.timeBeforeFlip);
  }

  stopTrack() {
    this.audioTrack.pause();
    this.audioCtx.close().then(() => {
      console.log("track ended");
    });
  }

  flip() {
    this.page_cover_list[this.currentPageIndex].classList.add("flipped");

    //adding next class to next page
    if (!(this.currentPageIndex + 1 >= this.page_cover_count)) {
      this.page_cover_list[
        this.currentPageIndex
      ].nextElementSibling.classList.add("next");
    }
    this.currentPageIndex++;

    // checking whether to clear the interval
    if (this.currentPageIndex === this.page_cover_count) {
      this.rampVolumeDown();
      setTimeout(() => {
        this.stopTrack();
      }, 8000);
      clearInterval(this.flipInverval);
      clearInterval(this.bubbleInterval);
    }
  }

  rampVolumeDown() {
    this.primaryGain.gain.exponentialRampToValueAtTime(
      1e-15,
      this.audioCtx.currentTime + 5
    );
  }

  // function for creating bubbles
  spawnBubbles(){
    this.bubbleInterval = setInterval(() => {
      this.bubbleGenerator.makeBubble();
    }, 500)
  }
}

// creating bubble generator
class BubbleGenerator {
  constructor(minRadius = 20, maxRadius = 50) {
    this.viewportWidth = document.querySelector(":root").clientWidth;
    this.viewportHeight = document.querySelector(":root").clientHeight;
    this.maxBubbleRadius = minRadius;
    this.minBubbleRadius = maxRadius;
  }

  makeBubble() {
    let bubbleRadius = Math.floor((Math.random() * this.maxBubbleRadius) + this.minBubbleRadius);
    let bubble = new Bubble(bubbleRadius);
    let bubbleElement = bubble.getBubbleElement();
    bubbleElement.style.bottom = `${-2 * bubbleRadius}px`;
    bubbleElement.style.left = `${Math.floor(Math.random() * this.viewportWidth + bubbleRadius)}px`;

    // adding the animation class to the bubble element
    bubbleElement.classList.add("bubble-float");

    // adding an event listener for when the animation ends
    bubbleElement.addEventListener("animationend", function(){
      this.remove();
    })

    // adding the bubble element to the document body
    document.body.appendChild(bubbleElement);

  }
}

class Bubble {
  constructor(radius) {
    this.radius = radius;

    // creating the element
    this.bubbleElement = document.createElement("div");
    this.bubbleElement.style = `    position: fixed;
                                    width: ${this.radius}px;
                                    height: ${this.radius}px;
                                    border-radius: 50%;
                                    background-image: radial-gradient(closest-corner at 30% 30%, #FFFFFF, #19AAC1);
    `;
  }

  getBubbleElement(){
    return this.bubbleElement;
  }
}

let book = new Book();
