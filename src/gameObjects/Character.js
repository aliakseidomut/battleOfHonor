export class Character {
  constructor(scene, x, y, { strength, stamina, agility, hp, weapon }) {
    this.scene = scene;

    this.sprite = scene.add
      .rectangle(x, y, 80, 120, 0x6666ff)
      .setStrokeStyle(3, 0xffffff);

    this.strength = strength;
    this.stamina = stamina;
    this.agility = agility;
    this.hp = hp;
    this.weapon = weapon;
  }
}
