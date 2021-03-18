const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initHexagon = require("./hexagon");
const iterator = require("./iterator");
const { getRandomFromArr } = require("../../utils");

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
    p5.background(getRandomFromArr(["#dbe7e4", "#d8f3dc"]));
    const diameter = 200;
    const Hexagon = initHexagon(p5);
    iterator({ p: p5, diameter }, () => {
      const hexagon = new Hexagon({ diameter });
      hexagon.draw();
    });
  };
};

canvasSketch(sketch, settings);
