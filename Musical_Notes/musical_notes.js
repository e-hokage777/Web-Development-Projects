// creating book class
class Book {
  constructor() {
    // SELECTORS
    this.bookContainer = document.querySelector(".book");
    this.playButton = this.bookContainer.querySelector(".play-button");
    this.page_cover_list = Array.from(this.bookContainer.children).slice(0, -1); // to remove the audio element
    this.audioTrack = this.bookContainer.querySelector("audio");

    // necessary variables
    this.currentPageIndex = 0;
    this.page_cover_count = this.bookContainer.childElementCount - 1; // -1 to remove audio element
    this.timeBeforeFlip = 5000;
    this.flipInverval = null;

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
    });
  }

  start() {
    this.audioCtx.resume();
    this.audioTrack.play();
    this.flipInverval = setInterval(() => {
      this.flip();
    }, this.timeBeforeFlip);
  }

  stopTrack(){
    this.audioTrack.pause();
    this.audioCtx.close().then(() => {console.log("track ended")})
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
    }
  }

  rampVolumeDown() {
    this.primaryGain.gain.exponentialRampToValueAtTime(1e-15, this.audioCtx.currentTime + 5);
  }
}

let book = new Book();
