const express = require('express');
const mongoose = require('mongoose');

const roles = require('../../database/samples/roles.sample');
const Role = require('../../database/models/role.model');
const Permission = require('../../database/models/permission.model')

require('dotenv').config();

// database connection
const mongoDB =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASSWORD +
  '@' +
  process.env.DB_SERVER +
  '/' +
  process.env.DB_NAME + '_TEST' + 
  '?retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

const seed = async () => {
  const rolesCount = await Role.count({});
  
  console.log(rolesCount)


  if(rolesCount !== 0) {
    console.log('Removing Roles and permissions')
    await Role.deleteMany({})
    await Permission.deleteMany({})
  } else {
    console.log('Seeding Roles and Permissions')
    await Role.insertMany(roles)
  }




  mongoose.connection.close();
};

seed();


