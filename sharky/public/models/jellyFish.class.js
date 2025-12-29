class jellyfish extends movableOvject {
  height = 80;
  width = 80;

  imagesSwim = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  imagesDeadJelly = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  imagesAttak = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];
  dead = false;
  isAttak = false;
  lastHit = 0;
  jellySound = new Audio("./audio/jelly.mp3");
  isMuted = false;

  constructor() {
    super().loadImg("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesDeadJelly);
    this.loadImages(this.imagesAttak);
    this.enemeyPosition();
    this.speed = 0.75 + Math.random() * 0.25;
    this.checkIsMuted();
    this.animate();
    this.jellySound.volume = 0.5;
  }

  /**
 * This function set the spawn position of the enemys.
 */
  enemeyPosition(existingEnemies = []) {
    const minX = 650;
    const minY = 100;
    const maxY = 340;
    const minDistance = 100;
    let isValidPosition = false;
    while (!isValidPosition) {
      this.x = minX + Math.random() * 1800;
      this.y = minY + Math.random() * (maxY - minY);
      isValidPosition = existingEnemies.every((enemy) => {
        return Math.abs(this.x - enemy.x) >= minDistance;
      });
    }
  }

  direction = "up";

  /**
 * This function let the jellyfish swim up and down.
 */
  moveUpDown() {
    if (this.direction == "up") {
      this.y -= this.speed;
    }
    if (this.direction == "down") {
      this.y += this.speed;
    }
    if (this.y < 30) {
      this.direction = "down";
    }
    if (this.y > 370) {
      this.direction = "up";
    }
  }

  /**
 * This function animate the jellyfish.
 */
  animate() {
    setInterval(() => {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      if (this.isAttak == true && timepassed < 1) {
       this.jellyAttak();
      } else if (this.dead == false) {
        this.playAnimation(this.imagesSwim);
      }
    }, 250);
    setInterval(() => {
      this.moveUpDown();
    }, 1000 / 60);
  }

  /**
 * This function animates the attak.
 */
  jellyAttak(){
    if (this.isMuted == false) {
      this.jellySound.play();
    }
    this.playAnimation(this.imagesAttak);
  }

  /**
 * This function animates the dead.
 */
  deadEnemy(removeCallback) {
    this.dead = true;
    let animationInterval;
    const playAnimationCycle = () => {
      this.playAnimation(this.imagesDeadJelly);
    };
    animationInterval = setInterval(playAnimationCycle, 250);
    const animationDuration = this.imagesDeadJelly.length * 250;
    setTimeout(() => {
      clearInterval(animationInterval);
      removeCallback();
    }, animationDuration);
  }

  /**
 * This function check if the game is muted.
 */
  checkIsMuted() {
    setInterval(() => {
      this.isMuted = world.isMuted;
    }, 250);
  }
}