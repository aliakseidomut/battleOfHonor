export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "Preloader" });
  }

  preload() {
    this.load.image("bg", "assets/bg.png");
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.scene.start("MenuScene");
  }
}

