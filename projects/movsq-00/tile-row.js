module.exports = (p) => {
  return class TileRow {
    constructor({ numTilesPerRow, color }) {
      this.numTilesPerRow = numTilesPerRow;
      this.yOffset = -(p.width / this.numTilesPerRow);
      this.color = color;
    }

    incrementYOffset() {
      this.yOffset += p.width / this.numTilesPerRow;
    }

    draw() {
      p.push();
      p.translate(0, this.yOffset);
      for (let j = 0; j < p.width; j += p.width / this.numTilesPerRow) {
        p.push();
        p.translate(j, 0);
        p.fill(this.color);
        p.square(0, 0, p.width / this.numTilesPerRow);
        p.pop();
      }
      p.pop();
    }
  };
};
