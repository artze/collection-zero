const { getRandomFromArr } = require("../../utils");
const colors = require("./colors");

module.exports = function (p) {
  const rotationDeg = [90, 180, 270];
  return class Triangle {
    constructor() {
      this.fillColor = p.color(getRandomFromArr(colors));
      this.sideLength = p.random(280, p.width);
      this.yOffset = p.random(p.height - 100);
    }

    draw() {
      p.push();
      p.noStroke();
      p.fill(this.fillColor);
      p.translate(0, this.yOffset);
      p.translate(this.sideLength / 2, this.sideLength / 2);
      p.rotate(getRandomFromArr(rotationDeg));
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
