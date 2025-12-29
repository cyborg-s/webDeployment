class Start {
  x;
  y;
  height = 50;
  width = 150;
  background = "img/3. Background/Dark/1.png";
  instructions = "img/6.Botones/Instructions 2.png";
  attak = "img/6.Botones/Tittles/Attack tittle.png";
  dButton = "img/6.Botones/Key/D key.png";
  canvas;
  ctx;
  backgroundImg;
  startButtonImg;
  canvasSize = [720, 480]

  constructor() {
      this.canvas = canvas;
      this.x = this.canvasSize[0] / 2;
      this.y = this.canvasSize[1] / 1.5;
      this.ctx = canvas.getContext("2d");
      this.loadImages();
  }

  /**
 * This function load the images
 */
  loadImages() {
    const imagesToLoad = [
        { path: this.background, ref: 'backgroundImg' },
        { path: this.instructions, ref: 'instructionsImg' },
        { path: this.dButton, ref: 'dButtonImg' },
        { path: this.attak, ref: 'attakImg' },
    ];
    let loadedImages = 0;
    imagesToLoad.forEach((img) => {
        this[img.ref] = new Image();
        this[img.ref].src = img.path;
        this[img.ref].onload = () => {
            loadedImages++;
            if (loadedImages === imagesToLoad.length) {
                this.renderAll();
            }
        };
    });
}

/**
 * This function render the images
 */
renderAll() {
    this.draw(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
    this.draw(this.instructionsImg, this.x - 250, this.y - 300, this.width + 350, this.height + 250);
    this.draw(this.dButtonImg, this.x - 99, this.y - 148, this.width - 115, this.height - 15);
    this.draw(this.attakImg, this.x + 55, this.y - 135, this.width - 80, this.height - 35);
}

/**
 * This function draw the images in the canvas.
 */
draw(path, x, y, width, height) {
      this.ctx.drawImage(path, x, y, width, height);
}
}