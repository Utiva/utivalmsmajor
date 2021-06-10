import usession from './user_session';
import validate from './validators';
import {
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  changePasswordSchema,
  updateUserSchema,
  quickCheckOutSchema,
  adminCreateSchema,
  loginPasswordSchema,
} from './validators/schemas/user';

import {
  createCourse,
  getCourseSchema,
  getAllCourseSchema,
  getCourseDescriptionSchema,
  deleteDescriptionSchema,
  getAllMainCourseSchema,
  addCourseCohortProgressSchema,
} from './validators/schemas/course';

import {
  createTrainerSchema,
  getTrainerSchema,
  courseTrainerSchema,
  trainerSchema,
  updateTrainerSchema,
} from './validators/schemas/trainer';

import {
  addStudentSchema,
  getStudentSchema,
  getStudentCourseSchema,
  addStudentProgressSchema,
} from './validators/schemas/student';

import {
  createClassroom,
  getClassAssignmentSchema,
  deleteClassAssignmentSchema,
  editClassAssignmentSchema,
  createClassAssignmentSchema,
} from './validators/schemas/class';

import {
  createFileSchema,
  getFileSchema,
  updateFileSchema,
  getAllFileSchema
} from './validators/schemas/files';

import {
  createCohort,
  addcourse,
  updateCohortSchema,
  updateCohorCoursetSchema,
} from './validators/schemas/cohort';

import {
  submitAssignmentSchema,
  gradeAssignmentSchema,
  deleteAssignmentSchema,
  editAssignmentSchema,
  assignmentCommentSchema,
  getCommentSchema,
  editCommentSchema,
  deleteCommentSchema,
  getStudentCourseCohortAssignmentSchema,
  getStudentSubmitClassAssignmentSchema,
} from './validators/schemas/assignment';

import {
  generateCoupon,
  getAllCouponSchema,
  getCouponSchema,
  useCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
} from './validators/schemas/coupon';

import { idSchema, deleteStudentSchema } from './validators/schemas/general';

import { checkoutSchema } from './validators/schemas/checkout';

import { transactionSchema } from './validators/schemas/transaction';

import { isLoggedIn } from './auth';
import { checkInvitation } from './checker';

export default {
  usession,
  validate,
  loginSchema,
  signUpSchema,
  updateUserSchema,
  resetPasswordSchema,
  changePasswordSchema,
  loginPasswordSchema,
  isLoggedIn,
  checkInvitation,
  quickCheckOutSchema,
  adminCreateSchema,
  createCourse,
  getCourseSchema,
  getAllCourseSchema,
  createTrainerSchema,
  getTrainerSchema,
  courseTrainerSchema,
  trainerSchema,
  updateTrainerSchema,
  addStudentSchema,
  addStudentProgressSchema,
  getStudentSchema,
  createClassroom,
  createFileSchema,
  getFileSchema,
  updateFileSchema,
  createCohort,
  getCourseDescriptionSchema,
  getAllMainCourseSchema,
  addCourseCohortProgressSchema,
  addcourse,
  updateCohortSchema,
  updateCohorCoursetSchema,
  getStudentCourseSchema,
  getClassAssignmentSchema,
  submitAssignmentSchema,
  gradeAssignmentSchema,
  deleteClassAssignmentSchema,
  editClassAssignmentSchema,
  deleteAssignmentSchema,
  editAssignmentSchema,
  assignmentCommentSchema,
  getCommentSchema,
  editCommentSchema,
  deleteCommentSchema,
  getStudentCourseCohortAssignmentSchema,
  getStudentSubmitClassAssignmentSchema,
  createClassAssignmentSchema,
  checkoutSchema,
  idSchema,
  deleteStudentSchema,
  transactionSchema,
  generateCoupon,
  getAllCouponSchema,
  getCouponSchema,
  useCouponSchema,
  updateCouponSchema,
  deleteCouponSchema,
  deleteDescriptionSchema,
  getAllFileSchema
};
