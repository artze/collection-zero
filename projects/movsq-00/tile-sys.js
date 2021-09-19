const { getRandomFromArr } = require("../../utils");
const initTileRow = require("./tile-row");

const numTilesPerRow = 64;
const movementInterval = 10;
const chunkSize = { min: 4, max: 8 };

module.exports = (p) => {
  const TileRow = initTileRow(p);
  return class TileSys {
    constructor() {
      this.rows = [];
      this.color = null;
      this.prevColor = null;
      this.nextColor = null;
      this.rowChunkSize = null;
      this.rowChunkSizeRemaining = null;
      this.setColor();
      this.setRowChunkSize();
    }

    addRow() {
      if (this.rowChunkSizeRemaining <= 0) {
        this.setRowChunkSize();
        this.setColor();
      }
      let edgeLocation = null;
      if (this.rowChunkSizeRemaining < 5) {
        edgeLocation = "top";
      }
      if (this.rowChunkSizeRemaining > this.rowChunkSize - 5) {
        edgeLocation = "bottom";
      }
      this.rows.push(
        new TileRow({
          numTilesPerRow,
          color: this.color,
          prevColor: this.prevColor,
          nextColor: this.nextColor,
          edgeLocation
        })
      );
      this.rowChunkSizeRemaining--;
    }

    removeRow() {
      this.rows = this.rows.filter((r) => r.yOffset < 2048);
    }

    setColor() {
      this.nextColor = getRandomFromArr([
        p.color("#001219"),
        p.color("#ff0a50"),
        p.color("#d3f233"),
        p.color("#f8f8d0"),
        p.color("#ff3e0a"),
        p.color("#0affb9")
      ]);
      this.prevColor = this.color;
      this.color = this.nextColor;
    }

    setRowChunkSize() {
      this.rowChunkSize = p.floor(p.random(chunkSize.min, chunkSize.max));
      this.rowChunkSizeRemaining = this.rowChunkSize;
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
