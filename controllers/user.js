const { User } = require('../models');
const { hash } = require('../services/password');

const create = async (req, res) => {
  try {
    const {
      name, type, email, status, password,
    } = req.body;
    const user = await User.create({
      name,
      type,
      email,
      status,
      password: await hash(password),
    });
    return res.status(201).json({
      name: user.name,
      type: user.type,
      email: user.email,
      status: user.status,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const get = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).send({ message: 'user must be authenticated' });
  try {
    const {
      key: id,
      name,
      type,
      email,
      status,
    } = (await User.findOne({ where: { key: req.params.id } })) || {};
    return res.json({
      id,
      name,
      type,
      email,
      status,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const list = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).send({ message: 'user must be authenticated' });
  try {
    const users = await User.findAll();
    return res.json(
      users.map(({
        key: id, name, type, email, status,
      }) => ({
        id,
        name,
        type,
        email,
        status,
      })),
    );
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).send({ message: 'user must be authenticated' });
  try {
    if (user.type !== 'Admin' && user.key !== req.params.id) {
      return res.status(401).send({ message: 'unauthorized action' });
    }
    const {
      name, email, type, status,
    } = req.body;
    const toUpdate = {
      name, email, type, status,
    };
    const updatedUser = await User.update(toUpdate, {
      where: { key: req.params.id },
    });
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const remove = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).send({ message: 'user must be authenticated' });
  try {
    if (user.type !== 'Admin' && user.key !== req.params.id) {
      return res.status(401).send({ message: 'unauthorized action' });
    }
    await User.destroy({ where: { key: req.params.id } });
    return res.send({ message: 'user removed' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  create,
  get,
  list,
  update,
  remove,
};
