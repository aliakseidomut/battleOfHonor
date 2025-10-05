import { Scene } from "phaser";

const displayWeaponType = {
  slashing: "Рубящий",
  blunt: "Дробящий",
  piercing: "Колющий",
};

export class WeaponSelectScene extends Scene {
  constructor() {
    super("WeaponSelectScene");
  }

  init(data) {
    this.weapons = [
      { weapon: data.currentWeapon, label: "Текущее оружие" },
      { weapon: data.rewardWeapon, label: "Новое оружие" },
    ];

    this.characterConf = data.characterConf;
    this.fightNum = data.fightNum;
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    this.add
      .image(centerX, centerY, "bg")
      .setDisplaySize(screenWidth, screenHeight)
      .setOrigin(0.5);

    this.add.rectangle(
      centerX,
      centerY,
      screenWidth,
      screenHeight,
      0x000000,
      0.5
    );

    this.add
      .text(centerX, 80, "Выберите оружие", {
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const cardSpacing = 500;
    const startX = centerX - cardSpacing / 2;
    const startY = centerY;
    const cardWidth = 400;
    const cardHeight = 300;

    this.weapons.forEach((entry, i) => {
      const x = startX + i * cardSpacing;

      const card = this.add
        .rectangle(x, startY, cardWidth, cardHeight, 0x222222, 0.8)
        .setStrokeStyle(4, 0xffffff)
        .setInteractive({ useHandCursor: true });

      const paddingX = 20;
      const textX = x - cardWidth / 2 + paddingX;

      this.add
        .text(textX, startY - 120, entry.label, {
          fontSize: "28px",
          color: "#ffbb00ff",
        })
        .setOrigin(0, 0.5);

      this.add
        .text(textX, startY - 60, entry.weapon.displayName, {
          fontSize: "32px",
          color: "#ffffff",
        })
        .setOrigin(0, 0.5);

      this.add
        .text(
          textX,
          startY,
          `Урон: ${entry.weapon.damage}\nТип: ${
            displayWeaponType[entry.weapon.type]
          }`,
          {
            fontSize: "25px",
            color: "#ffffff",
            wordWrap: { width: cardWidth - paddingX * 2 },
            align: "left",
          }
        )
        .setOrigin(0, 0.5);

      card.on("pointerdown", () => {
        this.selectedWeapon = entry.weapon;

        this.children.list.forEach((child) => {
          if (child.type === "Rectangle" && child.width === cardWidth) {
            child.setStrokeStyle(4, 0xffffff);
          }
        });
        card.setStrokeStyle(4, 0xffcc00);
      });
    });

    const confirmBtn = this.add
      .rectangle(centerX, screenHeight - 100, 300, 60, 0x00aa00)
      .setStrokeStyle(4, 0xffffff)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(centerX, screenHeight - 100, "Подтвердить", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    confirmBtn.on("pointerdown", () => {
      if (!this.selectedWeapon) return;

      this.scene.start("GameScene", {
        characterConf: {
          ...this.characterConf,
          weapon: this.selectedWeapon,
        },
        fightNum: this.fightNum,
      });
    });
  }
}
