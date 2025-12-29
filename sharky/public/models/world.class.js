class World {
  isMuted = world.isMuted;
  character = new Character();
  level;
  start = new Start();
  ctx;
  canvas;
  keyboard;
  cameraX;
  Lifebar = new Lifebar();
  Coinbar = new Coinbar();
  Poisonbar = new Poisonbar();
  Bosslife = new Bosslifebar();
  bubbles = [];
  blubberSound = new Audio("./audio/plop.mp3");
  coinSound = new Audio("./audio/coin.mp3");
  poisonSound = new Audio("./audio/poison.mp3");
  endFightAudio = new Audio("./audio/endfight.mp3");
  endbossSpawned = false;
  enemiesSpawned = false;
  poisonBubble = 0;
  attakD = new Date().getTime();
  setPoision = false;
  lastDamage = 0;
  gameStatus = "start";

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.endFightAudio.loop = true;
    this.setWorld();
    this.run();
    this.draw();
    this.checkPosition();
    this.checkIsMuted();
  }

  /**
 * This function check the game is muted.
 */
  checkIsMuted() {
    setInterval(() => {
      this.isMuted = world.isMuted;
      if (this.isMuted == true) {
        this.stopEndFightSound();
      }
    }, 250);
  }

  /**
 * This function initialized the level 1.
 */
  initLevel() {
    this.level = level1;
  }

  /**
 * This function start the game.
 */
  gameStart() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.level.water);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.start);
  }

  /**
 * This function spwan the enemies.
 */
  spawnEnemies() {
    for (let index = 0; index < 5; index++) {
      const enemiesS = new jellyfish();
      const enemiesP = new Pufferfish();
      this.level.enemiesShock.push(enemiesS);
      this.level.enemiesPoison.push(enemiesP);
    }
  }

  /**
 * This function check the position to spwan the enemy after first move.
 * This function check the position to spwan the endboss after reach the end of the level and set the bubble poisioned.
 */
  checkPosition() {
    setInterval(() => {
      if (this.character.x > 50 && !this.enemiesSpawned) {
        this.spawnEnemies();
        this.enemiesSpawned = true;
      }
      if (this.character.x > 2100 && !this.endbossSpawned) {
        this.spawnEndboss();
      }
      if (this.character.x > 1990) {
        this.setPoision = true;
      }
    }, 250);
  }

  /**
 * This function spawn the endboss.
 */
  spawnEndboss() {
    this.endbossSpawned = true;
    backgroundAudio.pause();
    if (this.isMuted == false) {
      this.endFightAudio.play();
    }
    const endboss = new Endboss();
    this.level.endboss.push(endboss);
  }

  /**
 * This function set the world.
 */
  setWorld() {
    this.character.world = this;
  }

  /**
 * This function stop the endfight sound after win or lose.
 */
  stopEndFightSound() {
    this.endFightAudio.pause();
  }

  /**
 * This function run the game with all parms.
 */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsColactibles();
      this.checkThrowObjects();
      this.checkCollisionsBubbles();
      this.character.setHitAttak();
    }, 200);
  }

  /**
 * This function check interruption and spawn bubbles.
 */
  checkThrowObjects() {
    let timepassed = new Date().getTime() - this.attakD;
    timepassed = timepassed / 1000;
    if (this.keyboard.D && timepassed > 1.5) {
      this.attakD = new Date().getTime();
      let bubble = new ThrowableObjects(
        this.character.x + 180,
        this.character.y + 150
      );
      this.bubbles.push(bubble);
    }
  }

  /**
 * This function collect Coins.
 */
  collectCoin(coin) {
    if (this.isMuted == false) {
      this.coinSound.play();
    }
    this.level.coins = this.level.coins.filter(
      (coin) => !this.character.isColliding(coin)
    );
  }

  /**
 * This function collect poisons.
 */
  collectPoison(poison) {
    if (this.isMuted == false) {
      this.poisonSound.play();
    }
    this.level.poisons = this.level.poisons.filter(
      (poison) => !this.character.isColliding(poison)
    );
  }

  /**
 * This function check the colition from sharky.
 */
  checkCollisions() {
    let timepassed = new Date().getTime() - this.character.finAttak;
    timepassed = timepassed / 1000;
    let timepassed2 = new Date().getTime() - this.lastDamage;
    timepassed2 = timepassed2 / 1000;
    this.level.enemiesShock.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && timepassed2 > 2) {this.checkShockAttak(enemy);}
    });
    this.level.enemiesPoison.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {this.checkPoisonAttak(enemy, timepassed, timepassed2);}
    });
  }

  /**
 * This function check the shock attak.
 */
  checkShockAttak(enemy) {
    enemy.isAttak = true;
    enemy.lastHit = new Date().getTime();
    this.lastDamage = new Date().getTime();
    this.character.hit();
    this.Lifebar.setPercentage(20, "Lifebar", this.Lifebar.images);
  }

  /**
 * This function check the poison attak.
 */
  checkPoisonAttak(enemy, timepassed, timepassed2) {
    if (timepassed < 1) {
      enemy.deadPuffer(() => {
        this.level.enemiesPoison.splice(index, 1);
      });
    } else if (timepassed2 > 2) {
      enemy.isAttak = true;
      enemy.lastHit = new Date().getTime();
      this.lastDamage = new Date().getTime();
      this.character.hitPoison();
      this.Lifebar.setPercentage(20, "Lifebar", this.Lifebar.images);
    }
  }

  /**
 * This function check the collision with the Colactibles.
 */
  checkCollisionsColactibles() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
        this.Coinbar.setPercentage(20, "Coinbar", this.Coinbar.imagesCoin);
      }
    });
    this.level.poisons.forEach((poison) => {
      if (this.character.isColliding(poison)) {
        this.checkCollectPoison(poison);
      }
    });
  }

  /**
 * This function detect the collect from poisons.
 */
  checkCollectPoison(poison) {
    this.collectPoison(poison);
    if (this.Poisonbar.percentagePoison < 100) {
      this.Poisonbar.setPercentage(
        20,
        "Poisonbar",
        this.Poisonbar.imagesPoison
      );
    }
    if (this.poisonBubble < 5) {
      this.poisonBubble += 1;
    }
  }

  /**
 * This function check the bubble collision with jellyfish and endboss.
 */
  checkCollisionsBubbles() {
    this.bubbles.forEach((bubble, i) => {
      this.level.enemiesShock.forEach((enemy, index) => {
        this.checkBubbleHitEnemy(bubble, i, enemy, index);
      });
    });
    this.bubbles.forEach((bubble, i) => {
      this.level.endboss.forEach((enemy, index) => {
        this.checkBubbleHitEndboss(enemy, bubble, i);
      });
    });
  }

  /**
 * This function detect the collision with the enemy.
 */
  checkBubbleHitEnemy(bubble, i, enemy, index) {
    if (enemy.isCollidingEnemy(bubble)) {
      if (this.isMuted == false) {
        this.blubberSound.play();
      }
      this.bubbles.splice(i, 1);
      enemy.deadEnemy(() => {
        this.level.enemiesShock.splice(index, 1);
      });
    }
  }

  /**
 * This function detect the collision with the endboss.
 */
  checkBubbleHitEndboss(enemy, bubble, i) {
    if (enemy.isCollidingEnemy(bubble)) {
      if (this.isMuted == false) {
        this.blubberSound.play();
      }
      enemy.setHurt();
      enemy.hitEnemy();
      this.Bosslife.setPercentage(20, "Bosslife", this.Bosslife.images);
      this.bubbles.splice(i, 1);
    }
  }

  /**
 * This function draw all elements in the canvas.
 */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.water);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.bubbles);
    this.addObjectsToMap(this.level.enemiesShock);
    this.addObjectsToMap(this.level.enemiesPoison);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisons);
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.Lifebar);
    this.addToMap(this.Coinbar);
    this.addToMap(this.Poisonbar);
    this.addToMap(this.Bosslife);
    if (gamestatus == "game") {
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
 * This function adds a list of objects.
 */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
 * This function adds single objects.
 */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
 * This function flip the image while swim in the other direction.
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
 * This function flip the image back.
 */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}