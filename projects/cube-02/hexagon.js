const P5 = require("p5");
const { getRandomFromArr } = require("../../utils");

module.exports = (p) => {
  return class Hexagon {
    constructor({ diameter }) {
      p.translate(diameter / 2, diameter / 2);
      this.diameter = diameter;
      this.radius = this.diameter / 2;
      this.origin = p.createVector(0, 0);
      this.hexVertices = [this.origin, p.createVector(0, -this.radius)];
      this.populateHexPoints();
      this.faceOrientation = null;
      this.getFaceOrientation();
    }

    getFaceOrientation() {
      this.faceOrientation = getRandomFromArr(["t", "b"]);
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
      for (let i = 0; i < 6; i++) {
        this.hexVertices.push(this.findNextHexPoint(this.hexVertices.slice(-1).pop()));
      }
    }

    drawHexOutline() {
      const points = this.hexVertices.slice(1);
      for (let i = 1; i < points.length; i++) {
        if (i == 2 || i == 5) {
          continue;
        }
        p.line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
      }
    }

    drawHexInnerLine() {
      switch (this.faceOrientation) {
        case "none":
          return;
        case "t":
          p.line(this.origin.x, this.origin.y, this.hexVertices[5].x, this.hexVertices[5].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[2].x, this.hexVertices[2].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[6].x, this.hexVertices[6].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[3].x, this.hexVertices[3].y);
          p.line(
            this.hexVertices[2].x,
            this.hexVertices[2].y,
            this.hexVertices[3].x,
            this.hexVertices[3].y
          );
          break;
        case "b":
          p.line(this.origin.x, this.origin.y, this.hexVertices[2].x, this.hexVertices[2].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[3].x, this.hexVertices[3].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[5].x, this.hexVertices[5].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[6].x, this.hexVertices[6].y);
          p.line(
            this.hexVertices[5].x,
            this.hexVertices[5].y,
            this.hexVertices[6].x,
            this.hexVertices[6].y
          );
          break;
      }
    }

    drawFace() {
      const vertices = [this.origin];
      switch (this.faceOrientation) {
        case "none":
          return;
        case "t":
          vertices.push(
            this.hexVertices[6],
            this.hexVertices[1],
            this.hexVertices[2],
            this.hexVertices[3]
          );
          break;
        case "b":
          vertices.push(
            this.hexVertices[3],
            this.hexVertices[4],
            this.hexVertices[5],
            this.hexVertices[6]
          );
          break;
      }
      p.push();
      p.beginShape();
      p.noStroke();
      p.fill("#000");
      vertices.forEach((v) => {
        p.vertex(v.x, v.y);
      });
      p.endShape();
      p.pop();
    }

    draw() {
      p.push();
      p.strokeWeight(9);
      p.stroke("#000");
      this.drawHexOutline();
      this.drawFace();
      this.drawHexInnerLine();
      p.pop();
    }
  };
};
