module.exports = (p) => {
  return class Smoke {
    constructor(startX, startY) {
      this.location1V = p.createVector(startX, startY);
      this.location2V = p.createVector(startX, startY);
      this.xOff = 0;
      this.sinOff = 0.2;
      this.cosOff = -p.PI * 3;
    }

    update() {
      p.noiseDetail(3);
      const angle1 = p.map(p.noise(this.xOff), 0, 1, 0, p.TWO_PI * 0.9);
      const unit1V = p.createVector(p.sin(angle1), p.cos(angle1));
      this.location1V.add(unit1V.mult(0.7));

      const angle2 = p.map(p.noise(this.xOff + 10000), 0, 1, 0, p.TWO_PI * 0.9);
      const unit2V = p.createVector(p.sin(angle2), p.cos(angle2));
      this.location2V.add(unit2V.mult(0.7));

      this.xOff += 0.1;
      this.sinOff += 0.005;
      this.cosOff += 0.005;
    }

    draw() {
      p.push();
      p.strokeWeight(2);
      p.stroke(217, 69, 116, p.random(0, 20));
      p.fill(234, 154, 178, 5);
      p.circle(this.location1V.x, this.location1V.y, 80 + p.sin(this.sinOff) * 50);
      p.pop();
      p.push();
      p.strokeWeight(2);
      p.stroke(17, 69, 116, p.random(0, 20));
      p.fill(34, 154, 178, 5);
      p.circle(this.location2V.x, this.location2V.y, 80 + p.cos(this.cosOff) * 50);
      p.pop();
    }
  };
};
