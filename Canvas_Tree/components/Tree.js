import Trunk from "./Trunk.js";
import Crown from "./Crown.js";
import Leaf from "./Leaf.js";

class Tree {
  constructor({ x, y, trunkGirth, trunkHeight, branchLength, branchDensity }) {
    this.x = x;
    this.y = y;
    this.trunkHeight = trunkHeight;
    this.branchLength = branchLength;
    this.trunkGirth = trunkGirth;
    this.branchDensity = branchDensity;

    // initializing tree
    this.init();
  }

  init() {
    this.trunk = new Trunk(this.x, this.y, this.trunkGirth, this.trunkHeight);
    console.log(this.trunk.topY);
    this.crown = new Crown({
      startX: this.trunk.leftTopX,
      endX: this.trunk.rightTopX,
      y: this.trunk.topY,
      initBranchLen: this.branchLength,
      branchDensity: this.branchDensity
    });
  }

  draw(context) {
    this.trunk.draw(context);
    this.crown.draw(context);
  }
}

export default Tree;
