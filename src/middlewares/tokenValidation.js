import errors from "../errors/index.js";
import userRepositories from "../repositories/userRepositories.js";

async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [bearer, token] = parts;
  if (bearer !== "Bearer") throw errors.unauthorizedError();

  JsonWebTokenError.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decoded) => {
      try {
        if (error) throw errors.unauthorizedError();

        const {
          rows: [user],
        } = await userRepositories.findCostumerById(decoded.costumer_id);

        if (!user) throw errors.unauthorizedError();

        res.locals.user = user;

        next();
      } catch (error) {
        next(error);
      }
    }
  );
}
export default { tokenValidation };
