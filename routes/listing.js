import express from "express";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Listing
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *     ListedPost:
 *       type: array
 *       items:
 *         properties:
 *           subreddit:
 *             type: string
 *             description: Name of subreddit which contain the post
 *           postBy:
 *             type: string
 *             description: The username for the publisher of the post
 *           title:
 *             type: string
 *             description: Title of the post
 *           content:
 *             type: string
 *             description: Content of the post [text, video, image, link]
 *           upVotes:
 *             type: integer
 *             description: Number of Up votes to that post
 *           downVotes:
 *                 type: integer
 *                 description: Number of Down votes to that post
 *           numOfComments:
 *                 type: integer
 *                 description: Total number of comments
 *           publishTime:
 *             type: string
 *             format: date-time
 *             description: Publish time of the post
 */

/**
 * @swagger
 * /best:
 *   get:
 *     summary: Return the best posts based on [time, votes, comments, number of shares]
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: after / before
 *         description: Only one should be specified. these indicate the id of an item in the listing to use as the anchor point of the slice.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ListedPost"
 *       500:
 *         description: Internal server error
 */
router.get("/best", (req, res) => {});

/**
 * @swagger
 * /hot:
 *   get:
 *     summary: Return the hot posts based on [time, votes, comments]
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: after / before
 *         description: Only one should be specified. these indicate the id of an item in the listing to use as the anchor point of the slice.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/ListedPost"
 *       500:
 *         description: Internal server error
 */
router.get("/hot", (req, res) => {});

/**
 * @swagger
 * /r/{subreddit}/hot:
 *   get:
 *     summary: Return the hot posts in a specific subreddit based on [time, votes, comments]
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: subreddit
 *         description: The name of the subreddit
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: after / before
 *         description: Only one should be specified. these indicate the id of an item in the listing to use as the anchor point of the slice.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/ListedPost"
 *       404:
 *         description: Didn't find a subreddit with that name
 *       500:
 *         description: Internal server error
 */
router.get("/r/:subreddit/hot", (req, res) => {});

/**
 * @swagger
 * /new:
 *   get:
 *     summary: Return the new posts
 *     tags: [Listing]
 *     parameters:
 *       - in: query
 *         name: after / before
 *         description: Only one should be specified. these indicate the id of an item in the listing to use as the anchor point of the slice.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/ListedPost"
 *       500:
 *         description: Internal server error
 */
router.get("/new", (req, res) => {});

/**
 * @swagger
 * /r/{subreddit}/new:
 *   get:
 *     summary: Return the new posts in a specific subreddit
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: subreddit
 *         description: The name of the subreddit
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *       - in: query
 *         name: after / before
 *         description: Only one should be specified. these indicate the id of an item in the listing to use as the anchor point of the slice.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#/components/schemas/ListedPost"
 *       404:
 *         description: Didn't find a subreddit with that name
 *       500:
 *         description: Internal server error
 */
router.get("/r/:subreddit/new", (req, res) => {});

export default router;
