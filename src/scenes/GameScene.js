import { Scene } from "phaser";
import { Character } from "../gameObjects/Character";
import { Monster } from "../gameObjects/Monster";
import { monsters } from "../constants/Monsters";

export class GameScene extends Scene {
  constructor() {
    super("GameScene");
  }

  init({ characterConf, fightNum }) {
    this.characterConf = characterConf;
    this.fightNum = fightNum;
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

    this.player = new Character(
      this,
      screenWidth * 0.25,
      screenHeight - (3 * screenHeight) / 16,
      this.characterConf
    );
    this.player.maxHp = this.player.hp;

    const randomMonster =
      Object.values(monsters)[
        Phaser.Math.Between(0, Object.values(monsters).length - 1)
      ];

    this.monster = new Monster(
      this,
      screenWidth * 0.75,
      screenHeight - (3 * screenHeight) / 16,
      {
        strength: randomMonster.strength,
        stamina: randomMonster.stamina,
        agility: randomMonster.agility,
        hp: randomMonster.hp + randomMonster.stamina,
        weaponDamage: randomMonster.weaponDamage,
        displayName: randomMonster.displayName,
        reward: randomMonster.reward,
      }
    );
    this.monster.maxHp = this.monster.hp;

    this.createPlayerHud();
    this.createMonsterHud();

    this.turnNum = 1;

    if (this.player.agility >= this.monster.agility) {
      this.currentTurn = "player";
    } else {
      this.currentTurn = "monster";
    }

    this.time.delayedCall(2000, () => this.nextTurn());
  }

  createPlayerHud() {
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
        { fontSize: "18px", color: "#ffffff" }
      )
      .setOrigin(0.5);

    let statsX = padding;
    let statsY = padding + barHeight + 10;

    this.add.text(statsX, statsY, `Сила: ${this.player.strength}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;

    this.add.text(statsX, statsY, `Ловкость: ${this.player.agility}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;

    this.add.text(statsX, statsY, `Выносливость: ${this.player.stamina}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;

    this.add.text(
      statsX,
      statsY,
      `Оружие: ${this.player.weapon.displayName || this.player.weapon}`,
      { fontSize: "18px", color: "#ffcc00" }
    );
  }

  createMonsterHud() {
    const padding = 20;
    const barWidth = 200;
    const barHeight = 30;
    const screenWidth = this.scale.width;

    this.monsterHpBarBg = this.add
      .rectangle(
        screenWidth - padding - barWidth / 2,
        padding + barHeight / 2,
        barWidth,
        barHeight,
        0x000000
      )
      .setStrokeStyle(2, 0xffffff)
      .setOrigin(0.5);

    this.monsterHpBarFill = this.add
      .rectangle(
        screenWidth - padding - barWidth / 2,
        padding + barHeight / 2,
        barWidth,
        barHeight,
        0xff4444
      )
      .setOrigin(0.5);

    this.monsterHpText = this.add
      .text(
        screenWidth - padding - barWidth / 2,
        padding + barHeight / 2,
        `${this.monster.hp} / ${this.monster.maxHp}`,
        { fontSize: "18px", color: "#ffffff" }
      )
      .setOrigin(0.5);

    let statsX = screenWidth - padding - barWidth;
    let statsY = padding + barHeight + 10;

    this.add.text(statsX, statsY, this.monster.displayName, {
      fontSize: "20px",
      color: "#ffcc00",
    });
    statsY += 30;

    this.add.text(statsX, statsY, `Сила: ${this.monster.strength}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;

    this.add.text(statsX, statsY, `Ловкость: ${this.monster.agility}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;

    this.add.text(statsX, statsY, `Выносливость: ${this.monster.stamina}`, {
      fontSize: "18px",
      color: "#ffffff",
    });
    statsY += 25;
  }

  playerAttack(player, monster) {
    const hitChance = Phaser.Math.Between(1, player.agility + monster.agility);

    if (hitChance > monster.agility) {
      monster.hp -= player.strength + player.weapon.damage;
    }

    if (monster.hp < 0) {
      monster.hp = 0;
      this.scene.start("WeaponSelectScene", {
        currentWeapon: this.player.weapon,
        rewardWeapon: this.monster.reward,
        characterConf: this.characterConf,
        fightNum: this.fightNum,
      });
    }

    this.currentTurn = "monster";
    this.turnNum++;
    this.updateHpBars();

    if (monster.hp > 0) {
      this.time.delayedCall(2000, () => this.nextTurn());
    }
  }

  monsterAttack(monster, player) {
    const hitChance = Phaser.Math.Between(1, player.agility + monster.agility);

    if (hitChance > player.agility) {
      player.hp -= monster.strength + monster.weaponDamage;
    }

    if (player.hp <= 0) {
      player.hp = 0;
      this.scene.start("GameOverScene");
    }

    this.currentTurn = "player";
    this.turnNum++;
    this.updateHpBars();

    if (player.hp > 0) {
      this.time.delayedCall(2000, () => this.nextTurn());
    }
  }

  nextTurn() {
    if (this.currentTurn === "player") {
      this.playerAttack(this.player, this.monster);
    } else {
      this.monsterAttack(this.monster, this.player);
    }
  }

  updateHpBars() {
    const playerHpPercent = this.player.hp / this.player.maxHp;
    this.hpBarFill.width = 200 * playerHpPercent;
    this.hpText.setText(`${this.player.hp} / ${this.player.maxHp}`);

    const monsterHpPercent = this.monster.hp / this.monster.maxHp;
    this.monsterHpBarFill.width = 200 * monsterHpPercent;
    this.monsterHpText.setText(`${this.monster.hp} / ${this.monster.maxHp}`);
  }
}
