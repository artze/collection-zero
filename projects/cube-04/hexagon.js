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
      this.origin = p.createVector(0, 0);
      this.hexPoints = null;
      /**
       * Rotation related
       */
      this.shouldRotate = false;
      this.rotationAngle = 0;
      this.rotationNthLeg = 0;
      /**
       * Radius change related
       */
      this.originalRadius = this.radius;
      /** @type {'expand'|'shrink'} */
      this.radiusChangeMode = "expand";
      this.radiusHoldNumOfFrames = 150;
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
      p.fill("#fff");
      p.beginShape();
      config.verticesVect.forEach((hexPointIndex) => {
        p.vertex(this.hexPoints[hexPointIndex].x, this.hexPoints[hexPointIndex].y);
      });
      p.endShape();
      p.pop();

      /** Draw lines */
      p.push();
      p.stroke("#fff");
      p.strokeWeight(10);
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

    triggerRotate() {
      this.rotationNthLeg++;
      this.shouldRotate = true;
    }

    handleRotate() {
      if (!this.shouldRotate) {
        return;
      }
      if (this.rotationAngle >= 60 && this.rotationNthLeg == 1) {
        this.shouldRotate = false;
        return;
      }
      if (this.rotationAngle >= 120 && this.rotationNthLeg == 2) {
        this.shouldRotate = false;
        return;
      }
      if (this.rotationAngle >= 180 && this.rotationNthLeg == 3) {
        this.shouldRotate = false;
        return;
      }
      if (this.rotationAngle >= 240 && this.rotationNthLeg == 4) {
        this.shouldRotate = false;
        return;
      }
      if (this.rotationAngle >= 300 && this.rotationNthLeg == 5) {
        this.shouldRotate = false;
        return;
      }
      if (this.rotationAngle >= 360 && this.rotationNthLeg == 6) {
        this.shouldRotate = false;
        this.rotationAngle = 0;
        this.rotationNthLeg = 0;
        return;
      }
      this.rotationAngle += 1.2;
    }

    handleRadiusChange() {
      if (this.radius >= this.originalRadius * 2.1 && this.radiusChangeMode != "shrink") {
        if (this.radiusHoldNumOfFrames <= 0) {
          this.radiusChangeMode = "shrink";
          this.radiusHoldNumOfFrames = 150;
        } else {
          this.radiusHoldNumOfFrames--;
          return;
        }
      } else if (this.radius <= this.originalRadius && this.radiusChangeMode != "expand") {
        if (this.radiusHoldNumOfFrames <= 0) {
          this.radiusChangeMode = "expand";
          this.radiusHoldNumOfFrames = 150;
        } else {
          this.radiusHoldNumOfFrames--;
          return;
        }
      }
      if (this.rotationNthLeg < 2 && this.radiusChangeMode == "expand") {
        return;
      }
      if (this.rotationNthLeg == 0 || this.rotationNthLeg % 2 != 0) {
        if (this.radiusChangeMode == "expand") {
          this.radius += this.originalRadius * 0.01;
        } else if (this.radiusChangeMode == "shrink") {
          if (Math.abs(this.radius - this.originalRadius) <= 0.5) {
            this.radius = this.originalRadius;
          } else {
            this.radius -= this.originalRadius * 0.01;
          }
        }
      }
    }

    draw() {
      this.offsetPos();
      this.hexPoints = this.populateHexPoints();
      if (this.getDistFromOrigin() > this.patternSize) {
        return;
      }
      if (this.getDistFromOrigin() % 3 == 0) {
        this.drawConfig(this.pickedConfigs[0]);
      } else if (this.getDistFromOrigin() % 3 == 1) {
        p.push();
        p.rotate(this.rotationAngle);
        this.handleRadiusChange();
        this.drawConfig(this.pickedConfigs[1]);
        p.pop();
      } else if (this.getDistFromOrigin() % 3 == 2) {
        this.drawConfig(this.pickedConfigs[2]);
      }
      this.handleRotate();
    }
  };
};
