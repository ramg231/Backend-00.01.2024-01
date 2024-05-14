module.exports = (app) => {
  const userRouter = require("express").Router();
  const petRouter = require("express").Router();

  const users = require("../controllers/user.controller.js");
  const pets = require("../controllers/pet.controller.js");

  //Users
  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.delete("/:id", users.deleteAll);

  //Pets
  router.post("/", pets.create);
  router.get("/", pets.findAll);
  router.get("/:id", pets.findOne);
  router.put("/:id", pets.update);
  router.delete("/:id", pets.delete);
  router.delete("/:id", pets.deleteAll);

  app.use("/api/usuarios", userRouter);
  app.use("/api/mascotas", petRouter);
};
