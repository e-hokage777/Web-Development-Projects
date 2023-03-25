class CSpinner {
  constructor(
    spinnerID,
    {
      spinner = {
        perspective: 1000,
        transTime: 1,
      },
      spinnerDisc = {
        size: 300, // the radius of the spinner
        slant: 90, // the degree of slope of the spinner
      },
      spinnerItem = {
        width: 100, // the width of a single item on the spinner
        height: 100, // the height of a single item on the spinner
        titleColor: "white", // color of spinner item title if any
        titleFontSize: 20, // font size of the title
      },
      button = {
        size: 40,
      },
    }
  ) {
    // setting up option attributes
    this.spinnerPerspective = spinner.perspective;
    this.spinnerTransTime = spinner.transTime;
    this.spinnerDiscSize = spinnerDisc.size;
    this.spinnerDiscSlantAngle = spinnerDisc.slant;
    this.spinnerDiscRadius = this.spinnerDiscSize / 2;
    this.spinnerItemWidth = spinnerItem.width;
    this.spinnerItemHeight = spinnerItem.height;
    this.spinnerItemTitleColor = spinnerItem.titleColor
      ? this.spinnerItemTitleColor
      : "white";
    this.spinnerItemTitleFontSize = spinnerItem.titleFontSize
      ? spinnerItem.titleFontSize
      : 20;
    this.spinnerBtnSize = button.size;

    // setting up the spinner element
    this.spinnerElement = document.querySelector(`#${spinnerID}.spinner`);
    this.spinnerDisc = this.spinnerElement.querySelector(".spinner-disc");
    this.spinnerItems = this.spinnerElement.querySelectorAll(".spinner-item");
    this.leftBtn = this.spinnerElement.querySelector(".left-btn");
    this.rightBtn = this.spinnerElement.querySelector(".right-btn");
    this.spinnerBg = this.spinnerElement.querySelector(".spinner-bg");

    // GLOBAL VARIABLES
    this.itemInterAngle = 360 / this.spinnerItems.length;
    this.totalAngleIncrease = 0;
    this.curItemIndex = 0;

    // setting up spinner styles
    this.#setSpinnerStyles();

    // arranging items on spinner disc
    this.#arrangeDiscItems();

    // adding event listeners
    this.#addEventListeners();

    // giving the current active item the `active` class
    this.spinnerItems[this.curItemIndex].classList.add("active");

    // setting up the background of the active element
    if (this.spinnerBg) {
      let src =
        this.spinnerItems[this.curItemIndex].querySelector("input").value;
      this.spinnerBg.querySelector("img").src = src;
    }
  }

  #setSpinnerStyles() {
    // setting up the main spinner wrapper
    this.spinnerElement.style = `
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    perspective: ${this.spinnerPerspective}px;
    `;

    // setting up the spinner disc styles
    this.spinnerDisc.style = `
    width: ${this.spinnerDiscSize}px;
    height: ${this.spinnerDiscSize}px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    rotate: x ${this.spinnerDiscSlantAngle}deg;
    transform-style: preserve-3d;
    transition: all ${this.spinnerTransTime}s;
    `;

    // setting up styles for spinner items
    this.spinnerItems.forEach((spinnerItem) => {
      spinnerItem.style = `
        width: ${this.spinnerItemHeight}px;
        height: ${this.spinnerItemHeight}px;
        position: absolute;
        rotate: x ${-90}deg;
        transition: all ${this.spinnerTransTime}s;
        `;

      // adding styles to the spinner item images
      spinnerItem.querySelector(".spinneritem-img").style = `
        object-fit: contain;
        width: 100%;
        height: 100%;
        `;

      // adding styles to item title
      let spinnerItemTitle = spinnerItem.querySelector(".spinneritem-title");
      if (spinnerItemTitle) {
        spinnerItemTitle.style = `
        text-align: center;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        transform: translate(0, -110%);
        color: ${this.spinnerItemTitleColor};
        font-size: ${this.spinnerItemTitleFontSize}px;
        `;
      }
    });

    // setting up spinner background
    let spinnerBg = this.spinnerElement.querySelector(".spinner-bg");
    if (spinnerBg) {
      spinnerBg.style = `
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      `;

      spinnerBg.querySelector("img").style = `
      width: 100%;
      height: 100%;
      background-fit: cover;
      filter: brightness(40%);
      `;
    }

    // setting up styles of buttons
    this.leftBtn.style = `
    color: white;
    position: absolute;
    left: 0;
    border: none;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    height: 100%;
    padding: 0rem 2rem;
    font-size: ${this.spinnerBtnSize}px;
    `;
    this.rightBtn.style = `
    color: white;
    position: absolute;
    right: 0;
    border: none;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    height: 100%;
    padding: 0rem 2rem;
    font-size: ${this.spinnerBtnSize}px;
    `;
  }

  #arrangeDiscItems() {
    for (let i = 0; i < this.spinnerItems.length; i++) {
      let angle = this.#degToRad(i * this.itemInterAngle - 270);
      let [xpos, ypos] = this.#unitCirclePos(angle);
      this.spinnerItems[i].style.translate = `${
        this.spinnerDiscRadius * xpos
      }px ${this.spinnerDiscRadius * ypos}px`;
    }
  }

  // to add event listeners
  #addEventListeners() {
    this.leftBtn.addEventListener("click", (event) => {
      // removing the active class
      this.spinnerItems[this.curItemIndex].classList.remove("active");

      this.totalAngleIncrease += this.itemInterAngle;
      this.spinnerDisc.style.transform = `rotateZ(${this.totalAngleIncrease}deg)`;
      for (let spinnerItem of this.spinnerItems) {
        spinnerItem.style.transform = `rotateY(${this.totalAngleIncrease}deg)`;
      }

      this.curItemIndex =
        (this.spinnerItems.length -
          ((this.totalAngleIncrease / this.itemInterAngle) %
            this.spinnerItems.length)) %
        this.spinnerItems.length;
      this.spinnerItems[this.curItemIndex].classList.add("active");

      // changing background
      this.#changeBgImg();
    });

    this.rightBtn.addEventListener("click", (event) => {
      // removing the active class
      this.spinnerItems[this.curItemIndex].classList.remove("active");

      this.totalAngleIncrease -= this.itemInterAngle;
      this.spinnerDisc.style.transform = `rotateZ(${this.totalAngleIncrease}deg)`;
      for (let spinnerItem of this.spinnerItems) {
        spinnerItem.style.transform = `rotateY(${this.totalAngleIncrease}deg)`;
      }

      // this.curItemIndex = Math.abs(this.totalAngleIncrease / this.itemInterAngle) % this.spinnerItems.length;
      this.curItemIndex = (this.curItemIndex + 1) % this.spinnerItems.length;
      this.spinnerItems[this.curItemIndex].classList.add("active");

      // changing background
      this.#changeBgImg();
    });
  }

  // function to change background image if setup
  #changeBgImg() {
    if (this.spinnerBg) {
      let src =
        this.spinnerItems[this.curItemIndex].querySelector("input").value;
      this.spinnerBg.querySelector("img").src = src;
    }
  }

  // utility functions
  #degToRad(angle) {
    return (angle / 360) * (2 * Math.PI);
  }
  #unitCirclePos(angle) {
    return [Math.cos(angle), Math.sin(angle)];
  }
}
