const recipes = [
  {
    name: 'Waldorf Salad',
    haccp: [
      { name: 'Chilled storage' },
      { name: 'Preparation' },
      { name: 'Display cold' },
    ], //TODO: ensure that I'm getting all HACCPS when seeding,
    recipeAction: {
      keep: ['Keep cold'],
      use: ['Cold holding'],
    },
    image: '',
  },
  {
    name: 'Rice with Vegetables',
    haccp: [
      { name: 'Defrosting' },
      { name: 'Dry storage' },
      { name: 'Preparation' },
      { name: 'Cooking' },
    ], //TODO: ensure that I'm getting all HACCPS,
    recipeAction: {
      use: ['Hot holding'],
    },
    image: '',
  },
  {
    name: 'Wellington filet',
    haccp: [
      { name: 'Cold storage' },
      { name: 'Dry storage' },
      { name: 'Frozen storage' },
      { name: 'Preparation' },
      { name: 'Hot hold' },
    ], //TODO: ensure that I'm getting all HACCPS,
    recipeAction: {
      keep: ['Freeze', 'Keep cold'],
      use: ['Hot holding', 'Cold holding'],
    },
    image: '',
  },
];

module.exports = recipes;
