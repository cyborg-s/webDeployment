class movableOvject extends DrawableObjects {
  currentImage = 0;
  speed = 0.25;
  otherDirection = false;
  speedY = 2;
  energy = 100;
  lastHit = 0;
  lastPoison = 0;
  hited;

  /**
 * This function apply the gravity for Sharky.
 */
  applyGravity() {
    setInterval(() => {
      if (!this.world.keyboard.UP && this.isAbouveGround()) {
        this.y += this.speedY;
      }
    }, 1000 / 25);
  }

  /**
 * This function apply the gravity for bubbles.
 */
  applyGravityBubble(speedY, speedX, acceleration) {
    setInterval(() => {
      if (this.isAbouveSky()) {
        this.y += speedY;
        speedY += acceleration;
        this.x += speedX;
      }
    }, 1000 / 25);
  }

  /**
 * This function return the y position from the sky.
 */
  isAbouveSky() {
    return this.y > -50;
  }

  /**
 * This function return the y position from the ground.
 */
  isAbouveGround() {
    return this.y < 180;
  }

  /**
 * This function detect the collision.
 */
  isColliding(mo) {
    return (
      this.x + this.width - 50 > mo.x &&
      this.y + this.height - 20 > mo.y &&
      this.x + 20 < mo.x &&
      this.y + 100 < mo.y + mo.height-10
    );
  }

  /**
 * This function detect the collision with the enemy.
 */
  isCollidingEnemy(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  /**
 * This function detect the hit from jellyfish.
 */
  hit() {
    this.energy -= 20;
    this.hited = true;
    if (this.energy < 0) {
      this.energy = 0;
      return true;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
 * This function detect the hit from pufferfish
 */
  hitPoison() {
    this.energy -= 20;
    this.hited = false;
    if (this.energy < 0) {
      this.energy = 0;
      return true;
    } else {
      this.lastPoison = new Date().getTime();
    }
  }

  /**
 * This function detect sharky is dead.
 */
  isDead() {
    if (this.energy == 0) {
      return this.hited;
    }
  }

  /**
 * This function detect shaky is hurt.
 */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
 * This function detect sharky is poisoned.
 */
  isHurtPoisoned() {
    let timepassed = new Date().getTime() - this.lastPoison;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
 * This function let sharky swim left.
 */
  swimLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
    world.otherDirection = true;
  }

  /**
 * This function let the sky move left.
 */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
 * This function let sharky swim right.
 */
  swimRight() {
    this.x += this.speed;
    this.otherDirection = false;
    world.otherDirection = false;
  }

  /**
 * This function let sharky swim up.  
 */
  swimUp() {
    this.y -= this.speed;
  }

  /**
 * This function let sharky swim down.
 */
  swimDown() {
    this.y += this.speed;
  }

  /**
 * This function plays the animation.
 */
  playAnimation(iS) {
    let i = this.currentImage % iS.length;
    let path = iS[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
 * This function plays the dead animation.
 */
  playAnimationDead(iS) {
    let i = this.currentImage % iS.length;
    let path = iS[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    if ((this.currentImage = 9)) {
      i = iS.length;
    }
  }
}