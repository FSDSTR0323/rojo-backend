const mongoose = require('mongoose');

const {
  User,
  Role,
  Customer,
  Permission,
  Haccp,
  Recipe,
} = require('../../database/models');

const {
  CustomersSamples,
  PermissionsSamples,
  RolesSamples,
  UsersSamples,
  HaccpsSamples,
  RecipesSamples,
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
  }
};

const seedHaccps = async () => {
  console.log('Clearing existing HACCPs');
  await Promise.all([Haccp.deleteMany()]);

  const sortedHaccps = HaccpsSamples.map((haccp, index) => ({
    ...haccp,
    order: index,
  }));

  try {
    console.log('Seeding HACCPS');
    const seededHaccps = await Haccp.create(sortedHaccps);
    console.log(`Seeded ${seededHaccps.length} Haccp rules`);
  } catch (error) {
    console.log(error);
  }
};

const formatRecipeForMongo = async (recipe) => {
  try {
    const filter = {
      ingredientsStatus: { $in: recipe.ingredientsStatus },
      $or: [],
    };

    const { keep, use } = recipe.action;

    if (keep && keep.length > 0)
      filter.$or.push({ 'action.keep': { $in: keep } });

    if (use && use.length > 0) filter.$or.push({ 'action.use': { $in: use } });

    if (filter.$or.length === 0) delete filter.$or;

    const haccps = await Haccp.find(filter).select('_id');

    const createdByUserId = await User.findOne({
      nickname: recipe.createdBy.nickname,
    }).select('_id');

    return {
      name: recipe.name,
      haccps,
      action: recipe.action,
      image: recipe.image,
      createdBy: createdByUserId,
    };
  } catch (error) {
    console.log(error);
  }
};

const seedRecipes = async () => {
  console.log('Clearing existing Recipes');
  await Promise.all([Recipe.deleteMany()]);

  try {
    const recipes = await Promise.all(
      RecipesSamples.map((recipe) => formatRecipeForMongo(recipe))
    );
    const seededRecipes = await Recipe.create(recipes);
    console.log(`Seeded ${seededRecipes.length} recipes`);
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  try {
    await seedRolesAndPermissions();
    await seedUsersAndCustomers();
    await seedHaccps();
    await seedRecipes();
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
