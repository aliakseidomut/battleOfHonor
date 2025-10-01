import { Scene } from "phaser";

export class GameOverScene extends Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .rectangle(
        centerX,
        centerY,
        this.scale.width,
        this.scale.height,
        0x000000,
        0.7
      )
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY - 100, "Вы проиграли", {
        fontSize: "48px",
        color: "#ff4444",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const button = this.add
      .text(centerX, centerY + 50, "Начать заново", {
        fontSize: "32px",
        color: "#ffffff",
        backgroundColor: "#444444",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    button.on("pointerover", () => {
      button.setStyle({ backgroundColor: "#666666" });
    });

    button.on("pointerout", () => {
      button.setStyle({ backgroundColor: "#444444" });
    });

    button.on("pointerdown", () => {
      this.scene.start("ClassSelectScene");
    });
  }
}
