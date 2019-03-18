import { check, validationResult } from "express-validator/check";
import CheckoutService from "@services/checkout";
import { internalError } from "@commons/api-errors";

export const create = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.send({
      ok: true,
      success: false,
      errors: validationErrors.array()
    });
    return;
  }

  let checkoutResult;
  try {
    checkoutResult = await new CheckoutService(req.body).perform();
  } catch (err) {
    return internalError(res, err);
  }
  res.send({
    ok: true,
    success: checkoutResult.success,
    errors: [checkoutResult.error]
  });
};

export const createValidations = [
  check("order.amount").isNumeric(),
  check("order.currency")
    .isString()
    .isLength({ min: 3 }),
  check("order.fullname")
    .isString()
    .isLength({ min: 1 }),
  check("card.name")
    .isString()
    .isLength({ min: 1 }),
  check("card.number").isCreditCard(),
  check("card.expiration").matches("^(0[1-9]|1[0-2])/[0-9]{4}$"),
  check("card.ccv").matches("^[0-9]{3,4}$")
];
