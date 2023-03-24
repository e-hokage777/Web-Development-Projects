class CircularSpinner {
  constructor(
    spinnerID,
    options = {
      spinner: {
        size: 300,
        spinSpeed: 2
      },
      itemBox: {
        width: 100,
        height: 100,
      },
    }
  ) {
    this.spinner = document.getElementById(spinnerID);
    this.spinnerItemBoxes = this.spinner.querySelectorAll(".spinner-itembox");
    this.leftBtn = document.querySelector(".btn-left");
    this.rightBtn = document.querySelector(".btn-right");

    // globally needed
    this.spinnerSize = options.spinner.size;
    this.spinnerRadius = this.spinnerSize / 2;
    this.spinSpeed = options.spinner.spinSpeed * 0.01;
    this.interAngle = (2 * Math.PI) / this.spinnerItemBoxes.length;
    this.spinIncrease = 0;


    // set options
    this.#setOptions(options);

    // arranging the items in the spinner
    this.#arrangeItems();

    // adding event listeners
    this.#addEventListeners();
  }

  #setOptions(options) {
    // setting up spinner
    this.spinner.style = `
    width: ${options.spinner.size}px;
    height: ${options.spinner.size}px;
    `;

    for (let itemBox of this.spinnerItemBoxes) {
      itemBox.style = `
        width: ${options.itemBox.width}px;
        height: ${options.itemBox.height}px;
        `;

    }
  }

  // adding event listeners
  #addEventListeners() {
    this.leftBtn.addEventListener("click", (event) => {
      // rotate spinner left
      window.requestAnimationFrame(() => {
        this.#spinLeft(this.interAngle);
      });
    });
    this.rightBtn.addEventListener("click", (event) => {
      // rotate spinner right
    });
  }

  #arrangeItems() {
    let numItems = this.spinnerItemBoxes.length;
    let angle = (2 * Math.PI) / numItems;

    for (let i = 0; i < numItems; i++) {
      let [xpos, ypos] = math.unitCirclePos(angle * i);
      this.spinnerItemBoxes[i].style.translate = `${
        xpos * this.spinnerRadius
      }px ${ypos * this.spinnerRadius}px`;
    }
  }

  #spinLeft(curangle) {
    for (let i = 0; i < this.spinnerItemBoxes.length; i++) {
      let cangle = this.interAngle * i + this.spinIncrease;
      let [xpos, ypos] = math.unitCirclePos(cangle);
      this.spinnerItemBoxes[i].style.translate = `${this.spinnerRadius * xpos}px ${this.spinnerRadius * ypos}px`;
    }

    this.spinIncrease += this.spinSpeed;
    console.log(curangle);

    if (curangle <= 0) {
      return;
    } else {
      requestAnimationFrame(() => {
        this.#spinLeft(curangle - this.spinSpeed);
      });
    }
  }

  #spinRight() {}
}
