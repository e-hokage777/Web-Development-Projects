// creating m-ary class
class MAry {
  constructor() {
    // creating components
    this.m_ary_container = document.querySelector("#m-ary_container");
    this.canvas = this.m_ary_container.querySelector("#canvas");
    this.canvas.width = this.m_ary_container.getBoundingClientRect().width;
    this.canvas.height = this.m_ary_container.getBoundingClientRect().height;
    this.canvasCtx = this.canvas.getContext("2d");

    // creating drawing variables
    this.padding = 30;
    this.nodeRadius = 15;
    this.nodeBranchWidth = 10;
    this.maxBranchSpread = Math.PI / 1.5;
    this.branchLength = 150;
    this.nodeColorStep = 20;

    // creating tree variables
    this.depth = 2;

    this.canvasCtx.fillStyle = "white";
    this.canvasCtx.strokeStyle = "white";
  }

  // PRIVATE FUNCTIONS
  drawTree(num_leaves, depth) {
    this.#clearCanvas();
    if (depth) {
      this.depth = depth;
    }
    // drawing very first node
    this.canvasCtx.save();
    this.canvasCtx.translate(this.canvas.width / 2, this.padding);
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(0, 0, this.nodeRadius, 0, 2 * Math.PI);
    this.canvasCtx.fill();
    this.#drawLevel(num_leaves, 0);
    this.canvasCtx.restore();
  }

  // PUBLIC FUNCTIONS
  #drawLevel(num_leaves, depth) {
    if (depth > this.depth - 1) return;

    this.canvasCtx.save();

    let maxSpread = this.maxBranchSpread / (depth + 1);
    let branchAngle = maxSpread + (Math.PI - maxSpread) / 2;
    let angleStep = -maxSpread / (num_leaves - 1);

    let branLen;

    for (let i = 0; i < num_leaves; i++) {
      let cosAngle =
        branchAngle + i * angleStep - (branchAngle - maxSpread / 2);

      if (cosAngle == 0) {
        branLen = this.branchLength;
      } else {
        branLen = this.branchLength / Math.cos(cosAngle);
      }

      this.canvasCtx.save();
      this.canvasCtx.rotate(branchAngle + i * angleStep);
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(0, 0);
      this.canvasCtx.lineTo(branLen, 0);
      this.canvasCtx.stroke();

      this.canvasCtx.translate(branLen, 0);

      // drawing child nodes
      this.canvasCtx.save();
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(0, 0, this.nodeRadius - 3 * depth, 0, 2 * Math.PI);
      this.canvasCtx.fillStyle = `hsl(${
        depth * this.nodeColorStep
      }, 100%, 50%)`;
      this.canvasCtx.fill();
      this.canvasCtx.restore();

      this.canvasCtx.rotate(-(branchAngle + i * angleStep));
      this.#drawLevel(num_leaves, depth + 1);

      this.canvasCtx.restore();
    }

    this.canvasCtx.restore();
  }

  #clearCanvas(){
    this.canvasCtx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }
}

let mary = new MAry();

// adding an event listener to draw button
let drawBtn = document.getElementById("draw-btn");

drawBtn.addEventListener("click", (event) => {
  let numChildren = document.getElementById("children").value;
  let depth = document.getElementById("depth").value;
  mary.drawTree(numChildren ? numChildren : 2, depth);
});
