const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const utils = require("../../utils");
const hills = require("./hills");

const settings = {
  dimensions: [1000, 1000],
  p5: P5,
  animate: false
};

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  p5.mouseClicked = () => {
    p5.noiseSeed(p5.random(1, 200));
    p5.clear();
    p5.redraw();
  };
  const colorPalette = [
    p5.color(152, 92, 255),
    p5.color(255, 0, 84),
    p5.color(255, 84, 0),
    p5.color(245, 180, 0),
    p5.color(80, 81, 79),
    p5.color(91, 133, 170),
    p5.color(62, 0, 12),
    p5.color(209, 224, 0),
    p5.color(169, 63, 85)
  ];
  p5.noiseDetail(2);
  return () => {
    /**
     * p5 draw()
     */
    p5.background(255);
    hills.drawHLines(p5, utils.getRandomFromArr(colorPalette));
    hills.drawBottomHillBackground(p5);
    hills.drawBottomHill(p5, utils.getRandomFromArr(colorPalette));
  };
};

canvasSketch(sketch, settings);
