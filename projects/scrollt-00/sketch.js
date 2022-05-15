const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initTriangle = require("./triangle");

const settings = {
  dimensions: [324, 972],
  p5: P5,
  animate: false
};

const config = {
  numOfTriangles: 25
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
    const triangles = [];
    for (let i = 0; i < config.numOfTriangles; i++) {
      const triangle = new Triangle();
      triangle.draw();
      triangles.push(triangle);
    }
    p5.mouseWheel = (e) => {
      p5.clear();
      p5.background("#F9E9EA");
      triangles.forEach((t) => {
        t.update(e.delta);
        t.draw();
      });
    };
  };
};

canvasSketch(sketch, settings);
