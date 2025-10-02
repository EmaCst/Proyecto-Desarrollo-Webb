// controllers/reserva.controller.js
const db = require("../models");
const Reserva = db.reservas;

// Crear una reserva
exports.create = async (req, res) => {
  try {
    const { usuarioId, funcionId, asientoId } = req.body;

    // Validar campos obligatorios
    if (!usuarioId || !funcionId || !asientoId) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    // Verificar que el asiento, usuario y función existan
    const usuarioExistente = await db.usuarios.findByPk(usuarioId);
    if (!usuarioExistente) return res.status(404).json({ message: "Usuario no encontrado." });

    const funcionExistente = await db.funciones.findByPk(funcionId);
    if (!funcionExistente) return res.status(404).json({ message: "Función no encontrada." });

    const asientoExistente = await db.asientos.findByPk(asientoId);
    if (!asientoExistente) return res.status(404).json({ message: "Asiento no encontrado." });

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      usuarioId,
      funcionId,
      asientoId
    });

    res.status(201).json(nuevaReserva);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Obtener todas las reservas
exports.findAll = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: db.usuarios, attributes: ["id", "nombre", "email"] },
        { model: db.funciones, attributes: ["id", "fecha", "hora"] },
        { model: db.asientos, attributes: ["id", "fila", "columna"] }
      ]
    });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una reserva por ID
exports.findOne = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: [
        { model: db.usuarios, attributes: ["id", "nombre", "email"] },
        { model: db.funciones, attributes: ["id", "fecha", "hora"] },
        { model: db.asientos, attributes: ["id", "fila", "columna"] }
      ]
    });
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una reserva
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, funcionId, asientoId } = req.body;

    // Validar campos obligatorios
    if (!usuarioId || !funcionId || !asientoId) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const [updated] = await db.reservas.update(
      { usuarioId, funcionId, asientoId },
      { where: { id } }
    );

    if (updated === 0)
      return res.status(404).json({ message: "Reserva no encontrada." });

    const reservaActualizada = await db.reservas.findByPk(id);
    res.json(reservaActualizada);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Eliminar una reserva
exports.delete = async (req, res) => {
  try {
    const result = await Reserva.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json({ message: "Reserva eliminada exitosamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar todas las reservas (solo admin, opcional)
exports.deleteAll = async (req, res) => {
  try {
    await Reserva.destroy({ where: {} });
    res.json({ message: "Todas las reservas eliminadas" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

