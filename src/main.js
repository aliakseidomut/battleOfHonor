import { Game } from "phaser";
import { Preloader } from "./preloader";
import { MenuScene } from "./scenes/MenuScene";
import { ClassSelectScene } from "./scenes/ClassSelectScene";
import { GameScene } from "./scenes/GameScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { WeaponSelectScene } from "./scenes/WeaponSelectScene";

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
  scene: [
    Preloader,
    MenuScene,
    ClassSelectScene,
    GameScene,
    GameOverScene,
    WeaponSelectScene,
  ],
};

new Game(config);

