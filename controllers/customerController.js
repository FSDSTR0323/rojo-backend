const { Customer } = require('../database');

const getCustomerInfo = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const customerInfo = await Customer.findById(customerId);
    return res.status(200).json(customerInfo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCustomerInfo,
};
