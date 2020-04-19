const User = require('../../../models/user');

exports.getProfile = async (req, res, next) => {
  try {
    const { userData: { id } } = req;

    const user = await User
      .findById(id)
      .populate('photo');

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

