// models/funcion.model.js
module.exports = (sequelize, Sequelize) => {
  const Funcion = sequelize.define("funcion", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    peliculaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    salaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: "funciones",
    timestamps: false
  });

  Funcion.associate = (models) => {
    Funcion.belongsTo(models.peliculas, { foreignKey: "peliculaId" });
    Funcion.belongsTo(models.salas, { foreignKey: "salaId" });
  };

  return Funcion;
};
