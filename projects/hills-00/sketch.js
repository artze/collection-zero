const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const hills = require("./hills");

const settings = {
  dimensions: [800, 800],
  p5: P5,
  animate: false
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  const layer2 = p5.createGraphics(800, 800);
  p5.noiseSeed(50);
  return () => {
    /**
     * p5 draw()
     */
    hills.drawHLines(p5);
    hills.drawBottomHillVertices(p5);
    layer2.background(255, 255, 255, 0);
    hills.drawDiagonalLines(layer2);
    hills.drawTopHillVertices(layer2);
    p5.image(layer2, 0, 0);
  };
};

canvasSketch(sketch, settings);
