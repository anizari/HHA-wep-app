import fs from 'fs';
import { join } from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { isValidUrl } from '../utils/utils';
import { DepartmentName } from './Leaderboard';

const { Schema } = mongoose;

export enum Role {
  Admin = "Admin",
  MedicalDirector = "Medical Director",
  HeadOfDepartment = "Head of Department",
  User = "User",
}

// Reference to fix .js to .ts here: https://stackoverflow.com/questions/45485073/typescript-date-type
export interface User extends Document {
  // provider: string;
  username: string;
  // email: string;
  password: string;
  name: string;
  role: string;
  department: DepartmentName;
  // bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    // provider: {
    //   type: String,
    //   required: true,
    // },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
      index: true,
    },
    // email: {
    //   type: String,
    //   lowercase: true,
    //   unique: true,
    //   required: [true, "can't be blank"],
    //   match: [/\S+@\S+\.\S+/, 'is invalid'],
    //   index: true,
    // },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    name: String,
    // avatar: String,
    role: { type: String, default: Role.User },
    department: { type: DepartmentName }
    // bio: String,
    // TODO: Remove the commented code when we confirm that this file works.
    // google
    // googleId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // // fb
    // facebookId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true },
);

console.log(join(__dirname, '../..', process.env.IMAGES_FOLDER_PATH));

userSchema.methods.toJSON = function () {
  // // if not exists avatar1 default
  // const absoluteAvatarFilePath = `${join(__dirname, '../..', process.env.IMAGES_FOLDER_PATH)}${this.avatar}`;
  // const avatar = isValidUrl(this.avatar)
  //   ? this.avatar
  //   : fs.existsSync(absoluteAvatarFilePath)
  //   ? `${process.env.IMAGES_FOLDER_PATH}${this.avatar}`
  //   : `${process.env.IMAGES_FOLDER_PATH}avatar2.jpg`;

  return {
    id: this._id,
    // provider: this.provider,
    // email: this.email,
    username: this.username,
    // avatar: avatar,
    name: this.name,
    role: this.role,
    department: this.department,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: '12h',
      id: this._id,
      // provider: this.provider,
      // email: this.email,
      username: this.username,
      name: this.name,
      role: this.role
    },
    secretOrKey,
  );
  return token;
};

userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });

  return hashedPassword;
}

export const validateUserSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(20)
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .required(),
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  role: Joi.string()
    .required(),
  department: Joi.string()
})

export const validateUpdatedUserSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(20)
    .allow(''),
  password: Joi.string()
    .min(6)
    .max(20)
    .allow(''),
  name: Joi.string()
    .min(2)
    .max(30)
    .allow(''),
  role: Joi.string()
    .allow(''),
  department: Joi.string()
    .allow(''),
})

export const validateUser = (user) => {
  return validateUserSchema.validate(user);
};

const User = mongoose.model('User', userSchema);

export default User;
