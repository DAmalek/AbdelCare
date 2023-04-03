import costumerServices from "../services/costumerServices.js";

async function createAppointment(req, res, next) {
  const { date, hour, medicName } = req.body;
  const { id } = res.locals.user;

  try {
    await costumerServices.create({ date, hour, medicName, id });
  } catch (error) {
    next(error);
  }
}
