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
    role: roles[0],
  },
  {
    customer: customers[0],
    firstName: 'Braulio',
    lastName: 'Viruelas',
    nickname: 'braulioheadchef',
    password: '12345',
    email: 'braulio.viruelas@gmail.com',
    role: roles[1],
  },
  {
    customer: customers[0],
    firstName: 'Aurelio',
    lastName: 'Mindundi',
    nickname: 'aureliochef',
    password: '12345',
    email: 'aurelio.mindundi@gmail.com',
    role: roles[2],
  },
];

module.exports = users;
