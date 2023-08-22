import Joi from "@hapi/joi";

const validateWith = () => (req, res, next) => {
  const result = req.body;

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  next();
};
export default { validateWith };
