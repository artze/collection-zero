const { getRandomFromArr } = require("../../utils");
const initTileRow = require("./tile-row");

const numTilesPerRow = 25;
const movementInterval = 50;

module.exports = (p) => {
  const TileRow = initTileRow(p);
  return class TileSys {
    constructor() {
      this.rows = [];
      this.color = null;
      this.rowChunkSize = null;
      this.setColor();
      this.setRowChunkSize();
    }

    addRow() {
      if (this.rowChunkSize <= 0) {
        this.setRowChunkSize();
        this.setColor();
      }
      this.rows.push(new TileRow({ numTilesPerRow, color: this.color }));
      this.rowChunkSize--;
    }

    removeRow() {
      this.rows = this.rows.filter((r) => r.yOffset < 1000);
    }

    setColor() {
      this.color = getRandomFromArr([p.color("#001219"), p.color("#f50045"), p.color("#d3f233")]);
    }

    setRowChunkSize() {
      this.rowChunkSize = p.floor(p.random(4, 10));
    }

    draw() {
      if (p.frameCount % movementInterval === 0) {
        this.addRow();
        this.removeRow();
        this.rows.forEach((r) => {
          r.incrementYOffset();
        });
      }
      this.rows.forEach((r) => {
        r.draw();
      });
    }
  };
};
