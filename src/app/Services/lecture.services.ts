import httpStatus from "http-status";
import AppError from "../Error/AppError";
import Lecture from "../Models/lecture.modal";
import { Tlecture } from "../type";

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
};
