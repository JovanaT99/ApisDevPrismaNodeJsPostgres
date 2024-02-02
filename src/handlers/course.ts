import { validationResult } from 'express-validator';
import prisma from '../db';
import { createPaginator } from 'prisma-pagination';
import { Course, Prisma } from '@prisma/client';

const paginate = createPaginator({});

export const getCourses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const results = await paginate<Course, Prisma.CourseFindManyArgs>(
    prisma.course,
    {
      where: {
        // title:{
        //   contains: 'Nodejs'
        instructorId: +req.params.instructorId,
      },
      include: {
        Instructor: true,
      },

      orderBy: {
        id: 'asc',
      },
    },
    {
      page: +req.query.page,
      perPage: req.query.perPage,
    }
  );

  // const courses = await prisma.course.findMany({
  //   where: {
  //     instructorId: +req.params.instructorId,
  //   },
  //   include: {
  //     Instructor: true,
  //   },
  // });
  // res.status(200).json(courses);
  res.status(200).json(results);
};

export const postCourses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = await prisma.course.create({
    data: {
      title: req.body.title,
      desc: req.body.desc,
      durration: req.body.durration,
      instructorId: req.body.instructorId,
    },
  });
  return res.status(200).json(course);
};

export const getCourseById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const course = await prisma.course.findUnique({
    where: { id: +req.params.courseId },
  });
  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }
  return res.status(200).json(course);
};

export const deleteCourseById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const course = await prisma.course.findUnique({
    where: { id: +req.params.courseId },
  });
  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }

  const deleteCourse = await prisma.course.delete({
    where: {
      id: parseInt(req.params.courseId),
    },
  });

  return res.status(200).json(deleteCourse);
};

//handler function
export const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = await prisma.course.findUnique({
    where: {
      id: +req.params.courseId,
    },
  });

  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }

  const updateCourse = await prisma.course.update({
    where: {
      id: parseInt(req.params.courseId),
    },
    data: req.body,
  });
  return res.status(200).json(updateCourse);
};
