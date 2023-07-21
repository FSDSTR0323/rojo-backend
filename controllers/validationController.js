const { Validation, Recipe } = require('../database');

const getValidationsForCustomer = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const validations = await Validation.find({
      customer: customerId,
      deletedAt: { $exists: false },
    })
      .populate('steps.haccp')
      .exec();

    return res.status(200).json(validations);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addValidation = async (req, res) => {
  const { customerId, id } = req.jwtPayload;
  const { recipe, name, steps } = req.body;

  try {
    const foundRecipe = await Recipe.findById(recipe);

    const validationStatus = steps
      .map((step) => step.valid)
      .reduce((accumulator, current) => accumulator && current, true);

    const newValidation = new Validation({
      customer: customerId,
      recipe,
      name: name || `${foundRecipe.name} - Validation`,
      steps,
      validationStatus,
      createdBy: id,
    });

    const savedValidation = await newValidation.save();
    return res.status(200).json(savedValidation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteValidation = async (req, res) => {
  const { id, customerId } = req.jwtPayload;
  const validationId = req.params.validationId;

  try {
    const existingValidation = await Validation.findOneAndUpdate(
      { _id: validationId, customer: customerId },
      {
        $set: {
          deletedAt: new Date(),
          deletedBy: id,
        },
      }
    );

    if (!existingValidation)
      return res.status(404).json({
        error: {
          message: 'validationId does not exist',
        },
      });

    return res.status(200).send(existingValidation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getValidationsForCustomer,
  addValidation,
  deleteValidation,
};
