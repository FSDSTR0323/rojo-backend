const customers = require('./customers.sample');
const roles = require('./roles.sample');

const users = [
  {
    customer: customers[0],
    firstName: 'Paco',
    lastName: 'Viruelas',
    nickname: 'pacoowner',
    password: '12345',
    email: 'paco.viruelas@gmail.com',
    profileImageUrl:
      'https://www.hoala.es/wp-content/uploads/2018/02/paco-conde-240.jpg',
    role: roles[0],
  },
  {
    customer: customers[0],
    firstName: 'Braulio',
    lastName: 'Viruelas',
    nickname: 'braulioheadchef',
    password: '12345',
    email: 'braulio.viruelas@gmail.com',
    profileImageUrl:
      'https://eurovision-spain.com/wp-content/uploads/2020/12/braulio.jpg',
    role: roles[1],
  },
  {
    customer: customers[0],
    firstName: 'Aurelio',
    lastName: 'Mindundi',
    nickname: 'aureliochef',
    password: '12345',
    email: 'aurelio.mindundi@gmail.com',
    profileImageUrl:
      'https://pbs.twimg.com/profile_images/1361397450842464257/1SMekLxF_400x400.jpg',
    role: roles[2],
  },
];

module.exports = users;
