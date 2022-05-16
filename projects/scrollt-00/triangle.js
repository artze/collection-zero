const { getRandomFromArr } = require("../../utils");
const colors = require("./colors");

module.exports = function (p) {
  const rotationDeg = [90, 180, 270];
  const scrollAmount = [5, 13, 20];
  return class Triangle {
    constructor() {
      this.fillColor = p.color(getRandomFromArr(colors));
      this.rotateAngle = getRandomFromArr(rotationDeg);
      this.sideLength = p.random(300, p.width * 1.2);
      this.yOffset = p.random(-p.height, p.height);
      this.scrollAmount = getRandomFromArr(scrollAmount);
    }

    update(delta) {
      if (delta > 0) {
        this.yOffset += this.scrollAmount;
      } else {
        this.yOffset -= this.scrollAmount;
      }
      if (this.yOffset > p.height) {
        this.yOffset = -p.height;
      } else if (this.yOffset < -p.height) {
        this.yOffset = p.height;
      }
    }

    draw() {
      p.push();
      p.noStroke();
      p.fill(this.fillColor);
      p.translate(0, this.yOffset);
      p.translate(this.sideLength / 2, this.sideLength / 2);
      p.rotate(this.rotateAngle);
      p.triangle(
        -this.sideLength / 2,
        this.sideLength / 2,
        -this.sideLength / 2,
        -this.sideLength / 2,
        this.sideLength / 2,
        this.sideLength / 2
      );
      p.pop();
    }
  };
};
