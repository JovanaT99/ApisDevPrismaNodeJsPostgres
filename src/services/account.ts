import { validationResult } from 'express-validator';
import prisma from '../db';

export const createAccounts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const account = await prisma.account.create({
    data: {
      title: req.body.title,
      balance: req.body.balance,
    },
  });
  return res.status(201).json(account);
};

export const transferHandler = async (req, res) => {

try{

const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const senderId = req.body.sender;
const receiverId = req.body.receiver;
const transferAmount = req.body.transferAmount

const results = await transfer(senderId,receiverId. transferAmount);
return res.json(results);


}

}