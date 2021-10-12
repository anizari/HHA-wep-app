import { Router } from 'express';
import Joi from 'joi';
import faker from 'faker';

import User from '../models/User';
import requireLocalAuth from '../middleware/requireLocalAuth';
import { registerSchema } from '../services/validators';
import { Schema } from 'mongoose';

const router = Router();

router.post('/login', requireLocalAuth, (req, res) => {
  const reqUser : any = req.user;
  const token = reqUser.generateJWT();
  const me = reqUser.toJSON();
  res.json({ token, me });
});

router.post('/register', async (req, res, next) => {
  const someJoi : any = Joi;
  const { error } = someJoi.validate(req.body, registerSchema);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        username,
        name,
        avatar: faker.image.avatar(),
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ message: 'Register success.' }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;