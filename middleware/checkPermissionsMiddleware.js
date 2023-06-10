const checkPermissionsMiddleware = (userPermission) => (req, res, next) => {
  const permissions = req.userData.role.permissions.map(
    (permission) => permission.code
  );

  if (permissions.includes(userPermission)) {
    next()
  } else {
    return res.status(403).json({ error: { message: `Unauthorized user. Missing ${userPermission} permission`}})
  }
};

module.exports = checkPermissionsMiddleware;
