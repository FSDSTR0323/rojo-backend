const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');

const customers = require('./customers.sample');

const validations = [
  {
    customer: customers[0],
    recipe: { name: 'Waldorf Salad' },
    name: 'Waldorf Salad - To use',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED],
    action: {
      use: ['Cold holding'],
    },
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    customer: customers[0],
    recipe: { name: 'Rice with Vegetables' },
    name: 'Rice with Vegetables - Hot holding',
    ingredientsStatus: [INGREDIENTS_STATUS.FROZEN, INGREDIENTS_STATUS.DRY],
    action: {
      use: ['Hot holding'],
    },
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    customer: customers[0],
    recipe: { name: 'Wellington filet ' },
    name: 'Wellington filet - To freeze and serve hot',
    ingredientsStatus: [
      INGREDIENTS_STATUS.CHILLED,
      INGREDIENTS_STATUS.DRY,
      INGREDIENTS_STATUS.FROZEN,
    ],
    action: {
      keep: ['Freeze'],
      use: ['Hot holding'],
    },
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    customer: customers[0],
    recipe: { name: 'Chocolate ice-cream with strawberries' },
    name: 'Chocolate ice-cream with strawberries',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED, INGREDIENTS_STATUS.FROZEN],
    action: {
      keep: ['Freeze'],
    },
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
];

module.exports = validations;
