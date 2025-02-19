import { CourseServices } from "../Services/course.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createCourse = catchAsync(async (req, res) => {
  const course = req.body;
  const result = await CourseServices.createCourseDB(course);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "a new course created Successfuly",
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getCoursesDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "retrive all courses successfuly",
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.query;
  const id = courseId as string;
  const result = await CourseServices.deleteCourseDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "course deleted Successfully",
  });
});

const renameCourse = catchAsync(async (req, res) => {
  const { courseId } = req.query;
  const id = courseId as string;
  const updateCourse = req.body;
  const result = await CourseServices.renameCourseDB(id, updateCourse);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: result.errors?.message || "course updated Successfully",
  });
});

export const courseController = {
  createCourse,
  getCourses,
  deleteCourse,
  renameCourse,
};
