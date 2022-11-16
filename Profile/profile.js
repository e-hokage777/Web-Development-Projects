// creating class for entire app
class App {
  constructor() {
    // SELECTORS
    this.buttonHoverAudio = document.getElementById("button-hover-audio");
    this.contentMenuItems = document.querySelectorAll(
      "#content-menu .content-menu-item"
    );

    // creating necessary variablels
    this.bubbleGenerator = new BubbleGenerator();

    // audio variables
    this.audioCtx = new AudioContext();
    this.primaryGain = this.audioCtx.createGain();
    this.buttonHoverSoundGain = this.audioCtx.createGain();
    this.buttonHoverSoundSource = this.audioCtx.createMediaElementSource(
      this.buttonHoverAudio
    );

    // making connections
    this.buttonHoverSoundSource.connect(this.buttonHoverSoundGain);
    this.buttonHoverSoundGain.connect(this.primaryGain);
    this.primaryGain.connect(this.audioCtx.destination);

    // call function to intialize components
    this.init();
  }

  // function to initialize components
  init() {
    // EVENT LISTENRERS
    this.contentMenuItems.forEach((contentMenuItem, index) => {
      contentMenuItem.addEventListener("mouseover", (event) => {
        this.playButtonHoverSound();
      });
    });

    //spawning bubbles
    this.spawnBubbles();

    // increasing playback speed of audio element to take care of speakers making glitchy sounds
    this.buttonHoverAudio.playbackRate = 7;


  }

  // button to spawn bubbles
  spawnBubbles() {
    this.bubbleInterval = setInterval(() => {
      this.bubbleGenerator.makeBubble();
    }, 500);
  }

  // function to play button hover sound
  playButtonHoverSound() {
    this.audioCtx.resume();
    this.buttonHoverAudio.currentTime = 0;
    this.buttonHoverAudio.play();
  }

}

// creating bubble generator
class BubbleGenerator {
  constructor(minRadius = 20, maxRadius = 5) {
    this.viewportWidth = document.querySelector(":root").clientWidth;
    this.viewportHeight = document.querySelector(":root").clientHeight;
    this.maxBubbleRadius = minRadius;
    this.minBubbleRadius = maxRadius;
  }

  makeBubble() {
    let bubbleRadius = Math.floor(
      Math.random() * this.maxBubbleRadius + this.minBubbleRadius
    );
    let bubble = new Bubble(bubbleRadius);
    let bubbleElement = bubble.getBubbleElement();
    bubbleElement.style.bottom = `${-2 * bubbleRadius}px`;
    bubbleElement.style.left = `${Math.floor(
      Math.random() * this.viewportWidth + bubbleRadius
    )}px`;

    // adding the animation class to the bubble element
    bubbleElement.classList.add("bubble-float");

    // adding an event listener for when the animation ends
    bubbleElement.addEventListener("animationend", function () {
      this.remove();
    });

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

  getBubbleElement() {
    return this.bubbleElement;
  }
}

window.addEventListener("load", function () {
  const app = new App();
});
