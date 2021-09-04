const P5 = require("p5");

function getRandomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = function initWalker(p) {
  return class Walker {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = P5.Vector.random2D();
      this.color = this.getFillColor();
      this.acc;
    }

    getFillColor() {
      const c = [
        p.color(247, 15, 101),
        p.color(254, 198, 1),
        p.color(110, 250, 251),
        p.color(41, 83, 101),
        p.color(239, 15, 139),
        p.color(22, 219, 147)
      ];

      return getRandomFromArr(c);
    }

    updateColor() {
      const r = () => {
        let v = p.red(this.color);
        if (p.random() < 0.3) {
          v = p.random(20);
        }
        return v;
      };
      const g = () => {
        let v = p.green(this.color);
        if (p.random() < 0.3) {
          v = p.random(20);
        }

        return v;
      };
      const b = () => {
        let v = p.blue(this.color);
        if (p.random() < 0.3) {
          v = p.random(20);
        }

        return v;
      };
      return p.color(r(), g(), b(), p.random(255));
    }

    update() {
      this.acc = P5.Vector.random2D();
      this.acc.setMag(2);
      this.vel.add(this.acc);
      if (p.random() < 0.05) {
        this.vel.mult(p.random(10));
        this.vel.limit(10);
      } else {
        this.vel.limit(3);
      }
      this.pos.add(this.vel);

      /**
       * Prevent walker from going out of bounds
       */
      if (this.pos.x < 0) {
        this.vel.x = 1;
      }
      if (this.pos.x > p.width) {
        this.vel.x = -1;
      }
      if (this.pos.y < 0) {
        this.vel.y = 1;
      }
      if (this.pos.y > p.height) {
        this.vel.y = -1;
      }
    }

    draw() {
      p.push();
      p.fill(this.updateColor());
      p.square(this.pos.x, this.pos.y, 5);
      p.pop();
    }
  };
};
