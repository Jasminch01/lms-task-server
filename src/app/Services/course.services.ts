import AppError from "../Error/AppError";
import Course from "../Models/course.model";
import httpStatus from "http-status";
import { Tcourse } from "../type";
import User from "../Models/user.model";

const createCourseDB = async (course: Tcourse) => {
  const newCourse = course;
  const result = await Course.create(newCourse);
  return result;
};

// const getCoursesDB = async () => {
//   const result = await Course.find();
//   return result;
// };

const getCoursesDB = async () => {
  const courses = await Course.find(); // Fetch all courses

  // Fetch author details for each course
  const coursesWithAuthors = await Promise.all(
    courses.map(async (course) => {
      const author = await User.findById(course.authorId).select("name email"); // Fetch author info
      return {
        ...course.toObject(),
        author,
      };
    })
  );

  return coursesWithAuthors;
};

const getCourseDB = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const author = await User.findById(course.authorId).select("name email");

  return {
    ...course.toObject(),
    author,
  };
};

const deleteCourseDB = async (courseId: string) => {
  const existingCourse = await Course.findById(courseId);
  if (!existingCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const result = await Course.findByIdAndDelete(courseId);
  return result;
};

const renameCourseDB = async (courseId: string, updateCourse: Tcourse) => {
  const existingCourse = await Course.findById(courseId);
  if (!existingCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Update course
  const result = await Course.findByIdAndUpdate(courseId, updateCourse, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(400, "Update operation failed");
  }

  return result;
};

export const CourseServices = {
  createCourseDB,
  getCoursesDB,
  getCourseDB,
  deleteCourseDB,
  renameCourseDB,
};
