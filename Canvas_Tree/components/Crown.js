const math = require("canvas-sketch-util/math");

// crown class
class Crown {
  constructor({
    startX,
    endX,
    y,
    angleRangeStart = -90,
    angleRangeEnd = 90,
    num_branches = 4,
    initBranchLen = 300,
    branchDensity = 4,
  }) {
    this.startX = startX;
    this.endX = endX;
    this.y = y;
    this.angleRangeStart = angleRangeStart;
    this.angleRangeEnd = angleRangeEnd;
    this.num_branches = num_branches;
    this.initBranchLen = initBranchLen;
    this.branchBendAngle = -30;
    this.branchDensity = branchDensity;
  }

  draw(context) {
    let locDiv = Math.abs(this.endX - this.startX) / (this.num_branches - 1);
    let angleDiv =
      (this.angleRangeEnd - this.angleRangeStart) / (this.num_branches - 1);

    for (let i = 0; i < this.num_branches; ++i) {
      let bX = this.startX + i * locDiv;
      context.save();
      context.translate(bX, this.y);
      context.rotate(math.degToRad(this.angleRangeStart + i * angleDiv));
      this.drawBranchRecurse(
        context,
        this.initBranchLen,
        math.degToRad(this.branchBendAngle),
        this.branchDensity,
        this.branchDensity
      );
      context.restore();
    }
  }

  drawBranchRecurse(context, length, rotation, initDepth, depth) {
    if (depth == 0) {
      return;
    }

    // major branch
    context.save();
    context.rotate(depth == initDepth ? math.degToRad(-90) : rotation);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(length, 0);
    context.stroke();

    // //drawing leaf
    // context.save();
    // context.translate(length, 0);
    // context.rotate(math.degToRad(90));
    // // new Leaf({ x: 0, y: 0, radius: 100, height: 200 }).draw(context);
    // context.restore();
    // //-- drawing leaf --

    // first minor branch
    context.save();
    context.translate(length * 0.7, 0);
    this.drawBranchRecurse(
      context,
      length * 0.7,
      rotation,
      initDepth,
      depth - 1
    );
    context.restore();

    // second minor branch
    context.save();
    context.translate(length * 0.6, 0);
    this.drawBranchRecurse(
      context,
      length * 0.7,
      -rotation,
      initDepth,
      depth - 1
    );
    context.restore();

    // third minor branch
    context.save();
    context.translate(length * 0.5, 0);
    this.drawBranchRecurse(
      context,
      length * 0.7,
      rotation,
      initDepth,
      depth - 1
    );
    context.restore();
    context.restore();
  }
}

export default Crown;
