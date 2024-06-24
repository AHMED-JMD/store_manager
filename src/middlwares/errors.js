const { DBError } = require("objection-db-errors");

const ErrorHandler = (err, req, res, next) => {
  //send in json format
  let response = {
    code: err.status,
    message: err.message,
    type: err.type,
    data: null,
  };

  return res.status(err.status).json(response);
};

const ErrorConverter = (err, req, res, next) => {
  let dberror = err;
  if (err instanceof DBError) {
    dberror.status = 500;
    dberror.type = "DataBase Error";
  } else {
    dberror.status = 500;
    dberror.type = "Server Error";
  }

  ErrorHandler(dberror, req, res);
};

module.exports = { ErrorHandler, ErrorConverter };
