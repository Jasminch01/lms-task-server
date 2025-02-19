import AppError from "../Error/AppError";
import Course from "../Models/course.model";
import httpStatus from "http-status";
import { Tcourse } from "../type";

const createCourseDB = async (course: Tcourse) => {
  const newCourse = course;
  const result = await Course.create(newCourse);
  return result;
};

const getCoursesDB = async () => {
  const result = await Course.find();
  return result;
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
  console.log("Updating course:", courseId, updateCourse);

  // Check if course exists
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
  deleteCourseDB,
  renameCourseDB,
};
