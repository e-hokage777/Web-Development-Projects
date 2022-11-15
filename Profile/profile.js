// creating class for entire app
class App {
  constructor() {
    // SELECTORS

    // creating necessary variablels
    this.bubbleGenerator = new BubbleGenerator();

    // call function to intialize components
    this.init();
  }

  // function to initialize components
  init() {
    //spawning bubbles
    this.spawnBubbles();
  }

  spawnBubbles() {
    this.bubbleInterval = setInterval(() => {
      this.bubbleGenerator.makeBubble();
    }, 500);
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
