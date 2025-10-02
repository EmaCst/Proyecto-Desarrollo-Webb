module.exports = (sequelize, Sequelize) => {
  const Pelicula = sequelize.define("pelicula", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duracion: {
      type: Sequelize.INTEGER, // en minutos
      allowNull: false,
    },
    genero: {
      type: Sequelize.STRING,
    },
    carteleraUrl: {
      type: Sequelize.STRING, // guardamos solo la URL de la imagen
    },
  });
  return Pelicula;
};
