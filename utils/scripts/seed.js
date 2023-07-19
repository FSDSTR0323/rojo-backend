const mongoose = require('mongoose');

const {
  User,
  Role,
  Customer,
  Permission,
  Haccp,
  Recipe,
  Validation,
} = require('../../database/models');

const {
  CustomersSamples,
  PermissionsSamples,
  RolesSamples,
  UsersSamples,
  HaccpsSamples,
  RecipesSamples,
  ValidationsSamples,
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
    console.log('Deleting ROLES & PERMISSIONS');
    await Promise.all([Permission.deleteMany(), Role.deleteMany()]);

    console.log('Seeding PERMISSIONS...');
    const seededPermissions = await Permission.create(PermissionsSamples);
    console.log(`PERMISSIONS: ${seededPermissions.length}`);

    console.log('Seeding ROLES...');
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
    console.log(`ROLES: ${seededRoles.length}`);
  } catch (error) {
    console.log(error);
  }
};

const seedUsersAndCustomers = async () => {
  try {
    console.log('Deleting CUSTOMERS and USERS');
    await Promise.all([Customer.deleteMany(), User.deleteMany()]);

    console.log('Seeding CUSTOMERS...');
    const seededCustomers = await Customer.create(CustomersSamples);
    console.log(`CUSTOMERS: ${seededCustomers.length}`);

    console.log('Seeding USERS...');
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
    console.log(`USERS: ${seededUsers.length}`);
  } catch (error) {
    console.log(error);
  }
};

const seedHaccps = async () => {
  const sortedHaccps = HaccpsSamples.map((haccp, index) => ({
    ...haccp,
    order: index,
  }));

  await seedData(Haccp, sortedHaccps, null, 'haccp');
};

const seedData = async (model, data, formatFunction, modelName) => {
  console.log(`Deleting ${modelName.toUpperCase()}`);
  await model.deleteMany();

  try {
    console.log(`Seeding ${modelName.toUpperCase()}...`);

    let formattedData = [];
    if (formatFunction) {
      formattedData = await Promise.all(
        data.map((item) => formatFunction(item))
      );
    } else {
      formattedData = data;
    }
    const seededData = await model.create(formattedData);
    console.log(`${modelName.toUpperCase()}: ${seededData.length}`);
  } catch (error) {
    console.log(error);
  }
};

const formatRecipeForMongo = async (recipe) => {
  try {
    const foundCustomer = await Customer.findOne(recipe.customer).select('_id');

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
      customer: foundCustomer._id,
      name: recipe.name,
      haccps,
      action: recipe.action,
      imageUrl: recipe.imageUrl,
      createdBy: createdByUserId,
    };
  } catch (error) {
    console.log(error);
  }
};

const seedRecipes = async () => {
  await seedData(Recipe, RecipesSamples, formatRecipeForMongo, 'recipes');
};

const isArraySubset = (subset, superset) =>
  subset.some((element) => superset.includes(element));

const generateRandomBooleans = (validationStatus, length) => {
  // Create an array to store the generated booleans
  var booleanArray = [];

  // If validationStatus is true, return an array of all true values
  if (validationStatus) {
    booleanArray = Array.from({ length }, () => true);
  } else {
    // Generate a random index between 0 and length
    var randomIndex = Math.floor(Math.random() * length);

    // Fill the array with true values except at the random index
    booleanArray = Array.from({ length }, (_, i) =>
      i === randomIndex ? false : true
    );
  }

  return booleanArray;
};

const formatValidationForMongo = async (validation) => {
  const customer = await Customer.findOne(validation.customer).select('_id');

  const recipe = await Recipe.findOne({
    customer: customer._id,
    name: validation.recipe.name,
  })
    .select('_id haccps')
    .populate('haccps');

  const createdBy = await User.findOne(validation.createdBy).select('_id');

  const filteredHaccps = recipe.haccps.filter(
    (haccp) =>
      validation.ingredientsStatus &&
      haccp.ingredientsStatus &&
      isArraySubset(validation.ingredientsStatus, haccp.ingredientsStatus) &&
      ((validation.action.keep &&
        haccp.action.keep &&
        isArraySubset(validation.action.keep, haccp.action.keep)) ||
        (validation.action.use &&
          haccp.action.use &&
          isArraySubset(validation.action.use, haccp.action.use)))
  );

  const validArray = generateRandomBooleans(
    validation.validationStatus,
    filteredHaccps.length
  );

  const steps = filteredHaccps.map((filteredHaccp, index) => {
    const step = {
      haccp: filteredHaccp._id,
      valid: validArray[index],
      comment: !validArray[index] ? 'lorem ipsum dolor sit amet' : undefined,
      correctiveAction: !validArray[index]
        ? filteredHaccp.correctiveActions[0]
        : undefined,
    };
    
    return step;
  });

  return {
    customer,
    recipe: recipe._id,
    name: validation.name,
    steps,
    validationStatus: validation.validationStatus,
    createdBy,
  };
};

const seedValidations = async () => {
  await seedData(
    Validation,
    ValidationsSamples,
    formatValidationForMongo,
    'validations'
  );
};

const seed = async () => {
  try {
    console.log('INITIATING SEEDING PROCESS');
    await seedRolesAndPermissions();
    await seedUsersAndCustomers();
    await seedHaccps();
    await seedRecipes();
    await seedValidations();
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
    console.log('FINISHED SEEDING PROCESS');
  }
};

seed();
