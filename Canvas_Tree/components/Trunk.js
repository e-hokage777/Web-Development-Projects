// Trunk class
class Trunk {
  constructor(
    x,
    y,
    girth,
    height,
    fillColor = "#a5633c",
    strokeColor = "#694b37"
  ) {
    this.x = x;
    this.y = y;
    this.girth = girth;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.pointedNess = 0.5;

    // getting points to draw the trunk
    this.topY = this.y - this.height;
    this.bottomRightX = this.x + this.girth;
    this.leftTopX = this.x + this.pointedNess * 0.5 * this.girth;
    this.rightTopX = this.bottomRightX - this.pointedNess * 0.5 * this.girth;
  }

  draw(context) {
    // // getting points to draw the trunk
    // let topY = this.y - this.height;
    // let bottomRightX = this.x + this.girth;
    // let leftTopX = this.x + this.pointedNess * 0.5 * this.girth;
    // let rightTopX = bottomRightX - this.pointedNess * 0.5 * this.girth;

    // drawing
    context.save();
    context.strokeStyle = this.strokeColor;
    context.fillStyle = this.fillColor;
    context.lineWidth = 20;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.leftTopX, this.topY);
    context.lineTo(this.rightTopX, this.topY);
    context.lineTo(this.bottomRightX, this.y);
    context.lineTo(this.x, this.y);
    context.closePath();

    context.stroke();
    context.fill();

    context.restore();
  }
}

export default Trunk;