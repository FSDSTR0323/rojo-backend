const { Validation } = require('../database');

const getValidationsForCustomer = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const foundValidations = await Validation.find({
      customer: customerId,
      deletedAt: { $exists: false },
    });

    return res.status(200).json(foundValidations);
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
