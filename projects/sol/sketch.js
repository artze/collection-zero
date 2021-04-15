const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const { dashedLine } = require("../../p5-utils");

const settings = {
  dimensions: [2400, 600],
  p5: P5,
  animate: false
};

const shapeDiameter = 150;
const sides = 8;
const backgroundColor = "#181414";

const sketch = ({ p5 }) => {
  /**
   * p5 setup()
   */
  p5.mouseClicked = () => {
    p5.clear();
    p5.redraw();
  };

  return () => {
    /**
     * p5 draw()
     */
    p5.background(backgroundColor);
    p5.angleMode(p5.DEGREES);
    p5.strokeWeight(3);
    function tiles() {
      const numColumns = Math.ceil(p5.width / (shapeDiameter / Math.sqrt(2)));
      const numRows = Math.ceil(p5.height / (shapeDiameter / Math.sqrt(2)));
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          p5.push();
          p5.translate(
            shapeDiameter * ((j * 1) / Math.sqrt(2)),
            shapeDiameter * ((i * 1) / Math.sqrt(2))
          );
          tile();
          p5.pop();
        }
      }
    }

    function tile() {
      p5.push();
      // testp5.line();
      if (randBoolean()) {
        lineLayer();
      }
      if (randBoolean() && randBoolean()) {
        arcLayer();
      }
      p5.pop();
    }

    function lineLayer() {
      p5.push();
      p5.translate(shapeDiameter / 2, shapeDiameter / 2);
      p5.rotate(getRandRotateDeg());
      if (randBoolean()) {
        p5.push();
        p5.stroke("#fff");
        p5.line(-(shapeDiameter / 2), 0, shapeDiameter / 2, 0);
        p5.pop();
      } else {
        p5.push();
        p5.stroke("#fff");
        dashedLine({ p5, numSegments: 10 }, -(shapeDiameter / 2), 0, shapeDiameter / 2, 0);
        p5.pop();
      }
      p5.pop();
    }

    function arcLayer() {
      p5.push();
      p5.noFill();
      p5.stroke("#ffffff");
      p5.translate(shapeDiameter / 2, shapeDiameter / 2);
      p5.rotate(getRandRotateDeg());
      p5.arc(0, 0, shapeDiameter, shapeDiameter / 2, 20, 160, p5.OPEN);
      p5.pop();
    }

    function getRandRotateDeg() {
      return (360 / sides) * Math.floor(p5.random(0, 5));
    }

    function randBoolean() {
      return Boolean(Math.floor(p5.random(2)));
    }

    tiles();
  };
};

canvasSketch(sketch, settings);
