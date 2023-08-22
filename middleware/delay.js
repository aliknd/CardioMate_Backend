import config from "config";

const delay = async (req, res, next) => {
  setTimeout(() => next(), config.get("delay"));
};

export default { delay };
