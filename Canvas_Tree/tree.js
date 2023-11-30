const canvasSketch = require("canvas-sketch");
// import Trunk from "./components/Trunk.js";
// import Crown from "./components/Crown.js";
// import Leaf from "./components/Leaf.js";
import Tree from "./components/Tree";

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {

  const tree = new Tree({
    x: 0,
    y: 0,
    trunkGirth: 40,
    trunkHeight: 500,
    branchLength: 200,
    branchDensity: 4
  });

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width * 0.5, 1000);
    context.lineWidth = 5;
    tree.draw(context);
    context.restore();
  };
};

canvasSketch(sketch, settings);
