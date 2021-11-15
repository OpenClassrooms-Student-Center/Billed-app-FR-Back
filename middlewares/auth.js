const { User } = require('../models');
const jwt = require('../services/jwt');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    // eslint-disable-next-line no-unused-vars
    const [_, token] = req.headers.authorization.split(' ');
    try {
      const userPayload = await jwt.isValid(token);
      const user = await User.findOne({ where: { email: userPayload?.data?.email } });
      req.user = user;
      next();
      return null;
    } catch (err) {
      res.status(401).send({message: 'user not allowed! you should clear your localstorage and retry!'});
      return null;
    }
  }
  next();
  return null;
};
