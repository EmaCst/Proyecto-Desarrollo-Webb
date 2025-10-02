// models/pago.model.js
module.exports = (sequelize, Sequelize) => {
  const Pago = sequelize.define("pago", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    montoTotal: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    metodoPago: {
      type: Sequelize.STRING, // Ejemplo: 'Paypal', 'Tarjeta', etc.
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM("pendiente", "confirmado", "fallido"),
      defaultValue: "pendiente",
    },
    reservaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    promocionId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: "pagos",
    timestamps: false
  });

  Pago.associate = (models) => {
    Pago.belongsTo(models.reservas, { foreignKey: "reservaId" });
    Pago.belongsTo(models.promociones, { foreignKey: "promocionId" });
  };

  return Pago;
};
