const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initTile = require("./tile");
const utils = require("./utils");

const settings = {
  dimensions: [2048, 2048],
  p5: P5,
  animate: false
};

/**
 * Sketch configurations
 */
const tilesPerRow = 31;

const sketch = ({ p5 }) => {
  p5.angleMode(p5.DEGREES);
  const Tile = initTile(p5);
  p5.mouseClicked = () => {
    p5.clear();
    p5.redraw();
  };
  return () => {
    p5.background("#fff");
    utils.tileIterator(
      {
        p: p5,
        tilesPerRow
      },
      () => {
        const tile = new Tile(tilesPerRow);
        tile.draw();
      }
    );
  };
};

canvasSketch(sketch, settings);
