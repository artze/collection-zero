const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initHex = require("./hexagon");
const configs = require("./configs");
const { getRandomFromArr } = require("../../utils");

const settings = {
  dimensions: [4096, 4096],
  p5: P5,
  animate: true
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  p5.angleMode(p5.DEGREES);
  p5.background("#fcf6bd");
  const patternSize = 10;
  const Hex = initHex(p5);
  const pickedConfigs = [
    getRandomFromArr(configs),
    getRandomFromArr(configs),
    getRandomFromArr(configs)
  ];
  const hexArr = [];

  for (let i = -patternSize; i <= patternSize; i++) {
    for (let j = -patternSize; j <= patternSize; j++) {
      const hex = new Hex({
        diameter: 200,
        patternSize,
        axialCoord: p5.createVector(i, j),
        pickedConfigs
      });
      hexArr.push(hex);
      setInterval(() => {
        hex.triggerRotate();
      }, 10000);
    }
  }

  return () => {
    /**
     * p5 draw()
     */
    p5.push();
    p5.background("#080e20");
    p5.translate(p5.width / 2, p5.height / 2);
    hexArr.forEach((h) => {
      p5.push();
      h.draw();
      p5.pop();
    });
    p5.pop();
  };
};

canvasSketch(sketch, settings);
