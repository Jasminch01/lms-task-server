import { lectureServices } from "../Services/lecture.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createLecture = catchAsync(async (req, res) => {
  const lecture = req.body;
  const result = await lectureServices.createLectureDB(lecture);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "a new lecture created successfully",
    data: result,
  });
});

const getLectures = catchAsync(async (req, res) => {
  const result = await lectureServices.getLecturesDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "lectres are retrive successfully",
    data: result,
  });
});

const editLecture = catchAsync(async (req, res) => {
  const updateLecture = req.body;
  const { id } = req.query;
  const lectureId = id as string;
  const result = await lectureServices.editLectureDB(lectureId, updateLecture);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "lecture updated successfull",
    data: result,
  });
});

const delectLecture = catchAsync(async (req, res) => {
  const { id } = req.query;
  const lectureId = id as string;
  const result = await lectureServices.deleteLectureDB(lectureId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "lecture deleted success",
    data: result,
  });
});

const getLecturesWithCourseModuleName = catchAsync(async (req, res) => {
  const { courseName, moduleName } = req.body;

  const result = await lectureServices.getLecturesWithCourseModuleNameDB(
    courseName,
    moduleName
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "lecture found",
    data: result,
  });
});

const getLecturesWithCourseIdModuleId = catchAsync(async (req, res) => {
  const { courseId, moduleId } = req.query;
  const courseIdString = courseId as string;
  const moduleIdString = moduleId as string;
  const result = await lectureServices.getLecturesWithCourseIdModuleIdDB(
    courseIdString,
    moduleIdString
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "lectures are retrive successfully",
    data: result,
  });
});

export const lectureControllers = {
  createLecture,
  getLectures,
  editLecture,
  delectLecture,
  getLecturesWithCourseModuleName,
  getLecturesWithCourseIdModuleId,
};
