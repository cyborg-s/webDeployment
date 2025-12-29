class Coin extends movableOvject {
  height = 50;
  width = 50;
  static coins = [];

  imagesCoin = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  constructor() {
    super().loadImg(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png"
    );
    this.loadImages(this.imagesCoin);

    this.x = 350 + Math.random() * 2000;
    this.y = 100 + Math.random() * 240;
    this.speed = 0.15 + Math.random() * 0.25;
    Coin.coins.push({ x: this.x, y: this.y });

    this.animate();
  }

  /**
 * This function animate the coins.
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesCoin);
    }, 500);
  }
}
