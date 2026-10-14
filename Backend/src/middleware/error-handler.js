export const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    status: false,
    msg: err.message || "something went wrong",
  });
};
