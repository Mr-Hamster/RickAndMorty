const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const { checkPassword } = require('../../../services/bcrypt');

exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'Auth failed, this user is not exist!'
      });
    }

    const isMatch = await checkPassword(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        error: 'Auth failed'
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        }, 
        'secret',
        {
          expiresIn: "24h"
        }
      );
      res.status(200).json({
        message: 'Auth successful',
        token,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

