module.exports = (sequelize, Sequelize) => {
  const Sala = sequelize.define("sala", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    filas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    columnas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Sala;
};
