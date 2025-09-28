import { Scene } from "phaser";

export class MenuScene extends Scene {
  constructor() {
    super("MenuScene");
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

    this.add.rectangle(centerX, centerY, this.scale.width, 250, 0x000000, 0.7);

    this.add
      .image(centerX, centerY - 40, "logo")
      .setDisplaySize(523, 59)
      .setOrigin(0.5, 0.5);

    const pressText = this.add
      .text(centerX, centerY + 40, "Click to get started", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1);

    this.tweens.add({
      targets: pressText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.once("pointerdown", () => {
      this.scene.start("CharacterSelectScene");
    });
  }
}

