const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initSmoke = require("./smoke");

const settings = {
  dimensions: [2048, 2048],
  p5: P5,
  animate: true
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  p5.background("#fef8ec");
  const Smoke = initSmoke(p5);
  const smokeArr = [];
  for (let i = 0; i < p5.width; i += p5.width / 3) {
    for (let j = p5.height; j > p5.height / 3; j -= p5.height / 3) {
      smokeArr.push(new Smoke(i, j));
    }
  }

  return () => {
    /**
     * p5 draw()
     */
    smokeArr.forEach((s) => {
      s.update();
      s.draw();
    });
  };
};

canvasSketch(sketch, settings);
