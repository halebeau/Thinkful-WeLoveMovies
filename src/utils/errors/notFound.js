function notFound(req, res, next) {
  next({ status: 404, message: `Path cannot be found: ${req.originalUrl}` });
}

module.exports = notFound;
