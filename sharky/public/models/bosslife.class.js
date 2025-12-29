class Bosslifebar extends Statusbar {
    images = [
      "img/4. Marcadores/green/Life/0_  copia 3.png",
      "img/4. Marcadores/green/Life/20_ copia 4.png",
      "img/4. Marcadores/green/Life/40_  copia 3.png",
      "img/4. Marcadores/green/Life/60_  copia 3.png",
      "img/4. Marcadores/green/Life/80_  copia 3.png",
      "img/4. Marcadores/green/Life/100_  copia 2.png",
    ];
  
    constructor() {
      super();
      this.loadImages(this.images);
      this.x = 500;
      this.y = 40;
      this.height = 60;
      this.width = 220;
      this.setPercentage(0, "Bosslife", this.images);
    }
  }
  