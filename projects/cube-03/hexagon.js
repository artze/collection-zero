const P5 = require("p5");

module.exports = function (p) {
  return class Hex {
    constructor({ diameter, patternSize, axialCoord, pickedConfigs }) {
      this.diameter = diameter;
      this.patternSize = patternSize;
      this.radius = this.diameter / 2;
      this.axialCoord = axialCoord;
      this.cubeCoord = p.createVector(
        this.axialCoord.x,
        -this.axialCoord.x - this.axialCoord.y,
        this.axialCoord.y
      );
      this.pickedConfigs = pickedConfigs;
      this.offsetPos();
      this.origin = p.createVector(0, 0);
      this.hexPoints = this.populateHexPoints();
    }

    offsetPos() {
      /**
       * xOffset is made up of:
       * - hex width * axialCoord.x
       * - hex with * axialCoord.y / 2
       */
      const xOffset =
        Math.sqrt(3) * this.radius * this.axialCoord.x +
        (Math.sqrt(3) * this.radius * this.axialCoord.y) / 2;

      /**
       * yOffset is made up of
       * - hexHeight * 3/4 * axialCoord.y
       */
      const yOffset = this.radius * 2 * (3 / 4) * this.axialCoord.y;
      p.translate(xOffset, yOffset);
    }

    findNextHexPoint(prevPoint) {
      const midPoint = P5.Vector.div(P5.Vector.add(this.origin, prevPoint), 2);
      const unitPerpendicular = p
        .createVector(this.origin.y - prevPoint.y, prevPoint.x - this.origin.x)
        .normalize();
      const result = P5.Vector.add(
        midPoint,
        P5.Vector.mult(unitPerpendicular, this.radius * p.sin(60))
      );

      return result;
    }

    populateHexPoints() {
      const hexPoints = [this.origin, p.createVector(0, -this.radius)];
      for (let i = 0; i < 6; i++) {
        hexPoints.push(this.findNextHexPoint(hexPoints.slice(-1).pop()));
      }
      return hexPoints;
    }

    getDistFromOrigin() {
      return Math.max(
        Math.abs(this.cubeCoord.x),
        Math.abs(this.cubeCoord.y),
        Math.abs(this.cubeCoord.z)
      );
    }

    /**
     * @param {import("./configs").Config} config
     */
    drawConfig(config) {
      /** Draw face */
      p.push();
      p.noStroke();
      p.fill("#000");
      p.beginShape();
      config.verticesVect.forEach((hexPointIndex) => {
        p.vertex(this.hexPoints[hexPointIndex].x, this.hexPoints[hexPointIndex].y);
      });
      p.endShape();
      p.pop();

      /** Draw lines */
      p.push();
      p.strokeWeight(5);
      config.innerLinesVect.forEach((l) => {
        p.line(
          this.hexPoints[l[0]].x,
          this.hexPoints[l[0]].y,
          this.hexPoints[l[1]].x,
          this.hexPoints[l[1]].y
        );
      });
      p.pop();
    }

    draw() {
      if (this.getDistFromOrigin() > this.patternSize) {
        return;
      }
      if (this.getDistFromOrigin() % 3 == 0) {
        this.drawConfig(this.pickedConfigs[0]);
      } else if (this.getDistFromOrigin() % 3 == 1) {
        this.drawConfig(this.pickedConfigs[1]);
      } else if (this.getDistFromOrigin() % 3 == 2) {
        this.drawConfig(this.pickedConfigs[2]);
      }
    }
  };
};
