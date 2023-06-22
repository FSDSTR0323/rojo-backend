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
    image:
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
    image:
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
    image:
      'https://www.fleischglueck.de/wp-content/uploads/2020/08/filet_wellington_fleischglueck_magazin_teaser.jpg',
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
    image:
      'https://theunlikelybaker.com/wp-content/uploads/2021/02/Chocolate-Strawberry-Ice-Cream-Feature.jpg',
    createdBy: {
      nickname: 'braulioheadchef',
    },
  },
];

module.exports = recipes;
