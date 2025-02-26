import httpStatus from "http-status";
import AppError from "../Error/AppError";
import Lecture from "../Models/lecture.modal";
import { Tlecture } from "../type";
import Module from "../Models/module.model";
import Course from "../Models/course.model";
import { Types } from "mongoose";

const createLectureDB = async (newLecture: Tlecture) => {
  const result = await Lecture.create(newLecture);
  return result;
};

const getLecturesDB = async () => {
  const result = await Lecture.find();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lectures are not found");
  }
  return result;
};

const getLecturesWithCourseIdModuleIdDB = async (
  courseId: string,
  moduleId: string
) => {
  const courseObjectId = new Types.ObjectId(courseId);
  const moduleObjectId = new Types.ObjectId(moduleId);

  const existCourse = await Course.findById(courseObjectId);
  if (!existCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if the module exists and belongs to the provided course
  const existModule = await Module.findOne({ _id: moduleObjectId, courseId });
  if (!existModule) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Module not found or does not belong to the course"
    );
  }

  const lectures = await Lecture.find({ moduleId: existModule._id });

  if (!lectures) {
    throw new AppError(httpStatus.NOT_FOUND, "lectures not found");
  }
  return lectures;
};

const getLecturesWithCourseModuleNameDB = async (
  courseName: string,
  moduleName: string
) => {
  try {
    // Find the course by course name
    const course = await Course.findOne({ title: courseName });
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the module by module name and courseId
    const module = await Module.findOne({
      title: moduleName,
      courseId: course._id,
    });
    if (!module) {
      throw new Error("Module not found");
    }
    const lectures = await Lecture.find({ moduleId: module._id });
    return lectures;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, "lectures not found");
  }
};

const editLectureDB = async (lectureId: string, updateLecture: Tlecture) => {
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new AppError(httpStatus.NOT_FOUND, "lecture not found");
  }

  const result = Lecture.findByIdAndUpdate(lectureId, updateLecture, {
    new: true,
  });

  return result;
};

const deleteLectureDB = async (lectureId: string) => {
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new AppError(httpStatus.NOT_FOUND, "lecture not found");
  }

  const result = await Lecture.findByIdAndDelete(lectureId);
  return result;
};

export const lectureServices = {
  createLectureDB,
  getLecturesDB,
  editLectureDB,
  deleteLectureDB,
  getLecturesWithCourseModuleNameDB,
  getLecturesWithCourseIdModuleIdDB,
};
