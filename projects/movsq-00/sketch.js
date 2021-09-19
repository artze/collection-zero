const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initTileSys = require("./tile-sys");

const settings = {
  dimensions: [1125, 1125],
  p5: P5,
  animate: true
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  const TileSys = initTileSys(p5);
  const tileSys = new TileSys();
  return () => {
    /**
     * p5 draw()
     */
    p5.background("#fff");
    tileSys.draw();
  };
};

canvasSketch(sketch, settings);
