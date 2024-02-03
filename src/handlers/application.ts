import { validationResult } from 'express-validator';
import prisma from '../db';

enum APPLICATION_TYPE {
  LOAN = 'LOAN',
  CAR_FINANCING = 'CAR_FINANCING',
  BUSINESS_FINANCING = 'BUSINESS_FINANCING',
}
export const createApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const resuults = await prisma.customer.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      address: {
        create: {
          city: req.body.city,
          country: req.body.country,
          zip: req.body.zip,
        },
      },
      application: {
        create: [
          {
            amount: req.body.amount,
            tenure: req.body.tenure,
            type: req.body.applicationType,
          },
        ],
      },
    },
  });
  return res.status(201).json(resuults);
};

export const sequentialQueries = async (req, res) => {
  const results = await prisma.$transaction([
    prisma.application.findMany(),
    prisma.customer.findMany(),
    prisma.course.findMany(),
    prisma.adddress.findMany(),
  ]);
  res.status(200).json(results);
};

function async(res: any) {
  throw new Error('Function not implemented.');
}
