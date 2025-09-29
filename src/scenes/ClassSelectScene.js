import { Scene } from "phaser";
import { characterClasses } from "../constants/CharacterClasses";

export class ClassSelectScene extends Scene {
  constructor() {
    super("ClassSelectScene");
    this.selectedClass = null;
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .image(centerX, centerY, "bg")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0.5);

    this.add.rectangle(
      centerX,
      centerY,
      this.scale.width,
      this.scale.height,
      0x000000,
      0.5
    );

    this.add
      .text(centerX, 80, "Выберите класс", {
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const cardSpacing = 420;
    const startX = centerX - cardSpacing;
    const startY = centerY;

    const cardWidth = 400;
    const cardHeight = 550;

    characterClasses.forEach((e, i) => {
      const x = startX + i * cardSpacing;

      const card = this.add
        .rectangle(x, startY, cardWidth, cardHeight, 0x222222, 0.8)
        .setStrokeStyle(4, 0xffffff)
        .setInteractive({ useHandCursor: true });

      const paddingX = 20;
      const textX = x - cardWidth / 2 + paddingX;

      this.add
        .text(textX, startY - 210, e.displayName, {
          fontSize: "40px",
          color: "#ffbb00ff",
        })
        .setOrigin(0, 0.5);

      this.add
        .text(textX, startY - 150, `Здоровье: ${e.hp}`, {
          fontSize: "25px",
          color: "#ffffff",
        })
        .setOrigin(0, 0.5);

      this.add
        .text(textX, startY - 100, `Оружие: ${e.startWeapon.displayName}`, {
          fontSize: "25px",
          color: "#ffffff",
        })
        .setOrigin(0, 0.5);

      this.add
        .text(textX, startY, e.bonuses.first.description, {
          fontSize: "25px",
          color: "#ffffff",
          wordWrap: { width: cardWidth - paddingX * 2 },
          align: "left",
        })
        .setOrigin(0, 0.5);

      card.on("pointerdown", () => {
        this.selectedClass = e;

        this.children.list.forEach((child) => {
          if (child.type === "Rectangle" && child.width === cardWidth) {
            child.setStrokeStyle(4, 0xffffff);
          }
        });
        card.setStrokeStyle(4, 0xffcc00);
      });
    });

    const startBtn = this.add
      .rectangle(centerX, this.scale.height - 100, 300, 60, 0x00aa00)
      .setStrokeStyle(4, 0xffffff)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(centerX, this.scale.height - 100, "Начать игру", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    startBtn.on("pointerdown", () => {
      if (!this.selectedClass) return;

      this.scene.start("GameScene", { chosenClass: this.selectedClass });
    });
  }
}
