const errorHandler = (err, req, res, next) => {
  console.error("❌ Error capturado en el Middleware:", err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    error: true,
    message: message
  });
};

module.exports = errorHandler;