class Coinbar extends Statusbar {
  imagesCoin = [
    "img/4. Marcadores/green/Coin/0_  copia 4.png",
    "img/4. Marcadores/green/Coin/20_  copia 2.png",
    "img/4. Marcadores/green/Coin/40_  copia 4.png",
    "img/4. Marcadores/green/Coin/60_  copia 4.png",
    "img/4. Marcadores/green/Coin/80_  copia 4.png",
    "img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesCoin);
    this.x = 0;
    this.y = 40;
    this.height = 60;
    this.width = 230;
    this.setPercentage(0, "Coinbar", this.imagesCoin);
  }
}
