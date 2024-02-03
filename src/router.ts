import { Router } from 'express';
import {
  deleteCourseById,
  getCourseById,
  getCourses,
  postCourses,
  updateCourse,
} from './handlers/course';
import { createInstructor, getInstructor } from './handlers/instructor';
import { body, param } from 'express-validator';
import { createVideo, getVideos } from './handlers/video';
import { signin, signup, privateRoute } from './handlers/user';
import { authenticate } from './handlers/auth';
import { createApplication, sequentialQueries } from './handlers/application';

const router = Router();

router.get('/courses/:instructorId', param('instructorId').isInt(), getCourses);

router.post(
  '/courses',
  authenticate,
  body('title').isString().notEmpty(),
  body('durration').isFloat().notEmpty(),
  body('desc').isString().notEmpty(),
  body('instructorId').isInt().optional(),
  postCourses
);

router.get('/course/:courseId', param('courseId').isInt(), getCourseById);

router.delete('/course/:courseId', param('courseId').isInt(), deleteCourseById);

router.put(
  '/course/:courseId',
  param('courseId').isInt(),
  body('title').isString().optional(),
  body('durration').isFloat().optional(),
  body('desc').isString().optional(),
  body('instructorId').isInt().optional(),
  updateCourse
);

router.post(
  '/instructor',
  authenticate,
  body('name').notEmpty(),
  body('zip').isString().notEmpty(),
  body('country').isString().notEmpty(),
  body('city').isString().notEmpty(),
  createInstructor
);

router.get('/instructor/:id', param('id').isInt(), getInstructor);

router.post(
  '/video',
  body('title').isString().notEmpty(),
  body('desc').isString().notEmpty(),
  body('url').isString().notEmpty(),
  body('hostingProvider').isString().notEmpty(),
  body('key').isString().optional(),
  body('metaData').isString().optional(),
  createVideo
);

router.get('/videos', getVideos);

router.post(
  '/signup',
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty(),
  signup
);

router.post(
  '/signin',
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty(),
  signin
);

router.get('/private', authenticate, privateRoute);

router.post('/application', createApplication);

router.get('/sequential', sequentialQueries);

export default router;
