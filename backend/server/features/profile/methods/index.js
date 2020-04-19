const User = require('../../../models/user');

exports.usersDelete = (req, res, next) => {
  User
    .remove()
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'All users deleted'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(200).json({
      data
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};