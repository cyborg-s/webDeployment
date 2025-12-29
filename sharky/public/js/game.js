let canvas;
let world;
let keyboard = new Keyboard();
let gamestatus = "start";
let canvasSize = [720, 480];
let fullscreen = false;
let startAudio = new Audio("./audio/backgrountheme3.mp3");
startAudio.loop = true;
startAudio.volume = 0.2;
let backgroundAudio = new Audio("./audio/backgroundtheme2.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.1;
let endFightAudio = new Audio("./audio/endfight.mp3");
endFightAudio.volume = 0.4;
let offsetY = 0;
let offsetX = 0;
let isMuted = false;


/**
 * This function check, if the game muted.
 */
function checkIsMuted() {
  setInterval(() => {
    if (isMuted == true) {
      startAudio.volume = 0;
      backgroundAudio.volume = 0;
      endFightAudio.volume = 0;
    } else {
      startAudio.volume = 0.2;
      backgroundAudio.volume = 0.1;
      endFightAudio.volume = 0.4;
    }
  }, 250);
}


/**
 * This function initialized the Gamestart.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new Start(canvas, keyboard);
  gamestatus = "start";
  world.isMuted = false;
  checkIsMuted();
}

/**
 * This function initialized the Game beginn.
 */
function initGame() {
  world.isMuted = isMuted;
  world = new World(canvas, keyboard);
  gamestatus = "game";
  startAudio.pause();
  backgroundAudio.play();
}


/**
 * This function initialized the Game end.
 */
function endGame(end) {
  gamestatus = "end";
  world = new End(end, canvas, keyboard);
}


/**
 * This function mute the sound.
 */
function muteGame() {
  if (isMuted == false) {
    isMuted = true;
    world.isMuted = true;
    document.getElementById("mute").classList.remove("dNone");
    document.getElementById("unMute").classList.add("dNone");
  } else {
    isMuted = false;
    world.isMuted = false;
    document.getElementById("mute").classList.add("dNone");
    document.getElementById("unMute").classList.remove("dNone");
  }
}


/**
 * This function restart the Game.
 */
function restart() {
  startGame();
  document.getElementById("restartDiv").classList.add("dNone");
}

let FS = false;


/**
 * This function set fullscreen mode.
 */
function fullscreenDiv() {
  let fullscreenDiv = document.getElementById("fullscreen");
  if (FS == false) {
    FS = true;
    enterFullscreen(fullscreenDiv);
  } else {
    FS = false;
    exitFullscreen(fullscreenDiv);
  }
}

/**
 * This function open the help menu.
 */
function help(){
  document.getElementById('help').classList.remove('dNone')
}

/**
 * This function close the help menu.
 */
function helpExit(){
  document.getElementById('help').classList.add('dNone')
}

/**
 * This function enter the Fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  document.getElementById("canvas").classList.add("fullscreenCanvas");
}

/**
 * This function exit the Fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById("canvas").classList.remove("fullscreenCanvas");
}


/**
 * This function start the Game.
 */
function startGame() {
  gamestatus = "game";
  Endboss.end = false;
  this.initGame();
  document.getElementById("startGameDiv").classList.add("dNone");
}

/**
 * This function detect keydown.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {keyboard.RIGHT = true;}
  if (e.keyCode == 37) {keyboard.LEFT = true;}
  if (e.keyCode == 40) {keyboard.DOWN = true;}
  if (e.keyCode == 38) {keyboard.UP = true;}
  if (e.keyCode == 32) {keyboard.SPACE = true;}
  if (e.keyCode == 68) {keyboard.D = true;}
});

/**
 * This function detect keyup.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {keyboard.RIGHT = false;}
  if (e.keyCode == 37) {keyboard.LEFT = false;}
  if (e.keyCode == 40) {keyboard.DOWN = false;}
  if (e.keyCode == 38) {keyboard.UP = false;}
  if (e.keyCode == 32) {keyboard.SPACE = false;}
  if (e.keyCode == 68) {keyboard.D = false;}
});

  /**
 * This function check the divice has touch.
 */
  function isTouchDevice() {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return true;
    }
  }

  /**
 * This function set the control buttons.
 */
  function checkTouchDevice() {
    if (isTouchDevice()) {
      document.getElementById("controls").classList.remove("dNone");
    } else {
      document.getElementById("controls").classList.add("dNone");
    }
  }

  /**
 * This function check the oriantation of the screen.
 */
  function checkOrientation() {
    const orientation = window.screen.orientation || {};
    const type = orientation.type || "";
    if (isTouchDevice() && type.includes("portrait")) {
      document.getElementById("turn").classList.remove("dNone");
      document.getElementById("impressum").innerHTML = '<a href="./impressum.html">Impressum</a>';
    } else if (isTouchDevice() && type.includes("landscape")) {
      document.getElementById("turn").classList.add("dNone");
      document.getElementById("impressum").innerHTML = '<a href="./impressum.html">i</a>';
    } else if(!isTouchDevice()){
      document.getElementById("turn").classList.add("dNone");
      document.getElementById("impressum").innerHTML = '<a href="./impressum.html">Impressum</a>';
    }
  }

  /**
 * This function check the resize from the window.
 */
  window.addEventListener("resize", () => {
    checkTouchDevice();
    checkOrientation();
  });

  /**
 * This function check if the orientation switch.
 */
  window.addEventListener("orientationchange", () => {
    checkOrientation();
  });


  /**
 * This function ensures that everything is loaded.
 */
  document.addEventListener("DOMContentLoaded", () => {
    isTouchDevice();
    checkTouchDevice();
    checkOrientation();
  /**
 * This functions detect witch control button are touched.
 */
  document
    .getElementById("leftButton")
    .addEventListener("touchstart", () => (keyboard.LEFT = true));

  document
    .getElementById("leftButton")
    .addEventListener("touchend", () => (keyboard.LEFT = false));

  document
    .getElementById("upButton")
    .addEventListener("touchstart", () => (keyboard.UP = true));

  document
    .getElementById("upButton")
    .addEventListener("touchend", () => (keyboard.UP = false));

  document
    .getElementById("rightButton")
    .addEventListener("touchstart", () => (keyboard.RIGHT = true));

  document
    .getElementById("rightButton")
    .addEventListener("touchend", () => (keyboard.RIGHT = false));

  document
    .getElementById("downButton")
    .addEventListener("touchstart", () => (keyboard.DOWN = true));

  document
    .getElementById("downButton")
    .addEventListener("touchend", () => (keyboard.DOWN = false));

  document
    .getElementById("actionButton")
    .addEventListener("touchstart", () => (keyboard.D = true));

  document
    .getElementById("actionButton")
    .addEventListener("touchend", () => (keyboard.D = false));

  document
    .getElementById("action2Button")
    .addEventListener("touchstart", () => (keyboard.SPACE = true));

  document
    .getElementById("action2Button")
    .addEventListener("touchend", () => (keyboard.SPACE = false));
  });

/**
 * This functions prevents the context menu.
 */
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('touchstart', (event) => {
    event.preventDefault();
  });
});

document.addEventListener('contextmenu', (event) => {
  if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
  }
});