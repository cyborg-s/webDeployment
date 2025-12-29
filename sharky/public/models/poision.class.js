class Poisons extends movableOvject {
  height = 90;
  width = 70;
  static poisons = [];

  imagesSwim = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor() {
    super().loadImg("img/4. Marcadores/Posión/Animada/1.png");
    this.loadImages(this.imagesSwim);

    this.x = 350 + Math.random() * 2000;
    this.y = 320;
    this.speed = 0.15 + Math.random() * 0.25;
    Poisons.poisons.push({ x: this.x, y: this.y });
    this.animate();
  }

  /**
 * This function animate the poitionbottle.
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesSwim);
    }, 250);
  }
}