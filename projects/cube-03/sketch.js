const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initHex = require("./hexagon");
const configs = require("./configs");
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
  setInterval(() => {
    p5.clear();
    p5.redraw();
  }, 600);
  p5.mouseClicked = () => {
    p5.clear();
    p5.redraw();
  };
  p5.angleMode(p5.DEGREES);
  return () => {
    /**
     * p5 draw()
     */
    p5.background("#fcf6bd");
    const patternSize = 10;
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    const Hex = initHex(p5);
    const pickedConfigs = [
      getRandomFromArr(configs),
      getRandomFromArr(configs),
      getRandomFromArr(configs)
    ];

    for (let i = -patternSize; i <= patternSize; i++) {
      for (let j = -patternSize; j <= patternSize; j++) {
        p5.push();
        const hex = new Hex({
          diameter: 100,
          patternSize,
          axialCoord: p5.createVector(i, j),
          pickedConfigs
        });
        hex.draw();
        p5.pop();
      }
    }

    p5.pop();
  };
};

canvasSketch(sketch, settings);
