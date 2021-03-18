module.exports = ({ p, diameter }, callback) => {
  const radius = diameter / 2;
  const tileWidth = radius * p.sin(60) * 2;
  const tileHeight = radius * p.sin(30) * 3;
  const tilesPerRow = p.width / tileWidth;
  const tilesPerColunn = p.height / tileHeight;
  const verticalMargin = Math.ceil(p.random(2, 4));

  for (let i = verticalMargin; i < tilesPerColunn - verticalMargin; i++) {
    p.push();
    p.translate(0, diameter * i);
    p.translate(0, -(radius * p.sin(30) * i));
    const horizontalMargin = Math.ceil(p.random(3, 5));
    for (let j = horizontalMargin; j < tilesPerRow - horizontalMargin; j++) {
      p.push();
      p.translate(-(radius - radius * p.sin(60)), 0);
      p.translate(tileWidth * j, 0);
      if (i % 2 !== 0) {
        p.translate(-(radius - radius * p.sin(60)), 0);
        p.translate(radius, 0);
      }
      callback();
      p.pop();
    }
    p.pop();
  }
};
