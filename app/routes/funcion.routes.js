module.exports = app => {
  const funciones = require("../controllers/funcion.controller.js");

  var router = require("express").Router();

  // Crear
  router.post("/create", funciones.create);

  // Listar todas
  router.get("/", funciones.findAll);

  // Buscar por ID
  router.get("/:id", funciones.findOne);

  // Actualizar por ID
  router.put("/update/:id", funciones.update);

  // Eliminar por ID
  router.delete("/delete/:id", funciones.delete);

  // Eliminar todas
  router.delete("/delete", funciones.deleteAll);

  app.use("/api/funciones", router);
};
