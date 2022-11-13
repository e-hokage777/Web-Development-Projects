// creating book class
class Book {
  constructor() {
    // SELECTORS
    this.bookContainer = document.querySelector(".book");
    this.playButton = this.bookContainer.querySelector(".play-button");
    this.page_cover_list = this.bookContainer.children;
    this.audioTrack = this.bookContainer.querySelector("audio");

    // necessary variables
    this.currentPageIndex = 0;
    this.page_cover_count = this.bookContainer.childElementCount;
    this.timeBeforeFlip = 5000;
    this.flipInverval = null;

    //initializing book
    this.init();
  }

  init() {
    // creating necessary variables

    // setting up layering of pages and covers
    for (let i = 0; i < this.page_cover_count; i++) {
      this.page_cover_list[i].style.zIndex = this.page_cover_count - i;

      // temporarily adding click event listeners for flipping
      //   this.page_cover_list[i].addEventListener("click", function (event) {
      //     this.classList.add("flipped");
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
    this.audioTrack.play();
    this.flipInverval = setInterval(() => {
      this.flip();
    }, this.timeBeforeFlip);
  }

  flip() {
    this.page_cover_list[this.currentPageIndex].classList.add("flipped");
    this.currentPageIndex++;
    if(this.currentPageIndex === this.bookContainer.childElementCount){
        clearInterval(this.flipInverval);
    }
  }
}

let book = new Book();
