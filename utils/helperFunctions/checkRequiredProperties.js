const checkRequiredProperties = (req, requiredProps) => {
  const missingProperties = requiredProps.filter((prop) => !req.body[prop]);
  if (missingProperties.length > 0) {
    return `${missingProperties.join(', ')} not received`;
  }
  return '';
};

module.exports = checkRequiredProperties;
