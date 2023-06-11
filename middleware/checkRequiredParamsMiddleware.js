const checkRequiredProperties = (req, requiredProps) => {
  const missingProperties = requiredProps.filter((prop) => !req.body[prop]);
  if (missingProperties.length > 0) {
    return `${missingProperties.join(', ')} not received`;
  }
  return '';
};

const checkRequiredParamsMiddleware = (paramsList) => (req, res, next) => {
  const errorMessage = checkRequiredProperties(req, paramsList);
  if (errorMessage)
    return res.status(400).json({ error: { message: errorMessage } });
  next()
};

module.exports = checkRequiredParamsMiddleware;
