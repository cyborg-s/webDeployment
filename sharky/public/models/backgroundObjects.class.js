class Background extends movableOvject {
  x = 0;
  y = 0;
  height = 480;
  width = 1440;

  constructor(imgPath, xScale) {
    super().loadImg(imgPath);
    this.x = xScale;
  }

  
}