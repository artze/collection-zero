function drawBottomHillBackground(p) {
  p.push();
  p.noStroke();
  p.fill(255);
  p.beginShape();
  for (let i = 0; i < p.width; i++) {
    p.vertex(i, getHillYCoord(p, i + 15) - 50);
  }
  p.vertex(p.width, p.height);
  p.vertex(0, p.height);
  p.endShape(p.CLOSE);
  p.pop();
}

function drawBottomHill(p, color) {
  const diagonalStripesGraphic = p.createGraphics(p.width, p.height);
  diagonalStripesGraphic.background(255);
  drawDiagonalLines(diagonalStripesGraphic, color);

  const bottomHillGraphic = p.createGraphics(p.width, p.height);
  bottomHillGraphic.push();
  bottomHillGraphic.beginShape();
  for (let i = 0; i < p.width; i++) {
    bottomHillGraphic.vertex(i, getHillYCoord(p, i));
  }
  bottomHillGraphic.vertex(p.width, p.height);
  bottomHillGraphic.vertex(0, p.height);
  bottomHillGraphic.endShape(p.CLOSE);
  bottomHillGraphic.pop();

  const diagonalStripesImg = diagonalStripesGraphic.get();
  const bottomHillImg = bottomHillGraphic.get();

  diagonalStripesImg.mask(bottomHillImg);
  p.image(diagonalStripesImg, 0, 0);
}

function drawHLines(p, color) {
  const step = 5;
  const numLines = p.ceil(p.width / step);
  let yCoord = 0;
  p.push();
  // p.stroke(color);
  // p.stroke("#5b85aa");
  // p.stroke("#ff5400");
  // p.stroke("#5b85aa");
  // p.stroke(p.color(152, 92, 255));
  p.stroke(p.color(245, 180, 0));
  p.strokeWeight(2);
  for (let i = 0; i < numLines; i++) {
    p.line(0, yCoord, p.width, yCoord);
    yCoord += step;
  }
  p.pop();
}

function drawDiagonalLines(p, color) {
  p.push();
  // p.stroke(color);
  // p.stroke("#a93f55");
  // p.stroke("#50514f");
  // p.stroke("#d1e000");
  // p.stroke(p.color(209, 224, 0));
  p.stroke(p.color(91, 133, 170));
  p.strokeWeight(1.5);
  for (let i = p.width * 2; i > 0; i -= 7) {
    p.line(i, p.height, 0, p.height - i);
  }
  p.pop();
}

function getHillYCoord(p, x) {
  return p.map(p.noise(x / 300), 0, 1, 400, p.height - 200);
}

module.exports = {
  drawDiagonalLines,
  drawHLines,
  drawBottomHill,
  drawBottomHillBackground
};
