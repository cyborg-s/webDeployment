class Character extends movableOvject {
  world;
  imagesSwim = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  imagesIdle = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  imagesDeadShock = [
    "img/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  imagesDeadPoison = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  isDeadImages = [
    "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
    "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];

  imagesShock = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];

  imagesPoisoned = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  imagesAttak = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];
  imagesLongIdle = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
  ];
  imagesLongIdle2 = [
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  idle = new Date().getTime();
  speed = 2;
  swimSound = new Audio("./audio/swim.mp3");
  finAttak = 0;
  attakS = new Date().getTime();
  finSound = new Audio("./audio/finAttak.mp3");
  isMuted = false;

  constructor() {
    super().loadImg("./img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesDeadShock);
    this.loadImages(this.imagesDeadPoison);
    this.loadImages(this.imagesShock);
    this.loadImages(this.imagesPoisoned);
    this.loadImages(this.isDeadImages);
    this.loadImages(this.imagesAttak);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesLongIdle2);
    this.applyGravity();
    this.animate();
    this.swimSound.volume = 0.2;
    this.checkIsMuted();
  }

  /**
 * This function check the game is muted.
 */
  checkIsMuted() {
    if (world.isMuted == true) {
      this.swimSound.volume = 0;
      this.finSound.volume = 0;
    } else {
      this.swimSound.volume = 0.2;
      this.finSound.volume = 1;
    }
  }

  /**
 * This function set the animate intervall from the charakter.
 */
  animate() {
    setInterval(() => {
      this.animateSwimming();
    }, 1000 / 60);

    setInterval(() => {
      this.animateProcessing();
    }, 170);
  }

  /**
 * This function animate the charater while swimming.
 */
  animateSwimming() {
    this.checkIsMuted();
    this.swimSound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) this.swimRight();
    if (this.world.keyboard.LEFT && this.x > 50) this.swimLeft();
    if (this.world.keyboard.UP && this.y > -100) this.swimUp();
    if (this.world.keyboard.DOWN && this.y < 200) this.swimDown();
    if (this.world.keyboard.UP || this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.DOWN || this.world.keyboard.SPACE || this.world.keyboard.D) this.idle = new Date().getTime();
    this.world.cameraX = -this.x;
  }

  /**
 * This function let the character swimm Right.
 */
  swimRight() {
    super.swimRight();
    if (this.isMuted == false) {
      this.swimSound.play();
    }
  }

  /**
 * This function let the character swimm Left.
 */
  swimLeft() {
    super.swimLeft();
    if (this.isMuted == false) {
      this.swimSound.play();
    }
  }

  /**
 * This function let the character swimm up.
 */
  swimUp() {
    super.swimUp();
    if (this.isMuted == false) {
      this.swimSound.play();
    }
  }

  /**
 * This function let the character swimm down.
 */
  swimDown() {
    super.swimDown();
    if (this.isMuted == false) {
      this.swimSound.play();
    }
  }

  /**
 * This function animate the charater while hurt, idle or dead.
 */
  animateProcessing() {
    let timepassed = new Date().getTime() - this.finAttak;
    timepassed = timepassed / 1000;
    let idle = new Date().getTime() - this.idle;
    idle = idle / 1000;
    if (timepassed < 1) {this.finAttakAnimate();} 
    else if (this.isDead() == true) {this.deadShockEndGame();} 
    else if (this.isDead() == false) {this.deadPoisonEndGame();} 
    else if (this.isHurt()) {this.playAnimation(this.imagesShock);} 
    else if (this.isHurtPoisoned()) {this.playAnimation(this.imagesPoisoned);} 
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {this.playAnimation(this.imagesSwim);} 
    else if (idle < 15) {this.playAnimation(this.imagesIdle);} 
    else if (idle < 17) {this.playAnimation(this.imagesLongIdle);} 
    else {this.playAnimation(this.imagesLongIdle2);}
  }

  /**
 * This function animate the Fin attak.
 */
  finAttakAnimate() {
    if (this.isMuted == false) {
      this.finSound.play();
    }
    this.playAnimation(this.imagesAttak);
  }

  /**
 * This function animate the Shock dead.
 */
  deadShockEndGame() {
    this.playAnimationDead(this.imagesDeadShock);
    gamestatus = "end";
    this.end = true;
    let highestIntervalId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestIntervalId; i++) {
      clearInterval(i);
    }
    endGame("lose");
  }

  /**
 * This function animate the Poision dead.
 */
  deadPoisonEndGame() {
    this.playAnimationDead(this.imagesDeadPoison);
    this.end = true;
    let highestIntervalId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestIntervalId; i++) {
      clearInterval(i);
    }
    gamestatus = "end";
    endGame("lose");
  }

  /**
 * This function set a timer for Fin attak.
 */
  setHitAttak() {
    let timepassed = new Date().getTime() - this.attakS;
    timepassed = timepassed / 1000;
    if (this.world.keyboard.SPACE && timepassed > 2) {
      this.finAttak = this.lastHit = new Date().getTime();
      this.attakS = new Date().getTime();
    }
  }
}