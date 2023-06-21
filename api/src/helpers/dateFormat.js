const formatDate = (date) => {
  const parsedDate = new Date(date);

  // Verificar si el objeto Date es válido
  if (isNaN(parsedDate)) {
    const error = new Error("Formato de fecha inválido");
    error.statusCode = 400;
    throw error;
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

module.exports = formatDate;
