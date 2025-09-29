import { Scene } from "phaser";
import { Character } from "../gameObjects/CharacterConf";

export class GameScene extends Scene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.chosenClass = data.chosenClass;
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    this.add
      .image(centerX, centerY, "bg")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0.5, 0.5);

    this.platform = this.add
      .rectangle(
        centerX,
        screenHeight - screenHeight / 16,
        screenWidth,
        screenHeight / 8,
        0x444444,
        1
      )
      .setOrigin(0.5);

    const strength = Phaser.Math.Between(1, 3);
    const stamina = Phaser.Math.Between(1, 3);
    const agility = Phaser.Math.Between(1, 3);

    this.player = new Character(
      this,
      screenWidth * 0.25,
      screenHeight - (3 * screenHeight) / 16,
      {
        strength,
        stamina,
        agility,
        hp: this.chosenClass.hp + stamina,
        weapon: this.chosenClass.startWeapon,
      }
    );

    this.player.maxHp = this.player.hp;

    this.createHud();
  }

  createHud() {
    const padding = 20;
    const barWidth = 200;
    const barHeight = 30;

    this.hpBarBg = this.add
      .rectangle(
        padding + barWidth / 2,
        padding + barHeight / 2,
        barWidth,
        barHeight,
        0x000000
      )
      .setStrokeStyle(2, 0xffffff)
      .setOrigin(0.5);

    this.hpBarFill = this.add
      .rectangle(
        padding + barWidth / 2,
        padding + barHeight / 2,
        barWidth,
        barHeight,
        0xff4444
      )
      .setOrigin(0.5);

    this.hpText = this.add
      .text(
        padding + barWidth / 2,
        padding + barHeight / 2,
        `${this.player.hp} / ${this.player.maxHp}`,
        {
          fontSize: "18px",
          color: "#ffffff",
        }
      )
      .setOrigin(0.5);

    const statsX = padding;
    let statsY = padding + barHeight + 10;

    this.statsTexts = [];

    this.statsTexts.push(
      this.add.text(statsX, statsY, `Сила: ${this.player.strength}`, {
        fontSize: "18px",
        color: "#ffffff",
      })
    );

    statsY += 25;
    this.statsTexts.push(
      this.add.text(statsX, statsY, `Ловкость: ${this.player.agility}`, {
        fontSize: "18px",
        color: "#ffffff",
      })
    );

    statsY += 25;
    this.statsTexts.push(
      this.add.text(statsX, statsY, `Выносливость: ${this.player.stamina}`, {
        fontSize: "18px",
        color: "#ffffff",
      })
    );

    statsY += 25;
    this.weaponText = this.add.text(
      statsX,
      statsY,
      `Оружие: ${this.player.weapon.displayName || this.player.weapon}`,
      { fontSize: "18px", color: "#ffcc00" }
    );
  }

  update() {
    this.updateHud();
  }

  updateHud() {
    const barWidth = 200;
    const hpPercent = Phaser.Math.Clamp(
      this.player.hp / this.player.maxHp,
      0,
      1
    );

    this.hpBarFill.width = barWidth * hpPercent;

    this.hpText.setText(`${this.player.hp} / ${this.player.maxHp}`);
  }
}
