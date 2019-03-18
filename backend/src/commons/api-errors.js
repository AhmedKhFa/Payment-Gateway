import Logger from "@logger";

export const internalError = (res, err) => {
  Logger.error(err.stack);
  res.send({
    ok: false,
    message: "Something went wrong"
  });
};
