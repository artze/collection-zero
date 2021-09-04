const utils = require("./utils");

function quadratic(x) {
  return 0.3 * Math.pow(x, 3) - 8.7 * x - 13;
}

module.exports = (p) => {
  return class Tile {
    constructor(tilesPerRow) {
      this.width = p.width / tilesPerRow;
      this.rotateDeg = utils.getRandomFromArr([0, 90, 180, 270]);
      // this.rotateDeg = utils.getRandomFromArr([0]);
    }

    draw() {
      // Square border
      // p.push();
      // p.stroke("#000");
      // p.strokeWeight(2);
      // p.square(0, 0, this.width);
      // p.pop();

      const halfWidth = this.width / 2;
      p.push();
      // p.stroke(p.color(105, 105, 105, 200));
      p.stroke(p.color(0, 38, 103, p.random(255)));
      // p.stroke(p.color(217, 0, 60));
      p.strokeWeight(2);
      p.translate(halfWidth, halfWidth);
      p.rotate(this.rotateDeg);

      // sin curve
      p.push();
      p.strokeWeight(4);
      p.beginShape();
      for (let i = -halfWidth; i < halfWidth; i++) {
        const x = p.map(i, -halfWidth, halfWidth, -90, 90);
        // const x = p.map(i, -halfWidth, halfWidth, -120, 10);
        const y = p.map(p.sin(x), -1, 1, -halfWidth, halfWidth);
        p.vertex(i, y);
      }
      p.endShape();
      p.pop();
      for (let i = -halfWidth; i < halfWidth; i += 1) {
        const x = p.map(i, -halfWidth, halfWidth, -90, 90);
        // const x = p.map(i, -halfWidth, halfWidth, -150, 90);
        const y = p.map(p.sin(x), -1, 1, -halfWidth, halfWidth);
        p.line(i, y, i, halfWidth);
      }

      // third deg polynomial
      // p.beginShape();
      // for (let i = -halfWidth; i < halfWidth; i++) {
      //   const x = p.map(i, -halfWidth, halfWidth, -5, 5);
      //   const y = p.map(quadratic(x), -4, 10, -halfWidth / 13, halfWidth / 4);
      //   p.vertex(i, y);
      // }
      // p.endShape();
      // for (let i = -halfWidth; i < halfWidth; i += 1) {
      //   const x = p.map(i, -halfWidth, halfWidth, -5, 5);
      //   const y = p.map(quadratic(x), -4, 10, -halfWidth / 13, halfWidth / 4);
      //   p.push();
      //   // p.stroke(p.color(0, 38, 103, p.random(255)));
      //   p.line(i, y, i, halfWidth);
      //   p.pop();
      // }

      p.pop();
    }
  };
};
