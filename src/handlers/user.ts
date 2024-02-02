import { validationResult } from 'express-validator';
import prisma from '../db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hash,
    },
  });
  res.status(201).json({ msg: 'Signup successful' });
};

export const signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(401).json({ msg: 'Unathorized' });
  }
  const matched = bcrypt.compareSync(req.body.password, user.password);

  if (matched) {
    const token = jwt.sign({ id: user.id }, process.env.WEB_TOKEN_SECRET);

    return res.status(200).json({ token });
  }
  return res
    .status(401)
    .json({ msg: 'UnAuthorized: Invalid Email or Password' });
};

/*
@param req 
@param res
*/

export const privateRoute = async (req, res) => {
  return res.json({ msg: 'Im in authenticated route' });
};
