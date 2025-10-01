export class Monster {
  constructor(
    scene,
    x,
    y,
    { strength, stamina, agility, hp, weaponDamage, displayName }
  ) {
    this.scene = scene;

    this.sprite = scene.add
      .rectangle(x, y, 80, 120, 0xff0000)
      .setStrokeStyle(3, 0xffffff);

    this.strength = strength;
    this.stamina = stamina;
    this.agility = agility;
    this.hp = hp;
    this.weaponDamage = weaponDamage;
    this.displayName = displayName;
  }
}
