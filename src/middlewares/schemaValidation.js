import err from "../errors/index.js";

export function schemaValidation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    // console.log(req.body.cpf);

    if (error) {
      const errors = error.details.map((details) => details.message);
      throw err.conflictError(errors);
    }

    next();
  };
}
