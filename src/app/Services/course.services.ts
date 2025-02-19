import Course from "../Models/course.model";
import { Tcourse } from "../type";

const createCourseDB = async (course: Tcourse) => {
  const newCourse = course;
  const result = await Course.create(newCourse);
  return result
};

export const CourseServices = {
  createCourseDB,
};
