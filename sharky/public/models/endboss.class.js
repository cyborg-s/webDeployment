class Endboss extends movableOvject {
  height = 430;
  width = 430;
  imagesIntroduce = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  imagesSwim = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  imagesAttak = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];
  imagesDead = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  imagesHurt = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  imagesEnd = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  isColl = false;
  isDead = false;
  end = false;
  hurt;
  life = 80;
  speedX;
  lastAttak = new Date().getTime();
  walAttack = new Audio("./audio/walAttack.mp3");
  isMuted = false;
  Bosslife = new Bosslifebar();

  constructor() {
    super().loadImg("img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImages(this.imagesIntroduce);
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesAttak);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesEnd);
    this.loadImages(this.imagesHurt);
    this.x = 2500;
    this.y = 0;
    this.checkIsMuted();
    this.animateIntroduce();
    this.checkPositiontoCharakter();
  }

  /**
 * This function spawn the endboss.
 */
  animateIntroduce() {
    let currentImage = 0;
    const intervalId = setInterval(() => {
      let path = this.imagesIntroduce[currentImage];
      this.img = this.imageCache[path];
      currentImage++;
      if (currentImage >= this.imagesIntroduce.length) {
        clearInterval(intervalId);
        this.animate();
        this.checkColiding();
      }
    }, 250);
  }

  /**
 * This function animate the endboss.
 */
  animate() {
    let currentImage = 0;
    setInterval(() => {
      let timepassed = new Date().getTime() - this.hurt;
      timepassed = timepassed / 1000;
      let timepassed2 = new Date().getTime() - this.lastAttak;
      timepassed2 = timepassed2 / 1000;
      if (timepassed < 1) {this.bossHurt();} 
      else if (this.isDead) {this.bossDead();} 
      else if (this.isColl == true && timepassed2 > 2) {this.bossAttak();} 
      else if (this.end == false) {this.bossSwim();}
    }, 250);
  }

  /**
 * This function animate the hurt from the endboss.
 */
  bossHurt(){
    this.playAnimation(this.imagesHurt);
        this.speey = 0;
  }

  /**
 * This function animate the dead from the endboss.
 */
  bossDead(){
    this.playAnimationDead(this.imagesDead);
        const animationDuration = this.imagesDead.length * 250;
        this.end = true;
        let highestIntervalId = setInterval(() => {}, 1000);
        for (let i = 0; i <= highestIntervalId; i++) {
          clearInterval(i);
        }
        gamestatus = "end";
        endGame("win");
  }

  /**
 * This function animate the attak from the endboss.
 */
  bossAttak(){
    this.playAnimation(this.imagesAttak);
    if (this.isMuted == false) {
      this.walAttack.play();
    }
    this.lastAttak = new Date().getTime();
    world.character.hitPoison();
    world.Lifebar.setPercentage(20, "Lifebar", world.Lifebar.images);
  }

  /**
 * This function animate the simming from the endboss.
 */
  bossSwim(){
    this.playAnimation(this.imagesSwim);
        this.x -= this.speedX;
  }

  /**
 * This function check the colision with the endboss.
 */
  checkColiding() {
    setInterval(() => {
      world.level.endboss.forEach((enemy, index) => {
        if (world.character.isColliding(enemy)) {
          this.isColl = true;
        } else {
          this.isColl = false;
        }
      });
    }, 250);
  }

  /**
   * This function check the position from the endboss to the character and stop the swimming.
   */
  checkPositiontoCharakter(){
    setInterval(() => {
      if (world.character.x + 180 > this.x){
        this.speedX = 0
      } else {
        this.speedX = 25
      }
    }, 250);
  }

  /**
 * This function detect the hit at the endboss.
 */
  hitEnemy(removeCallback) {
    if (this.life > 0 && world.poisonBubble > 0) {
      this.life -= 20;
    } else if (this.life > 0 && world.poisonBubble == 0) {
      this.life -= 10;
    } else {
      this.isDead = true;
    }
  }

  /**
 * This function set a timer for hurt.
 */
  setHurt() {
    this.hurt = new Date().getTime();
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