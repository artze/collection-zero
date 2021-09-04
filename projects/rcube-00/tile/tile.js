const P5 = require("p5");
const { getRandomFromArr, dashedLine } = require("../utils/utils");

const lineExclusions = {
  t: ["06", "02", "16", "12", "01"],
  b: ["03", "34", "45", "05", "04"],
  fl: ["06", "04", "45", "56", "05"],
  fr: ["02", "23", "34", "04", "03"],
  bl: ["16", "01", "05", "56", "06"],
  br: ["12", "01", "03", "23", "02"]
};

const indicesToStr = (indexArr) => {
  let result = "";
  indexArr.sort();
  indexArr.forEach((v) => {
    result += v;
  });
  return result;
};

module.exports = (p) => {
  return class Tile {
    constructor({ tileWidth, diameter }) {
      p.translate(tileWidth / 2, tileWidth / 2);
      this.tileWidth = tileWidth;
      this.diameter = diameter;
      this.radius = this.diameter / 2;
      this.origin = p.createVector(0, 0);
      this.hexVertices = [this.origin, p.createVector(0, -this.radius)];
      this.populateHexPoints();
      this.faceOrientation = getRandomFromArr(["t", "b", "fl", "fr", "bl", "br"]);
    }

    findNextHexVertex(prevPoint) {
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
        this.hexVertices.push(this.findNextHexVertex(this.hexVertices.slice(-1).pop()));
      }
    }

    drawFace() {
      const vertices = [this.origin];
      switch (this.faceOrientation) {
        case "t":
          vertices.push(this.hexVertices[6], this.hexVertices[1], this.hexVertices[2]);
          break;
        case "b":
          vertices.push(this.hexVertices[3], this.hexVertices[4], this.hexVertices[5]);
          break;
        case "fl":
          vertices.push(this.hexVertices[4], this.hexVertices[5], this.hexVertices[6]);
          break;
        case "fr":
          vertices.push(this.hexVertices[2], this.hexVertices[3], this.hexVertices[4]);
          break;
        case "bl":
          vertices.push(this.hexVertices[5], this.hexVertices[6], this.hexVertices[1]);
          break;
        case "br":
          vertices.push(this.hexVertices[1], this.hexVertices[2], this.hexVertices[3]);
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

    drawLines() {
      const getNextIndex = (i) => {
        if (i == 0) {
          return Math.floor(p.random(1, 7));
        }
        let result;
        if (p.random() > 0.5) {
          result = i + 1;
          return result > 6 ? 0 : result;
        } else {
          result = i - 1;
          return result < 0 ? 6 : result;
        }
      };
      const numAttempts = p.random(4, 8);
      for (let i = 0; i < numAttempts; i++) {
        let index1 = Math.floor(p.random(0, 7));
        let index2 = getNextIndex(index1);
        while (lineExclusions[this.faceOrientation].includes(indicesToStr([index1, index2]))) {
          index1 = Math.floor(p.random(0, 7));
          index2 = getNextIndex(index1);
        }
        const p1 = this.hexVertices[index1];
        const p2 = this.hexVertices[index2];
        p.push();
        p.strokeCap(p.ROUND);
        p.strokeWeight(15);
        const indicesStr = indicesToStr([index1, index2]);
        if (this.faceOrientation == "t" && ["05", "03"].includes(indicesStr)) {
          dashedLine({ p5: p, numSegments: 5 }, p1.x, p1.y, p2.x, p2.y);
        } else if (this.faceOrientation == "fl" && ["01", "03"].includes(indicesStr)) {
          dashedLine({ p5: p, numSegments: 5 }, p1.x, p1.y, p2.x, p2.y);
        } else if (this.faceOrientation == "fr" && ["05", "01"].includes(indicesStr)) {
          dashedLine({ p5: p, numSegments: 5 }, p1.x, p1.y, p2.x, p2.y);
        } else {
          p.line(p1.x, p1.y, p2.x, p2.y);
        }
        p.pop();
      }

      // Outline of faces
      const outlineOfFaces = [];
      switch (this.faceOrientation) {
        case "t":
          outlineOfFaces.push([0, 6], [6, 1], [1, 2], [2, 0]);
          break;
        case "b":
          outlineOfFaces.push([0, 3], [3, 4], [4, 5], [5, 0]);
          break;
        case "fl":
          outlineOfFaces.push([0, 4], [4, 5], [5, 6], [6, 0]);
          break;
        case "fr":
          outlineOfFaces.push([0, 2], [2, 3], [3, 4], [4, 0]);
          break;
        case "bl":
          outlineOfFaces.push([0, 1], [1, 6], [6, 5], [5, 0]);
          break;
        case "br":
          outlineOfFaces.push([0, 1], [1, 2], [2, 3], [3, 0]);
          break;
      }
      p.push();
      p.strokeWeight(15);
      outlineOfFaces.forEach((hexIndexArr) => {
        p.line(
          this.hexVertices[hexIndexArr[0]].x,
          this.hexVertices[hexIndexArr[0]].y,
          this.hexVertices[hexIndexArr[1]].x,
          this.hexVertices[hexIndexArr[1]].y
        );
      });
      p.pop();
    }

    draw() {
      this.drawFace();
      this.drawLines();
    }
  };
};
