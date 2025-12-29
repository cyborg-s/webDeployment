class End {
  x;
  y;
  height = 50;
  width = 150;
  background = "img/3. Background/Dark/2.png";
  win = "img/6.Botones/Try again/Mesa de trabajo 1.png";
  lose = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
  canvas;
  ctx;
  end = this.lose;
  winSound = new Audio("./audio/win.mp3");
  loseSound = new Audio("./audio/gameover.mp3");
  isMuted = world.isMuted;

  constructor(end) {
    this.canvas = canvas;
    this.x = 720 / 2;
    this.y = 480 / 1.5;
    this.ctx = canvas.getContext("2d");
    this.end = end;
    this.world = world;
    this.loadImages();
    document.getElementById("restartDiv").classList.remove("dNone");
    checkIsMuted();
  }

  /**
 * This function check the game is muted.
 */
  checkIsMuted() {
    setInterval(() => {
      this.isMuted = this.world.isMuted;
    }, 250);
  }

  /**
 * This function load images
 */
  loadImages() {
    const imagesToLoad = [
      { path: this.background, ref: "backgroundImg" },
      { path: this.win, ref: "endWin" },
      { path: this.lose, ref: "endLose" },
    ];
    let loadedImages = 0;
    imagesToLoad.forEach((img) => {
      this[img.ref] = new Image();
      this[img.ref].src = img.path;
      this[img.ref].onload = () => {
        loadedImages++;
        if (loadedImages === imagesToLoad.length) {this.renderAll();}
  };});}

  /**
 * This function render the game end.
 */
  renderAll() {
    this.draw(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
    if (this.end == "win") {
      this.winGame();
    } else if (this.end == "lose") {
     this.loseGame();
    }
  }

  /**
 * This function draw the Win in the canvas.
 */
  winGame(){
    this.draw(this.endWin, 0, 0, this.canvas.width, this.canvas.height);
      this.world.stopEndFightSound();
      if (this.isMuted == false) {
        this.winSound.play();
      }
  }

  /**
 * This function draw the lose in the canvas.
 */
  loseGame(){
    this.draw(
        this.endLose,
        this.x - 260,
        this.y - 200,
        this.canvas.width - 200,
        this.canvas.height - 300
      );
      this.world.stopEndFightSound();
      backgroundAudio.pause();
      if (this.isMuted == false) {
        this.loseSound.play();
      }
  }

  /**
 * This function draw in the canvas.
 */
  draw(path, x, y, width, height) {
    this.ctx.drawImage(path, x, y, width, height);
  }
}