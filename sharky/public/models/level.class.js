class Level {
  enemiesShock;
  enemiesPoison;
  backgroundObjects;
  endboss;
  water;
  coins;
  poisons;
  levelEndX = 2160;

  constructor(enemiesSchock, enemiesPoison, endboss, water, backgroundObjects, coins, poisons, start) {
    this.enemiesShock = enemiesSchock;
    this.enemiesPoison = enemiesPoison;
    this.water = water;
    this.endboss = endboss;
    this.coins = coins;
    this.poisons = poisons
    this.backgroundObjects = backgroundObjects;
  }
}
