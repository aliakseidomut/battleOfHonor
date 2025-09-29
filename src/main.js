import { Game } from "phaser";
import { Preloader } from "./preloader";
import { MenuScene } from "./scenes/MenuScene";
import { ClassSelectScene } from "./scenes/ClassSelectScene";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#000000ff",
  pixelArt: true,
  roundPixel: false,
  max: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Preloader, MenuScene, ClassSelectScene],
};

new Game(config);

