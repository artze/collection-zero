const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initTriangle = require("./triangle");

const settings = {
  dimensions: [324, 972],
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
    p5.background("#F9E9EA");
    const Triangle = initTriangle(p5);
    for (let i = 0; i < 15; i++) {
      const triangle = new Triangle();
      triangle.draw();
    }
  };
};

canvasSketch(sketch, settings);
