const db = require("../models");
const Funcion = db.funciones;
const Pelicula = db.peliculas;
const Sala = db.salas;

// Crear nueva función
exports.create = async (req, res) => {
  try {
    if (!req.body.fecha || !req.body.hora || !req.body.peliculaId || !req.body.salaId) {
      return res.status(400).send({ message: "Datos incompletos para crear función." });
    }

    const funcion = await Funcion.create({
      fecha: req.body.fecha,
      hora: req.body.hora,
      peliculaId: req.body.peliculaId,
      salaId: req.body.salaId
    });

    res.status(201).send(funcion);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Listar todas las funciones (con película y sala incluidas)
exports.findAll = async (req, res) => {
  try {
    const funciones = await Funcion.findAll({
      include: [
        { model: Pelicula, as: "pelicula" },
        { model: Sala, as: "sala" }
      ]
    });
    res.send(funciones);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Buscar una función por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const funcion = await Funcion.findByPk(id, {
      include: [
        { model: Pelicula, as: "pelicula" },
        { model: Sala, as: "sala" }
      ]
    });

    if (!funcion) {
      return res.status(404).send({ message: `No se encontró función con id=${id}` });
    }
    res.send(funcion);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Actualizar función por ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Funcion.update(req.body, { where: { id } });

    if (updated === 0) {
      return res.status(404).send({ message: `No se pudo actualizar función con id=${id}` });
    }

    const funcionActualizada = await Funcion.findByPk(id);
    res.send(funcionActualizada);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Eliminar función por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Funcion.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: `No se encontró función con id=${id}` });
    }

    res.send({ message: "Función eliminada correctamente." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Eliminar todas las funciones
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Funcion.destroy({ where: {}, truncate: false });
    res.send({ message: `${deleted} funciones eliminadas.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
