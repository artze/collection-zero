const canvasSketch = require("canvas-sketch");
const P5 = require("p5");
const initWalker = require("./walker");

const settings = {
  dimensions: [2048, 2048],
  p5: P5,
  animate: true
};

const sketch = ({ p5 }) => {
  p5.background(0);
  const Walker = initWalker(p5);
  const numWalker = 30;
  const walkers = [];
  for (let i = 0; i < numWalker; i++) {
    walkers.push(new Walker());
  }

  return () => {
    walkers.forEach((w) => {
      w.update();
      w.draw();
    });
  };
};

canvasSketch(sketch, settings);
