export const characterClasses = [
  {
    name: "robber",
    displayName: "Разбойник",
    hp: 4,
    startWeapon: {
      name: "dagger",
      displayName: "Кинжал",
      damage: 2,
      type: "piercing",
    },
    bonuses: {
      first: {
        description:
          "Скрытая атака: +1 к урону, если ловкость персонажа выше ловкости цели",
        func: function (character, target) {
          if (character.dexterity > target.dexterity) {
            character.damage += 1;
          }
        },
      },
      second: {
        description: "Ловкость +1",
        func: function (character) {
          character.dexterity += 1;
        },
      },
      third: {
        description:
          "Яд: наносит дополнительный +1 урона на втором ходу, +2 на третьем и т.д.",
        func: function (character, turn) {
          if (turn >= 2) {
            character.damage += turn - 1;
          }
        },
      },
    },
  },
  {
    name: "warrior",
    displayName: "Воин",
    hp: 5,
    startWeapon: {
      name: "sword",
      displayName: "Меч",
      damage: 3,
      type: "slashing",
    },
    bonuses: {
      first: {
        description:
          "Порыв к действию: в первый ход наносит двойной урон оружием",
        func: function (character, turn) {
          if (turn === 1) {
            character.damage += character.weaponDamage;
          }
        },
      },
      second: {
        description:
          "Щит: -3 к получаемому урону, если сила персонажа выше силы атакующего",
        func: function (character, attacker) {
          if (character.strength > attacker.strength) {
            character.incomingDamageReduction =
              (character.incomingDamageReduction || 0) + 3;
          }
        },
      },
      third: {
        description: "Сила +1",
        func: function (character) {
          character.strength += 1;
        },
      },
    },
  },
  {
    name: "barbarian",
    displayName: "Варвар",
    hp: 6,
    startWeapon: {
      name: "club",
      displayName: "Дубина",
      damage: 3,
      type: "blunt",
    },
    bonuses: {
      first: {
        description:
          "Ярость: +2 к урону в первые 3 хода, после этого -1 к урону",
        func: function (character, turn) {
          if (turn <= 3) {
            character.damage += 2;
          } else {
            character.damage -= 1;
          }
        },
      },
      second: {
        description:
          "Каменная кожа: получаемый урон снижается на значение выносливости",
        func: function (character) {
          character.incomingDamageReduction =
            (character.incomingDamageReduction || 0) + character.endurance;
        },
      },
      third: {
        description: "Выносливость +1",
        func: function (character) {
          character.endurance += 1;
        },
      },
    },
  },
];
