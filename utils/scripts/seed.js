//const express = require('express');
const mongoose = require('mongoose');

const { User, Role, Customer, Permission } = require('../../database/models');

const {
  CustomersSamples,
  PermissionsSamples,
  RolesSamples,
  UsersSamples,
} = require('../../database/samples');

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
    const seededPermissions = await Permission.create(PermissionsSamples);
    console.log(`Seeded ${seededPermissions.length} permissions`);

    console.log('Seeding Roles');
    const seededRoles = await Role.create(
      RolesSamples.map((role) => ({
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

const seedUsersAndCustomers = async () => {
  try {
    console.log('Clearing existing Customers and Users');
    await Promise.all([Customer.deleteMany(), User.deleteMany()]);

    console.log('Seeding Customers');
    const seededCustomers = await Customer.create(CustomersSamples);
    console.log(`Seeded ${seededCustomers.length} customers`);

    console.log('Seeding Users');
    const roles = await Role.find();
    const seededUsers = await User.create(
      UsersSamples.map((user) => ({
        ...user,
        customer: seededCustomers.find(
          (customer) => customer.customerName === user.customer.customerName
        )?._id,
        role: roles.find((role) => role.name === user.role.name)?._id,
      }))
    );
    console.log(`Seeded ${seededUsers.length} users`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Finished seeding Users and Customers');
  }
};

const seedHaccps = async () => {
  //TODO: Create haccp object in /database/samples and seed them here
};
const seed = async () => {
  try {
    await seedRolesAndPermissions();
    await seedUsersAndCustomers();
    await seedHaccps();
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
