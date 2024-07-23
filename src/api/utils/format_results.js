const { Sequelize } = require("../models");

//Standardized error & success responses

const ok = (res, data) => {
  return res.status(200).json({ error: 0, error_message: null, data: data });
};

const error = (res, error, code = 500) => {
  let message = error.message;
  console.log(error);
  if (error instanceof Sequelize.ForeignKeyConstraintError)
    message = `${error.fields?.join("; ")} does not exist.`;
  if (error.errors) message = error.errors.map((e) => e.message).join("; ");
  return res.status(code).json({ error: message });
};

module.exports = {
  ok,
  error,
};
