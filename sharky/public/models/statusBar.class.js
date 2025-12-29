class Statusbar extends DrawableObjects {
  x = 0;
  y = 0;
  height = 60;
  width = 230;

  percentageLife = 100;
  percentagePoison = 0;
  percentageCoin = 0;
  percentageBoss = Endboss.life+20

  /**
 * This function set the percantage for each bar.
 */
  setPercentage(percentage, Bar, images) {
    if (Bar == "Lifebar") {
      this.lifebarpercentage(percentage, images);
    }
    if (Bar == "Coinbar") {
      this.coinbarPercentage(percentage, images);
    }
    if (Bar == "Poisonbar") {
      this.poisonbarPercentage(percentage,images);
    }
    if (Bar == "Bosslife") {
      this.bosslifebarpercentage(percentage, images);
    }
  }

  bosslifebarpercentage(percentage, images){
    this.percentageLife -= percentage;
      let path = images[this.resolveImageIndex(this.percentageLife)];
      this.img = this.imageCache[path];
  }

  /**
 * This function resolve the percentage from the lifebar.
 */
  lifebarpercentage(percentage, images){
    this.percentageLife -= percentage;
      let path = images[this.resolveImageIndex(this.percentageLife)];
      this.img = this.imageCache[path];
  }

  /**
 * This function resolve the percentage from the coinbar.
 */
  coinbarPercentage(percentage, images){
    this.percentageCoin += percentage;
      let path = images[this.resolveImageIndex(this.percentageCoin)];
      this.img = this.imageCache[path];
  }

  /**
 * This function resolve the percentage from the poisionbar.
 */
  poisonbarPercentage(percentage, images){
    this.percentagePoison += percentage;
      let path = images[this.resolveImageIndex(this.percentagePoison)];
      this.img = this.imageCache[path];
  }

  /**
 * This function resolve the image index for the bars. 
 */
  resolveImageIndex(percentage) {
    if (percentage > 100) {percentage = 100;}
    if (percentage == 100) {return 5;} 
    else if (percentage == 80) {return 4;} 
    else if (percentage == 70) {return 4;} 
    else if (percentage == 60) {return 3;} 
    else if (percentage == 50) {return 3;} 
    else if (percentage == 40) {return 2;} 
    else if (percentage == 20) {return 2;} 
    else if (percentage == 20) {return 1;} 
    else if (percentage == 10) {return 1;} 
    else {return 0;}
  }
}