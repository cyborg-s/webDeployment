class DrawableObjects {
  x = 50;
  y = 200;
  img;
  height = 250;
  width = 250;
  imageCache = {};

  /**
 * This function load a list of images.
 */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
 * This function load every image.
 */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
 * This function draw the image in the canvas.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}