import { validationResult } from "express-validator";

/**
 * Middleware used to check the request if there is an error
 * it will send a response with status code 400 with all errors
 *
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next Next function
 * @returns {void}
 */
export function validateRequestSchema(req, res, next) {
  console.log("1");
  const result = validationResult(req);
  console.log("2");
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
    console.log("4");
  }
  console.log("3");
  next();
}
