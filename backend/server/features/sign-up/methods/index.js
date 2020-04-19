const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { encrypt } = require('../../../services/bcrypt');
const User = require('../../../models/user');

exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        error: 'This user is exist!'
      });
    }

    const user = new User({
      _id: mongoose.Types.ObjectId(),
      ...body,
      password: await encrypt(body.password),
    });

    await user.save();

    res.status(200).json({
      message: 'User has been successfully registered.',
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
};
