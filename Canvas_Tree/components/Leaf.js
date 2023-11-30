class Leaf {
  constructor(
    x,
    y,
    radius,
    height,
    fillColor = "#F2B9C4",
    strokeColor = "#BA808B"
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;

    this.tipY = this.y - this.height;
    this.tipX = this.x;
    this.c1X = this.x - this.radius;
    this.c1Y = this.y - this.height * 0.2;
    this.c2X = this.x + this.radius;
    this.c2Y = this.y - this.height * 0.2;
    this.theta = 0;

    this.speed = 5;

    this.timer = 0;
  }

  draw(context) {
    context.save();
    // presets
    context.fillStyle = this.fillColor;
    context.strokeStyle = this.strokeColor;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.quadraticCurveTo(this.c1X, this.c1Y, this.tipX, this.tipY);
    context.quadraticCurveTo(this.c2X, this.c2Y, this.x, this.y);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
  }

  update(deltaTime) {
    this.theta = this.theta >= 360 ? 0 : this.theta + deltaTime * this.speed;
    this.tipY += Math.cos(this.theta * 2) * 5;
    this.tipX += Math.cos(this.theta * 3) * 10;
    this.c1X += Math.sin(this.theta) * 5;
    this.c1Y += Math.cos(this.theta * 2) * 5;
    this.c2X += Math.sin(this.theta) * 5;
    this.c2Y += Math.cos(this.theta * 2) * 5;
  }
}

export default Leaf;
