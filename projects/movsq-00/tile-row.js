module.exports = (p) => {
  return class TileRow {
    constructor({ numTilesPerRow, color, prevColor, nextColor, edgeLocation }) {
      this.numTilesPerRow = numTilesPerRow;
      this.yOffset = -(p.width / this.numTilesPerRow);
      this.color = color;
      this.prevColor = prevColor;
      this.nextColor = nextColor;
      this.edgeLocation = edgeLocation;
      this.mixedColorEnc = null;
      this.setMixedColorEnc();
    }

    incrementYOffset() {
      this.yOffset += p.width / this.numTilesPerRow;
    }

    setMixedColorEnc() {
      if (this.edgeLocation) {
        this.mixedColorEnc = [];
        for (let i = 0; i < this.numTilesPerRow; i++) {
          this.mixedColorEnc.push(p.random() > 0.5 ? 1 : 0);
        }
      }
    }

    draw() {
      p.push();
      p.translate(0, this.yOffset);
      for (let j = 0; j < this.numTilesPerRow; j++) {
        p.push();
        p.translate(j * (p.width / this.numTilesPerRow), 0);
        p.noStroke();

        p.fill(this.color);

        if (this.edgeLocation == "top" && Boolean(this.mixedColorEnc[j])) {
          p.fill(this.nextColor);
        }

        if (this.edgeLocation == "bottom" && Boolean(this.mixedColorEnc[j])) {
          if (!this.prevColor) {
            this.prevColor = p.color("#fff");
          }
          p.fill(this.prevColor);
        }

        p.square(0, 0, p.width / this.numTilesPerRow);
        p.pop();
      }
      p.pop();
    }
  };
};
