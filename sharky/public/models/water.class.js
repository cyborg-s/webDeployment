class Water extends movableOvject {
  height = 480;
  width = 1440;
  x = 0;
  y = 0;
  speed = 0.25;

  constructor(imgPath, xScale) {
    super().loadImg(imgPath);
    this.x = xScale;
    this.animate();
  }

  /**
 * This function animate the water in the background.
 */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 50);
  }
}