module.exports = {
  tileIterator({ p, tilesPerRow }, callback) {
    const tileWidth = p.width / tilesPerRow;
    for (let i = 0; i < tilesPerRow; i++) {
      p.push();
      p.translate(0, tileWidth * i);
      for (let j = 0; j < tilesPerRow; j++) {
        p.push();
        p.translate(tileWidth * j, 0);
        callback();
        p.pop();
      }
      p.pop();
    }
  },

  getRandomFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};
