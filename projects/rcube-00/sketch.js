const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initTile = require("./tile/tile");
const { tileIterator } = require("./utils/utils");

const settings = {
  dimensions: [2048, 2048],
  p5: P5,
  animate: false
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  p5.mouseClicked = () => {
    p5.clear();
    p5.redraw();
  };
  p5.angleMode(p5.DEGREES);
  return () => {
    /**
     * p5 draw()
     */
    p5.clear();
    p5.background("#FBE9DA");
    tileIterator(
      {
        p: p5,
        tilesPerRow: 5
      },
      () => {
        const tileWidth = p5.width / 5;
        const Tile = initTile(p5);
        const tile = new Tile({
          tileWidth,
          diameter: tileWidth * 0.6
        });
        tile.draw();
      }
    );
  };
};

canvasSketch(sketch, settings);
