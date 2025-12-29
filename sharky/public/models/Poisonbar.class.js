class Poisonbar extends Statusbar {
  imagesPoison = [
    "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesPoison);
    this.x = 0;
    this.y = 80;
    this.height = 60;
    this.width = 230;
    this.setPercentage(0, "Poisonbar", this.imagesPoison);
  }
}
