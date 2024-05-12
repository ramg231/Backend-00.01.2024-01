const { request, response } = require("express");
const CourseModel = require("./entity");

const create = async (req = request, res = response) => {
  try {
    const data = req.body;
    const courseExist = await CourseModel.findOne({ name: data.name });

    if (courseExist) {
      return res.status(400).json({ message: "El curso ya existe" });
    }

    const courseResult = await CourseModel.create(data);
    return res.json(courseResult);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const findOne = async (req = request, res = response) => {
  const { id } = req.params;
  const courseResult = await CourseModel.findById(id);

  if (!courseResult) {
    return res.status(400).json({ message: "El curso no existe" });
  }
  res.json(courseResult);
};

const findAll = async (req = request, res = response) => {
  const result = await CourseModel.find();
  res.json(result);
};

const deleteCourse = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const courseResult = await CourseModel.findByIdAndDelete(id);

    if (!courseResult) {
      return res.status(400).json({ message: "El curso no existe" });
    }
    return res.json(courseResult);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const course = req.body;

  try {
    const courseResult = await CourseModel.findByIdAndUpdate(id, course, {
      new: true,
      runValidators: true,
    });

    if (!courseResult) {
      return res.status(404).json({ message: "El curso no existe" });
    }
    return res.json(courseResult);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  deleteCourse,
  update,
};
