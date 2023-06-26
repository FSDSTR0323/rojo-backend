const { Validation } = require('../database');

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

const addValidation = async (req, res) => {};

const deleteValidation = async (req, res) => {};

module.exports = {
  getValidationsForCustomer,
  addValidation,
  deleteValidation,
};
