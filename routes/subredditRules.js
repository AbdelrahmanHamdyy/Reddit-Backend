import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import subredditDetailsMiddleware from "../middleware/subredditDetails.js";
import subredditRulesMiddleware from "../middleware/subredditRules.js";
// eslint-disable-next-line max-len
import subredditRulesController from "../controllers/subredditRulesController.js";

// eslint-disable-next-line new-cap
const subredditRulesRouter = express.Router();

/**
 * @swagger
 * /r/{subreddit}/about/rules:
 *  post:
 *   summary:
 *    Add a rule to subreddit.
 *   tags: [Subreddit moderation]
 *   parameters:
 *    - in: path
 *      name: subreddit
 *      description: name of the subreddit.
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - ruleName
 *        - appliesTo
 *       properties:
 *         ruleName:
 *          type: string
 *          description: The name of the rule.
 *         appliesTo:
 *          type: string
 *          description: Where to apply the rule
 *          enum:
 *           - posts and comments
 *           - posts only
 *           - comments only
 *         reportReason:
 *          type: string
 *          description: The reason of the report. (maximum 100 charachter)
 *         description:
 *          type: string
 *          description: The full description of the report. (maximum 500 charachter)
 *   responses:
 *    200:
 *     description: Accepted
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         error:
 *          type: string
 *          description: Type of error
 *    401:
 *     description: Unauthorized access
 *    404:
 *     description: Not Found
 *    500:
 *     description: Internal Server Error
 *   security:
 *    - bearerAuth: []
 */

subredditRulesRouter.post(
  "/r/:subreddit/about/rules",
  verifyToken.verifyAuthToken,
  // subredditDetailsMiddleware.createSubreddit,
  subredditDetailsMiddleware.checkSubreddit,
  verifyToken.verifyAuthTokenModerator,
  subredditRulesController.addSubredditRule
);

/**
 * @swagger
 * /r/{subreddit}/about/rules:
 *  get:
 *   summary:
 *    Get the rules for a subreddit.
 *   tags: [Subreddit moderation]
 *   parameters:
 *    - in: path
 *      name: subreddit
 *      description: name of the subreddit.
 *      schema:
 *       type: string
 *      required: true
 *   responses:
 *    200:
 *     description: The rules for the subreddit.
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         rules:
 *          type: array
 *          description: The rules of the subreddit. (maximum 15 rule)
 *          items:
 *           type: object
 *           properties:
 *            ruleID:
 *             type: string
 *             description: ID of the rule
 *            ruleName:
 *             type: string
 *             description: Name of the rule
 *            ruleOrder:
 *             type: integer
 *             description: Order of the rule
 *            createdAt:
 *             type: string
 *             format: date-time
 *             description: Creation date of the rule
 *            appliesTo:
 *             type: string
 *             description: Where to apply the rule
 *             enum:
 *              - posts and comments
 *              - posts only
 *              - comments only
 *            reportReason:
 *             type: string
 *             description: The reason of the report. (maximum 100 charachter)
 *            description:
 *             type: string
 *             description: The full description of the report. (maximum 500 charachter)
 *    401:
 *     description: Unauthorized access
 *    404:
 *     description: Not Found
 *    500:
 *     description: Internal Server Error
 *   security:
 *    - bearerAuth: []
 */

subredditRulesRouter.get(
  "/r/:subreddit/about/rules",
  verifyToken.verifyAuthToken,
  // subredditDetailsMiddleware.createSubreddit,
  subredditDetailsMiddleware.checkSubreddit,
  verifyToken.verifyAuthTokenModerator,
  subredditRulesController.getSubredditRules
);

/**
 * @swagger
 * /r/{subreddit}/about/rules/{ruleId}:
 *  put:
 *   summary:
 *    Edit a rule at subreddit.
 *   tags: [Subreddit moderation]
 *   parameters:
 *    - in: path
 *      name: subreddit
 *      description: name of the subreddit.
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - ruleName
 *        - appliesTo
 *        - ruleOrder
 *       properties:
 *         ruleName:
 *          type: string
 *          description: The name of the rule.
 *         ruleOrder:
 *          type: integer
 *          description: Order of the rule
 *         appliesTo:
 *          type: string
 *          description: Where to apply the rule
 *          enum:
 *           - posts and comments
 *           - posts only
 *           - comments only
 *         reportReason:
 *          type: string
 *          description: The reason of the report. (maximum 100 charachter)
 *         description:
 *          type: string
 *          description: The full description of the report. (maximum 500 charachter)
 *   responses:
 *    200:
 *     description: Accepted
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         error:
 *          type: string
 *          description: Type of error
 *    401:
 *     description: Unauthorized access
 *    404:
 *     description: Not Found
 *    500:
 *     description: Internal Server Error
 *   security:
 *    - bearerAuth: []
 */

subredditRulesRouter.put(
  "/r/:subreddit/about/rules/:ruleId",
  verifyToken.verifyAuthToken,
  // subredditDetailsMiddleware.createSubreddit,
  subredditDetailsMiddleware.checkSubreddit,
  verifyToken.verifyAuthTokenModerator,
  subredditRulesMiddleware.validateRuleId,
  subredditRulesMiddleware.checkRule,
  subredditRulesController.editSubredditRule
);

/**
 * @swagger
 * /r/{subreddit}/about/rules-order:
 *  post:
 *   summary:
 *    Edit rules order of the subreddit.
 *   tags: [Subreddit moderation]
 *   parameters:
 *    - in: path
 *      name: subreddit
 *      description: name of the subreddit.
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       required:
 *        - rulesOrder
 *       properties:
 *         rulesOrder:
 *          type: array
 *          description: The order of the rules.
 *          items:
 *           type: object
 *           properties:
 *            ruleId:
 *             type: string
 *             description: id of the rule
 *            ruleOrder:
 *             type: string
 *             description: The new order of the rule
 *   responses:
 *    200:
 *     description: Accepted
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         error:
 *          type: string
 *          description: Type of error
 *    401:
 *     description: Unauthorized access
 *    404:
 *     description: Not Found
 *    500:
 *     description: Internal Server Error
 *   security:
 *    - bearerAuth: []
 */

subredditRulesRouter.post("/r/:subreddit/about/rules-order");

export default subredditRulesRouter;
