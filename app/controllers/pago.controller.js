const db = require("../models");
const Pago = db.pagos;
const Reserva = db.reservas;
const Promocion = db.promociones;

// Crear un pago
exports.create = async (req, res) => {
  try {
    const { montoTotal, metodoPago, reservaId, promocionId } = req.body;

    // Validar que la reserva exista
    const reserva = await Reserva.findByPk(reservaId);
    if (!reserva) return res.status(400).send({ message: "Reserva no encontrada." });

    // Si se pasa promoción, validar
    let descuento = 0;
    if (promocionId) {
      const promo = await Promocion.findByPk(promocionId);
      if (!promo || !promo.activo) return res.status(400).send({ message: "Promoción inválida." });
      descuento = promo.descuento;
    }

    const montoFinal = montoTotal - (montoTotal * descuento);

    const pago = await Pago.create({
      montoTotal: montoFinal,
      metodoPago,
      estado: "confirmado", // Para simular pago inmediato
      reservaId,
      promocionId: promocionId || null
    });

    // Actualizar la reserva como confirmada
    await reserva.update({ estado: "comprado" });

    res.status(201).send(pago);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Obtener todos los pagos
exports.findAll = async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    res.status(200).send(pagos);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Obtener pago por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return res.status(404).send({ message: "Pago no encontrado." });
    res.status(200).send(pago);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Actualizar pago (ej: cambiar estado)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Pago.update(req.body, { where: { id } });
    if (updated === 0) return res.status(404).send({ message: "Pago no encontrado." });

    const pagoUpdated = await Pago.findByPk(id);
    res.status(200).send(pagoUpdated);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Eliminar pago
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pago.destroy({ where: { id } });
    if (!deleted) return res.status(404).send({ message: "Pago no encontrado." });
    res.status(200).send({ message: "Pago eliminado correctamente." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
