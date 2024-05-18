const db = require("../models");
const { validationResult } = require("express-validator");
const User = db.usuario;

exports.create = async (req, res) => {
  // Validar datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "Some error occurred while creating the User.",
      });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({});
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "Some error occurred while retrieving users.",
      });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ message: `Cannot find User with id=${id}.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving User with id=" + id });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [updatedCount, updatedUser] = await User.update(req.body, {
      where: { id: id },
      returning: true, // Devuelve el objeto actualizado
    });
    if (updatedCount === 1) {
      return res.status(200).json(updatedUser[0]);
    } else {
      return res
        .status(404)
        .json({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error updating User with id=" + id });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCount = await User.destroy({
      where: { id: id },
    });
    if (deletedCount === 1) {
      return res.status(200).json({ message: "User was deleted successfully!" });
    } else {
      return res
        .status(404)
        .json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Could not delete User with id=" + id });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deletedCount = await User.destroy({
      where: {},
      truncate: false,
    });
    return res
      .status(200)
      .json({ message: `${deletedCount} Users were deleted successfully!` });
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error.message || "Some error occurred while removing all users.",
      });
  }
};

// //METHOD GET - "find one pet"
// app.get("/api/mascotas/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pet = await Pet.findById(id);
//     res.status(200).json(pet);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //METHOD GET - "find all pets"
// app.get("/api/mascotas", async (req, res) => {
//   try {
//     const pets = await Pet.find(req.body);
//     res.status(200).json(pets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //METHOD POST - "create pet"
// app.post("/api/mascotas", async (req, res) => {
//   try {
//     const pet = await Pet.create(req.body);
//     res.status(200).json(pet);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //METHOD PUT - "update pet"
// app.put("/api/mascotas/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pet = await Pet.findByIdAndUpdate(id, req.body);
//     if (!pet) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     const updatePet = await Pet.findById(id);
//     res.status(200).json(updatePet);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //METHOD DELETE - "delete pet"
// app.delete("/api/mascotas/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pet = await Pet.findByIdAndDelete(id, req.body);
//     if (!pet) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Pet deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
