const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const utils = require("../../utils");
const hills = require("./hills");

const settings = {
  dimensions: [2000, 2000],
  // pixelsPerInch: 300,
  // scaleToFit: false,
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
    p5.color(152, 92, 255), // purple
    p5.color(255, 0, 84), // bright red
    p5.color(255, 84, 0), // bright orange
    p5.color(245, 180, 0), // dark yellow
    p5.color(80, 81, 79), // grey
    p5.color(91, 133, 170), // dull blue
    p5.color(62, 0, 12), // dark maroon / brown
    p5.color(209, 224, 0), // lime green
    p5.color(169, 63, 85) // dull maroon
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
