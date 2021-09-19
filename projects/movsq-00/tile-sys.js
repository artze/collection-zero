const initTileRow = require("./tile-row");

const numTilesPerRow = 25;
const movementInterval = 50;

module.exports = (p) => {
  const TileRow = initTileRow(p);
  return class TileSys {
    constructor() {
      this.rows = [];
    }

    addRow() {
      this.rows.push(new TileRow({ numTilesPerRow, color: p.color("#ff0000") }));
    }

    removeRow() {
      this.rows = this.rows.filter((r) => r.yOffset < 1000);
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
