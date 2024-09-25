const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).render('error', {
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
};

export default errorHandler;
