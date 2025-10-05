import { weapons } from "./Weapons";

export const characterClasses = {
  robber: {
    displayName: "Разбойник",
    hp: 4,
    weapon: weapons.dagger,
    lvl: 0,
    bonuses: {
      first: {
        description:
          "Скрытая атака: +1 к урону, если ловкость персонажа выше ловкости цели",
        func: function () {},
      },
      second: {
        description: "Ловкость +1",
        func: function () {},
      },
      third: {
        description:
          "Яд: наносит дополнительный +1 урона на втором ходу, +2 на третьем и т.д.",
        func: function () {},
      },
    },
  },
  warrior: {
    displayName: "Воин",
    hp: 5,
    weapon: weapons.sword,
    lvl: 0,
    bonuses: {
      first: {
        description:
          "Порыв к действию: в первый ход наносит двойной урон оружием",
        func: function () {},
      },
      second: {
        description:
          "Щит: -3 к получаемому урону, если сила персонажа выше силы атакующего",
        func: function () {},
      },
      third: {
        description: "Сила +1",
        func: function () {},
      },
    },
  },
  barbarian: {
    displayName: "Варвар",
    hp: 6,
    weapon: weapons.club,
    lvl: 0,
    bonuses: {
      first: {
        description:
          "Ярость: +2 к урону в первые 3 хода, после этого -1 к урону",
        func: function () {},
      },
      second: {
        description:
          "Каменная кожа: получаемый урон снижается на значение выносливости",
        func: function () {},
      },
      third: {
        description: "Выносливость +1",
        func: function () {},
      },
    },
  },
};
