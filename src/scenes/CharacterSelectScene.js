import { Scene } from "phaser";

export class CharacterSelectScene extends Scene {
  constructor() {
    super("CharacterSelectScene");
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .image(centerX, centerY, "bg")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0.5, 0.5);

    this.add.rectangle(
      centerX,
      centerY,
      this.scale.width,
      this.scale.height,
      0x000000,
      0.5
    );
  }
}
