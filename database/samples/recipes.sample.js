const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');

const recipes = [
  {
    name: 'Waldorf Salad',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED],
    action: {
      keep: ['Keep cold'],
      use: ['Cold holding'],
    },
    image: '',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    name: 'Rice with Vegetables',
    ingredientsStatus: [INGREDIENTS_STATUS.FROZEN, INGREDIENTS_STATUS.DRY],
    action: {
      use: ['Hot holding'],
    },
    image: '',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    name: 'Wellington filet',
    ingredientsStatus: [
      INGREDIENTS_STATUS.CHILLED,
      INGREDIENTS_STATUS.DRY,
      INGREDIENTS_STATUS.FROZEN,
    ],
    action: {
      keep: ['Freeze', 'Keep cold'],
      use: ['Hot holding', 'Cold holding'],
    },
    image: '',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
];

module.exports = recipes;
