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

export const courseController = {
  createCourse,
};
