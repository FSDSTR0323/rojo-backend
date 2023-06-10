const express = require('express');
const mongoose = require('mongoose');

const roles = require('../../database/samples/roles.sample');
const permissions = require('../../database/samples/permissions.sample');
const Role = require('../../database/models/role.model');
const Permission = require('../../database/models/permission.model');

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
  process.env.DB_NAME +
  '_TEST' +
  '?retryWrites=true&w=majority';

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

const seedRolesAndPermissions = async () => {
  try {
    console.log('Clearing existing Roles and Permissions');
    await Promise.all([Permission.deleteMany(), Role.deleteMany()]);

    console.log('Seeding Permissions');
    const seededPermissions = await Permission.create(permissions);
    console.log(`Seeded ${seededPermissions.length} permissions`);

    console.log(seededPermissions);

    console.log('Seeding Roles');
    const seededRoles = await Role.create(
      roles.map((role) => ({
        ...role,
        permissions: role.permissions.map(
          (permission) =>
            seededPermissions.find(
              (seededPermission) => seededPermission.code === permission.code
            )?._id
        ),
      }))
    );
    console.log(`Seeded ${seededRoles.length} roles`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Finished seeding Roles and Permissions');
  }
};

const seedHaccps = async () => {
  //TODO: Create haccp object in /database/samples and seed them here
};

const seedUsersAndCustomers = async () => {
  //TODO: Create users and customers in /database/samples and seed them here
};

const seed = async () => {
  try {
    await seedRolesAndPermissions();
    await seedHaccps();
    await seedUsersAndCustomers();
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
