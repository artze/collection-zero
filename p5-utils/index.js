module.exports = {
  dashedLine({ p5, numSegments }, x1, y1, x2, y2) {
    let segmentX1;
    let segmentX2;
    let segmentY1;
    let segmentY2;
    let dashOn = true;

    for (let i = 0; i < numSegments; i++) {
      if (segmentX1 === undefined) {
        segmentX1 = x1;
      }
      if (segmentY1 === undefined) {
        segmentY1 = y1;
      }
      const amt = (i + 1) / numSegments;
      segmentX2 = p5.lerp(x1, x2, amt);
      segmentY2 = p5.lerp(y1, y2, amt);
      p5.push();
      if (dashOn) {
        p5.line(segmentX1, segmentY1, segmentX2, segmentY2);
      }
      p5.pop();
      segmentX1 = segmentX2;
      segmentY1 = segmentY2;
      dashOn = !dashOn;
    }
  }
};
