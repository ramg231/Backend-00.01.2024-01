const db = require("../models");
const { validationResult } = require("express-validator");
const Pet = db.mascota;

exports.create = async (req, res) => {
  // Validar datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const pet = await Pet.create(req.body);
    return res.status(201).json(pet);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "Some error occurred while creating the Pet.",
      });
  }
};

exports.findAll = async (req, res) => {
  try {
    const pets = await Pet.findAll({});
    return res.status(200).json(pets);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || "Some error occurred while retrieving pets.",
      });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findByPk(id);
    if (pet) {
      return res.status(200).json(pet);
    } else {
      return res
        .status(404)
        .json({ message: `Cannot find Pet with id=${id}.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving Pet with id=" + id });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [updatedCount, updatedPet] = await Pet.update(req.body, {
      where: { id: id },
      returning: true, // Devuelve el objeto actualizado
    });
    if (updatedCount === 1) {
      return res.status(200).json(updatedPet[0]);
    } else {
      return res
        .status(404)
        .json({
          message: `Cannot update Pet with id=${id}. Maybe Pet was not found or req.body is empty!`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error updating Pet with id=" + id });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCount = await Pet.destroy({
      where: { id: id },
    });
    if (deletedCount === 1) {
      return res.status(200).json({ message: "Pet was deleted successfully!" });
    } else {
      return res
        .status(404)
        .json({
          message: `Cannot delete Pet with id=${id}. Maybe Pet was not found!`,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Could not delete Pet with id=" + id });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deletedCount = await Pet.destroy({
      where: {},
      truncate: false,
    });
    return res
      .status(200)
      .json({ message: `${deletedCount} Pets were deleted successfully!` });
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error.message || "Some error occurred while removing all pets.",
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
