const express = require("express");
const cors = require("cors");
const { conn } = require("./src/db.js");
const server = require("./src/app.js");

const app = express();

// Agregar el middleware de CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Resto de la configuración del servidor
conn.sync({ force: true }).then(() => {
  app.use(server);
  app.listen(3001, () => {
    console.log("Servidor backend iniciado en el puerto 3001");
  });
});

//ESTE CODIGO ALTERNATIVO PERMITE SINCRONIZAR LOS MODELOS
//CON LA ESTRUCTURA DE LAS TABLAS EXISTENTES, SIN ELIMINAR Y
//RECREAR TODAS LAS TABLAS CON CADA INICIO DEL SERVIDOR
// const server = require("./src/app.js");
// const { conn } = require("./src/db.js");

// // Syncing all the models at once.
// conn.sync({ alter: true }).then(() => {
//   server.listen(3001, () => {
//     console.log("%s listening at 3001"); // eslint-disable-line no-console
//   });
// });
