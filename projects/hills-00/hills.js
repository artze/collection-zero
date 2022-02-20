function drawBottomHillVertices(p) {
  p.push();
  p.beginShape();
  for (let i = 0; i < p.width; i++) {
    p.vertex(i, getHillYCoord(p, i));
  }
  p.vertex(p.width, p.height);
  p.vertex(0, p.height);
  p.endShape(p.CLOSE);
  p.pop();
}

function drawTopHillVertices(p) {
  p.push();
  p.beginShape();
  p.fill(255, 255, 255, 250);
  for (let i = 0; i < p.width; i++) {
    p.vertex(i, getHillYCoord(p, i));
  }
  p.vertex(p.width, 0);
  p.vertex(0, 0);
  p.endShape(p.CLOSE);
  p.pop();
}

function drawHLines(p) {
  const step = 5;
  const numLines = p.ceil(p.width / step);
  let yCoord = 0;
  // const color = getRandomColor();
  p.push();
  p.stroke("#c5e311");
  p.strokeWeight(2);
  for (let i = 0; i < numLines; i++) {
    p.line(0, yCoord, p.width, yCoord);
    yCoord += step;
  }
  p.pop();
}

function drawDiagonalLines(p) {
  p.push();
  for (let i = p.width * 2; i > 0; i -= 10) {
    p.line(i, p.height, 0, p.height - i);
  }
  p.pop();
}

function getHillYCoord(p, x) {
  return p.map(p.noise(x / 100), 0, 1, 200, p.height - 200);
}

module.exports = {
  drawDiagonalLines,
  drawHLines,
  drawBottomHillVertices,
  drawTopHillVertices
};
