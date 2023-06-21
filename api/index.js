const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
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
