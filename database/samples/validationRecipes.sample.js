const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');

const customers = require('./customers.sample');

const validationRecipes = [
  {
    customer: customers[0],
    recipe: { name: 'Waldorf Salad' },
    validationName: 'Waldorf Salad - To serve',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED],
    steps: [
      {},
      {
        haccp: { name: 'Preparation' },
        valid: true,
      },
    ],
    createdBy: {
      nickname: 'aureliochef',
    },
  },
  {
    customer: customers[0],
    name: 'Rice with Vegetables',
    recipe: { name: 'Waldorf Salad' },
    ingredientsStatus: [INGREDIENTS_STATUS.FROZEN, INGREDIENTS_STATUS.DRY],
    action: {
      use: ['Hot holding', 'Re-heating'],
    },
    createdBy: {
      nickname: 'aureliochef',
    },
  },
  {
    customer: customers[0],
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
    imageUrl:
      'https://www.fleischglueck.de/wp-content/uploads/2020/08/filet_wellington_fleischglueck_magazin_teaser.jpg',
    createdBy: {
      nickname: 'aureliochef',
    },
  },
  {
    customer: customers[0],
    name: 'Chocolate ice-cream with strawberries',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED, INGREDIENTS_STATUS.FROZEN],
    action: {
      keep: ['Freeze'],
    },
    imageUrl:
      'https://theunlikelybaker.com/wp-content/uploads/2021/02/Chocolate-Strawberry-Ice-Cream-Feature.jpg',
    createdBy: {
      nickname: 'aureliochef',
    },
  },
];

module.exports = validationRecipes;
