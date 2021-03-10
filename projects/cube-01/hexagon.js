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
      this.faceOrientation = getRandomFromArr(["tr", "tl", "br", "bl"]);
      this.otherShadedFace = getRandomFromArr(["l", "r"]);
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
      switch (this.faceOrientation) {
        case "tr":
          p.line(
            this.hexVertices[1].x,
            this.hexVertices[1].y,
            this.hexVertices[2].x,
            this.hexVertices[2].y
          );
          switch (this.otherShadedFace) {
            case "r":
              p.line(
                this.hexVertices[2].x,
                this.hexVertices[2].y,
                this.hexVertices[3].x,
                this.hexVertices[3].y
              );
              break;
            case "l":
              p.line(
                this.hexVertices[4].x,
                this.hexVertices[4].y,
                this.hexVertices[5].x,
                this.hexVertices[5].y
              );
              break;
          }
          break;
        case "tl":
          p.line(
            this.hexVertices[1].x,
            this.hexVertices[1].y,
            this.hexVertices[6].x,
            this.hexVertices[6].y
          );
          switch (this.otherShadedFace) {
            case "r":
              p.line(
                this.hexVertices[3].x,
                this.hexVertices[3].y,
                this.hexVertices[4].x,
                this.hexVertices[4].y
              );
              break;
            case "l":
              p.line(
                this.hexVertices[5].x,
                this.hexVertices[5].y,
                this.hexVertices[6].x,
                this.hexVertices[6].y
              );
              break;
          }
          break;
        case "br":
          p.line(
            this.hexVertices[3].x,
            this.hexVertices[3].y,
            this.hexVertices[4].x,
            this.hexVertices[4].y
          );
          switch (this.otherShadedFace) {
            case "r":
              p.line(
                this.hexVertices[2].x,
                this.hexVertices[2].y,
                this.hexVertices[3].x,
                this.hexVertices[3].y
              );
              break;
            case "l":
              p.line(
                this.hexVertices[1].x,
                this.hexVertices[1].y,
                this.hexVertices[6].x,
                this.hexVertices[6].y
              );
              break;
          }
          break;
        case "bl":
          p.line(
            this.hexVertices[4].x,
            this.hexVertices[4].y,
            this.hexVertices[5].x,
            this.hexVertices[5].y
          );
          switch (this.otherShadedFace) {
            case "r":
              p.line(
                this.hexVertices[1].x,
                this.hexVertices[1].y,
                this.hexVertices[2].x,
                this.hexVertices[2].y
              );
              break;
            case "l":
              p.line(
                this.hexVertices[5].x,
                this.hexVertices[5].y,
                this.hexVertices[6].x,
                this.hexVertices[6].y
              );
              break;
          }
          break;
      }
    }

    drawHexInnerLine() {
      switch (this.faceOrientation) {
        case "tr":
        case "tl":
          p.line(this.origin.x, this.origin.y, this.hexVertices[4].x, this.hexVertices[4].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[2].x, this.hexVertices[2].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[6].x, this.hexVertices[6].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[1].x, this.hexVertices[1].y);
          switch (this.otherShadedFace) {
            case "r":
              p.line(this.origin.x, this.origin.y, this.hexVertices[3].x, this.hexVertices[3].y);
              break;
            case "l":
              p.line(this.origin.x, this.origin.y, this.hexVertices[5].x, this.hexVertices[5].y);
              break;
          }
          break;
        case "br":
        case "bl":
          p.line(this.origin.x, this.origin.y, this.hexVertices[1].x, this.hexVertices[1].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[3].x, this.hexVertices[3].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[5].x, this.hexVertices[5].y);
          p.line(this.origin.x, this.origin.y, this.hexVertices[4].x, this.hexVertices[4].y);
          switch (this.otherShadedFace) {
            case "r":
              p.line(this.origin.x, this.origin.y, this.hexVertices[2].x, this.hexVertices[2].y);
              break;
            case "l":
              p.line(this.origin.x, this.origin.y, this.hexVertices[6].x, this.hexVertices[6].y);
              break;
          }
          break;
      }
    }

    drawFace() {
      const vertices = [this.origin];
      switch (this.faceOrientation) {
        case "tr":
          vertices.push(this.hexVertices[1], this.hexVertices[2]);
          break;
        case "tl":
          vertices.push(this.hexVertices[1], this.hexVertices[6]);
          break;
        case "br":
          vertices.push(this.hexVertices[3], this.hexVertices[4]);
          break;
        case "bl":
          vertices.push(this.hexVertices[4], this.hexVertices[5]);
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

    drawFace2() {
      const vertices = [this.origin];
      switch (this.faceOrientation) {
        case "tr":
          switch (this.otherShadedFace) {
            case "l":
              vertices.push(this.hexVertices[4], this.hexVertices[5]);
              break;
            case "r":
              vertices.push(this.hexVertices[2], this.hexVertices[3]);
              break;
          }
          break;
        case "tl":
          switch (this.otherShadedFace) {
            case "l":
              vertices.push(this.hexVertices[5], this.hexVertices[6]);
              break;
            case "r":
              vertices.push(this.hexVertices[3], this.hexVertices[4]);
              break;
          }
          break;
        case "br":
          switch (this.otherShadedFace) {
            case "l":
              vertices.push(this.hexVertices[6], this.hexVertices[1]);
              break;
            case "r":
              vertices.push(this.hexVertices[2], this.hexVertices[3]);
              break;
          }
          break;
        case "bl":
          switch (this.otherShadedFace) {
            case "l":
              vertices.push(this.hexVertices[5], this.hexVertices[6]);
              break;
            case "r":
              vertices.push(this.hexVertices[1], this.hexVertices[2]);
              break;
          }
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
      this.drawHexOutline();
      this.drawFace();
      this.drawFace2();
      this.drawHexInnerLine();
      p.pop();
    }
  };
};
