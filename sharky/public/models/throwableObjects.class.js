class ThrowableObjects extends movableOvject {
  speedY = 5;
  speedX = 10;
  acceleration = -0.55;
  height = 50;
  width = 50;
  poisonBubble = world.poisonBubble;
  setPoisionAttak = world.setPoision;
  otherDirection = false;

  bubblesAttack = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  poisonedBubblesAttack = [
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];

  constructor(x, y) {
    super().loadImg("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.loadImages(this.bubblesAttack);
    this.loadImages(this.poisonedBubblesAttack);
    this.throw();
  }

  /**
 * This function throw the bubble.
 */
  throw() {
    if (this.setPoisionAttak == true) {
      this.throwPoisoned();
    }

    this.applyGravityBubble(this.speedY, this.speedX, this.acceleration);
  }

  /**
 * This function throw the poisionbubble.
 */
  throwPoisoned() {
    let poisonB = this.poisonBubble;
    if (poisonB > 0) {
      this.loadImg(
        "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
      );
      world.poisonBubble -= 1;
      world.Poisonbar.setPercentage(-20, "Poisonbar", world.Poisonbar.imagesPoison);
    } else {
      this.loadImg("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    }
  }
}