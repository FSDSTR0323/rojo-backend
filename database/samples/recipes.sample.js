const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');

const customers = require('./customers.sample');

const recipes = [
  {
    customer: customers[0],
    name: 'Waldorf Salad',
    ingredientsStatus: [INGREDIENTS_STATUS.CHILLED],
    action: {
      use: ['Cold holding'],
    },
    imageUrl:
      'https://www.daringgourmet.com/wp-content/uploads/2020/01/Waldorf-Salad-9-square-edit-2.jpg',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
  {
    customer: customers[0],
    name: 'Rice with Vegetables',
    ingredientsStatus: [INGREDIENTS_STATUS.FROZEN, INGREDIENTS_STATUS.DRY],
    action: {
      use: ['Hot holding', 'Re-heating'],
    },
    imageUrl:
      'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Mixed-Veggies-and-Rice_EXPS_TOHEDSCODR21_179454_E04_28_2b.jpg',
    createdBy: {
      nickname: 'braulioheadchef',
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
      'https://thebigmansworld.com/wp-content/uploads/2023/02/beef-wellington-recipe.jpg',
    createdBy: {
      nickname: 'braulioheadchef',
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
      nickname: 'braulioheadchef',
    },
  },
];

module.exports = recipes;
