// models/reserva.model.js
module.exports = (sequelize, Sequelize) => {
  const Reserva = sequelize.define("reserva", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    funcionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    asientoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: "reservas",
    timestamps: false
  });

  // Relaciones
  Reserva.associate = (models) => {
    Reserva.belongsTo(models.usuarios, { foreignKey: "usuarioId" });
    Reserva.belongsTo(models.funciones, { foreignKey: "funcionId" });
    Reserva.belongsTo(models.asientos, { foreignKey: "asientoId" });
  
  };

  return Reserva;
};

