import { Router, Request, Response } from 'express';
import multer from 'multer';
import { resolve } from 'path';

import requireJwtAuth from '../../middleware/requireJwtAuth';
import User, { hashPassword, validateUser } from '../../models/User';
import Message from '../../models/Message';
import { seedDb } from '../../utils/seed';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, '../../../public/images'));
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `avatar-${Date.now()}-${fileName}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

//`checkit`, which is probably the option I'd suggest if  `validatem`

// router.put('/:id', [requireJwtAuth, upload.single('avatar')], async (req : Request, res : Response, next : any) => {
router.put('/:id', async (req : Request, res : Response, next : any) => {
  try {
    const tempUser = await User.findById(req.params.id);
    const reqUser : any = req.user;
    if (!tempUser) return res.status(404).json({ message: 'No such user.' });
    if (!(tempUser.id === reqUser.id || reqUser.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privilegies to edit this user.' });

    //validate name, username and password
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let avatarPath = null;
    if (req.file) {
      avatarPath = req.file.filename;
    }

    // if fb or google user provider dont update password
    let password = null;
    if (reqUser.provider === 'email' && req.body.password && req.body.password !== '') {
      password = await hashPassword(req.body.password);
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser.id !== tempUser.id) {
      return res.status(400).json({ message: 'Username alredy taken.' });
    }

    const updatedUser = { avatar: avatarPath, name: req.body.name, username: req.body.username, password };
    // remove '', null, undefined
    Object.keys(updatedUser).forEach((k) => !updatedUser[k] && updatedUser[k] !== undefined && delete updatedUser[k]);
    // console.log(req.body, updatedUser);
    const user = await User.findByIdAndUpdate(tempUser.id, { $set: updatedUser }, { new: true });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/reseed', async (req, res) => {
  await seedDb();
  res.json({ message: 'Database reseeded successfully.' });
});

// router.get('/me', requireJwtAuth (req, res) => {
router.get('/me', (req, res) => {
  const reqUser : any = req.user;
  const me = reqUser.toJSON();
  res.json({ me });
});

// get one user, currently working
// router.get('/:username', requireJwtAuth, async (req, res) => {
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'No user found.' });
    res.json({ user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// get all users, currently working
// router.get('/', requireJwtAuth, async (req, res) => {
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 'desc' });

    res.json({
      users: users.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// router.delete('/:id', requireJwtAuth, async (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    const tempUser = await User.findById(req.params.id);
    const reqUser : any = req.user;
    if (!tempUser) return res.status(404).json({ message: 'No such user.' });
    if (!(tempUser.id === reqUser.id || reqUser.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privilegies to delete that user.' });

    // if (['email0@email.com', 'email1@email.com'].includes(tempUser.email))
    //   return res.status(400).json({ message: 'You can not delete seeded user.' });

    //delete all messages from that user
    await Message.deleteMany({ user: tempUser.id });
    //delete user
    const user = await User.findByIdAndRemove(tempUser.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// router.post('/', requireJwtAuth, async (req, res) => {
router.post('/', async (req, res) => {
  try {
    const reqUser : any = req.user;
    // if (reqUser.role !== 'ADMIN')
    //   return res.status(400).json({ message: 'You do not have privilegies to add a user.' });

    const { email, password, name, username } = req.body;

    const existingUser = await User.findOne({ username });

    console.log(req.body);
    if (existingUser) {
      return res.status(422).send({ message: 'Username is in use' });
    }


    const newUser = await new User({
      provider: "email",
      email,
      password,
      username,
      name,
      // avatar: faker.image.avatar(),
    });

    newUser.registerUser(newUser, (err, user) => {
      if (err) throw err;
      res.json({ message: 'Successfully added user.' }); // just redirect to login
    });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
