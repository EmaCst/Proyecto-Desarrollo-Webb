// usamos la función requiere para cargar el modulo db.config.js para traer los parametros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");
// cargamos el modulo sequelize "ORM" para el manejo de las entidades como objetos. 
const Sequelize = require("sequelize");
// creamos una variable sequelize y la inicializamos como un Objeto Sequelize con la informacion de la BD 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    // si utilizamos una BD externa, probablemente nos pida ssl = true, cambios la linea de reject por la que esta comentada
    /* ssl:{ requiere: true}*/
    ssl: {
      rejectUnauthorized: false
    }
  }
});
// creamos un objeto db
const db = {};
// la variable db.Sequelize = modulo importado Sequelize que esta declarado previamente donde se importa el modulo
db.Sequelize = Sequelize;
// se define una variable con la configuracion de sequelize
db.sequelize = sequelize;
// se crea una variable clientes que importa el modelo que esta dentro de la carpeta models/cliente.model.js


// ================== IMPORTACIÓN DE MODELOS ==================
db.usuarios    = require("./usuario.model.js")(sequelize, Sequelize);
db.peliculas   = require("./pelicula.model.js")(sequelize, Sequelize);
db.salas       = require("./sala.model.js")(sequelize, Sequelize);
db.asientos    = require("./asiento.model.js")(sequelize, Sequelize);
db.funciones   = require("./funcion.model.js")(sequelize, Sequelize);
db.reservas    = require("./reserva.model.js")(sequelize, Sequelize);
db.pagos       = require("./pago.model.js")(sequelize, Sequelize);
db.promociones = require("./promocion.model.js")(sequelize, Sequelize);

// No se definen relaciones aquí: todas las relaciones se manejan dentro de cada modelo si se requiere

module.exports = db;
