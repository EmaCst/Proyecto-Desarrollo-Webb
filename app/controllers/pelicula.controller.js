const db = require("../models");
const Pelicula = db.peliculas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Película
exports.create = (req, res) => {
  if (!req.body.titulo) {
    res.status(400).send({
      message: "El contenido no puede estar vacío (falta el título)."
    });
    return;
  }

  const pelicula = {
    titulo: req.body.titulo,
    genero: req.body.genero,
    duracion: req.body.duracion,
    clasificacion: req.body.clasificacion,
    sinopsis: req.body.sinopsis,
    cartel_url: req.body.cartel_url,
    fecha_estreno: req.body.fecha_estreno ? req.body.fecha_estreno : new Date()
  };

  Pelicula.create(pelicula)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la Película."
      });
    });
};

// Obtener todas las Películas
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  let condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

  Pelicula.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las películas."
      });
    });
};

// Obtener una Película por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pelicula.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else {
        res.status(404).send({
          message: `No se encontró Película con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener Película con id=" + id
      });
    });
};

// Actualizar una Película por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Pelicula.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Película actualizada correctamente." });
      else {
        res.send({
          message: `No se pudo actualizar Película con id=${id}. Tal vez no fue encontrada o req.body está vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar Película con id=" + id
      });
    });
};

// Eliminar una Película por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Pelicula.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Película eliminada correctamente." });
      } else {
        res.send({
          message: `No se pudo eliminar Película con id=${id}. Tal vez no fue encontrada.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Película con id=" + id
      });
    });
};

// Eliminar todas las Películas
exports.deleteAll = (req, res) => {
  Pelicula.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Películas fueron eliminadas correctamente.` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todas las películas."
      });
    });
};
