const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');

const recipes = [
  {
    name: 'Waldorf Salad',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED],
    action: {
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
      use: ['Hot holding', 'Re-heating'],
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
      keep: ['Freeze', 'Cooling'],
      use: ['Hot holding', 'Cold holding'],
    },
    image: '',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    name: 'Chocolate ice-cream with strawberries',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED, INGREDIENTS_STATUS.FROZEN],
    action: {
      keep: ['Freeze'],
    },
    image: '',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
];

module.exports = recipes;
