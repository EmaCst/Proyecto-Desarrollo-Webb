const db = require("../models");
const Asiento = db.asientos;

// Crear un nuevo asiento
exports.create = async (req, res) => {
  try {
    if (!req.body.numero || !req.body.salaId) {
      return res.status(400).send({ message: "El número y salaId son requeridos." });
    }

    const asiento = await Asiento.create({
      numero: req.body.numero,
      salaId: req.body.salaId
    });

    res.status(201).send(asiento);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al crear el asiento."
    });
  }
};

// Obtener todos los asientos
exports.findAll = async (req, res) => {
  try {
    const data = await Asiento.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al obtener los asientos."
    });
  }
};

// Obtener un asiento por id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const asiento = await Asiento.findByPk(id);

    if (!asiento) {
      return res.status(404).send({ message: `No se encontró el asiento con id=${id}` });
    }

    res.send(asiento);
  } catch (err) {
    res.status(500).send({
      message: "Error al obtener el asiento con id=" + req.params.id
    });
  }
};

// Actualizar un asiento por id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Asiento.update(req.body, { where: { id } });

    if (updated === 1) {
      const asiento = await Asiento.findByPk(id);
      res.send(asiento);
    } else {
      res.status(404).send({ message: `No se pudo actualizar el asiento con id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error al actualizar el asiento con id=" + req.params.id
    });
  }
};

// Eliminar un asiento por id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Asiento.destroy({ where: { id } });

    if (deleted === 1) {
      res.send({ message: "Asiento eliminado correctamente." });
    } else {
      res.status(404).send({ message: `No se encontró el asiento con id=${id}` });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error al eliminar el asiento con id=" + req.params.id
    });
  }
};

// Eliminar todos los asientos
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Asiento.destroy({ where: {}, truncate: false });
    res.send({ message: `${deleted} asientos fueron eliminados.` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al eliminar todos los asientos."
    });
  }
};
