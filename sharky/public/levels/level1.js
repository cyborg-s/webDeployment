/**
 * This function generate the gamelevel.
 */
function createLevel1() {
  return new Level(
    [
      
    ],
    [
      
    ],
    [],
    [
      new Water("img/3. Background/Layers/5. Water/D.png", 0),
      new Water("img/3. Background/Layers/5. Water/D.png", 1439),
      new Water("img/3. Background/Layers/5. Water/D.png", 1439 * 2),
    ],
    [
      new Background("img/3. Background/Layers/4.Fondo 2/D.png", 0),
      new Background("img/3. Background/Layers/3.Fondo 1/D.png", 0),
      new Background("img/3. Background/Layers/2. Floor/D.png", 0),
      new Background("img/3. Background/Layers/1. Light/COMPLETO.png", 0),
      new Background("img/3. Background/Layers/4.Fondo 2/D.png", 1439),
      new Background("img/3. Background/Layers/3.Fondo 1/D.png", 1439),
      new Background("img/3. Background/Layers/2. Floor/D.png", 1439),
      new Background("img/3. Background/Layers/1. Light/COMPLETO.png", 1439),
      new Background("img/3. Background/Layers/4.Fondo 2/D.png", 1439),
      new Background("img/3. Background/Layers/3.Fondo 1/D.png", 1439),
      new Background("img/3. Background/Layers/2. Floor/D.png", 1439),
      new Background("img/3. Background/Layers/1. Light/COMPLETO.png", 1439),
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],
    [
      new Poisons(),
      new Poisons(),
      new Poisons(),
      new Poisons(),
      new Poisons(),
      new Poisons(),
      new Poisons(),
    ]
  );
}