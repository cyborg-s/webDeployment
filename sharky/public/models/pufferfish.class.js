class Pufferfish extends movableOvject {
  height = 80;
  width = 80;
  speedY = 20;

  imagesSwim = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  imagesDeadPuffer = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
  ];

  imagesAttak = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

  dead = false;
  isAttak = false;
  lastHit = 0;
  pufferSound = new Audio("./audio/puffer.mp3");
  isMuted = false;

  constructor() {
    super().loadImg(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png"
    );
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesDeadPuffer);
    this.loadImages(this.imagesAttak);
    this.enemeyPosition();
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.pufferSound.volume = 0.5;
    this.checkIsMuted();
  }

  /**
 * This function set the spwan position for pufferfish.
 */
  enemeyPosition(existingEnemies = []) {
    const minX = 650;
    const minY = 100;
    const maxY = 340;
    const minDistance = 100;
    let isValidPosition = false;
    while (!isValidPosition) {
      this.x = minX + Math.random() * 2000;
      this.y = minY + Math.random() * (maxY - minY);
      isValidPosition = existingEnemies.every((enemy) => {
        return Math.abs(this.x - enemy.x) >= minDistance;
      });
    }
  }

  /**
 * This function animate the pufferfish.
 */
  animate() {
    setInterval(() => {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      if (this.isAttak == true && timepassed < 1) {
        this.pufferAttak();
      } else if (this.dead == false) {
        this.playAnimation(this.imagesSwim);
      }
    }, 250);
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
 * This function animate the attak.
 */
  pufferAttak(){
    if (this.isMuted == false) {
      this.pufferSound.play();
    }
    this.playAnimation(this.imagesAttak);
  }

  /**
 * This function animate the dead.
 */
  deadPuffer(removeCallback) {
    this.dead = true;
    this.playAnimationDead(this.imagesDeadPuffer);
    setInterval(() => {
      this.y += this.speedY;
      this.x += this.speedY;
    }, 1000 / 60);
  }

  /**
 * This function check the game is muted.
 */
  checkIsMuted() {
    setInterval(() => {
      this.isMuted = world.isMuted;
    }, 250);
  }
}