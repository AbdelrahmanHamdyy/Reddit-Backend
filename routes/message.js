import express from "express";
import { verifyAuthToken } from "../middleware/verifyToken.js";
import { validateRequestSchema } from "../middleware/validationResult.js";
import messageController from "../controllers/HmessageController.js";

// eslint-disable-next-line new-cap
const messageRouter = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Messages
 *    description: Private messages
 */

/**
 * @swagger
 * /message/compose:
 *  post:
 *      summary: Send a message to a specific user with its subject
 *      tags: [Messages]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            required:
 *             - text
 *             - subject
 *             - senderUsername
 *             - receiverUsername
 *             - type
 *            properties:
 *             text:
 *               type: string
 *               description: Message Content as text
 *             senderUsername:
 *               type: string
 *               description: Username of the sender
 *             receiverUsername:
 *               type: string
 *               description: Username of the receiver
 *             sendAt:
 *               type: string
 *               format: date-time
 *               description: Time of sending the message
 *             subject:
 *               type: string
 *               description: Subject of the message
 *             type:
 *               type: string
 *               description: describes the type of message
 *               enum:
 *                 - Post replies
 *                 - Mentions
 *                 - Messages
 *             postId:
 *               type: string
 *               description: id of the post that the mention or the reply happens in
 *      responses:
 *          201:
 *              description: Your message is sent successfully
 *          401:
 *              description: Unauthorized to send a message
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.post("/message/compose");

/**
 * @swagger
 * /message/sent:
 *  get:
 *      summary: Return a listing of messages that you sent sorted by time of sending the msg
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               msgID:
 *                                 type: string
 *                                 description: Message id
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               receiverUsername:
 *                                 type: string
 *                                 description: Username of the receiver
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *                               subject:
 *                                 type: string
 *                                 description: Subject of the message
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/sent");

/**
 * @swagger
 * /message/inbox:
 *  get:
 *      summary: Return a listing of all the messages,postreplies and mentions that you received sorted by time of sending them
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description:  The id of last item in the listing that follows before this page. null if there is no previous page Only one of after/before will be specified.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description:  The id of last item in the listing that follows after this page. null if there is no next page Only one of after/before will be specified.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               msgID:
 *                                 type: string
 *                                 description: Message ID
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               type:
 *                                 type: string
 *                                 description: describes the type of message
 *                                 enum:
 *                                  - Post replies
 *                                  - Mentions
 *                                  - Messages
 *                               subredditName:
 *                                 type: string
 *                                 description: subreddit name that the reply or the mention was in
 *                               postTitle:
 *                                 type: string
 *                                 description: the title of the post that the reply or the mention happened in
 *                               senderUsername:
 *                                 type: string
 *                                 description: Username of the sender
 *                               receiverUsername:
 *                                 type: string
 *                                 description: Username of the receiver
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *                               subject:
 *                                 type: string
 *                                 description: Subject of the message
 *                               isReply:
 *                                 type: boolean
 *                                 description: True if the msg is a reply to another , False if the msg isn't a reply to another
 *                               isRead:
 *                                 type: boolean
 *                                 description: True if the msg was read before , False if the msg wasn't read before
 *                                 default: false
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/inbox");

/**
 * @swagger
 * /message/unread:
 *  get:
 *      summary: Return a listing of unread messages that you received sorted by time of sending the msg
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               msgID:
 *                                 type: string
 *                                 description: Message id
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               senderUsername:
 *                                 type: string
 *                                 description: Username of the sender
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *                               subject:
 *                                 type: string
 *                                 description: Subject of the message
 *                               isReply:
 *                                 type: boolean
 *                                 description: True if the msg is a reply to another , False if the msg isn't a reply to another
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/unread");

/**
 * @swagger
 * /message/post-reply:
 *  get:
 *      summary: Return a listing of post replies that you made sorted by time of adding the reply
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               msgID:
 *                                 type: string
 *                                 description: Message id
 *                               postID:
 *                                 type: string
 *                                 description: post id
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               subredditName:
 *                                 type: string
 *                                 description: subreddit name that the reply was in
 *                               postTitle:
 *                                 type: string
 *                                 description: the title of the post that the reply happened in
 *                               senderUsername:
 *                                 type: string
 *                                 description: Username of the sender
 *                               receiverUsername:
 *                                 type: string
 *                                 description: Username of the receiver
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/post-reply");

/**
 * @swagger
 * /message/mentions:
 *  get:
 *      summary: Return a listing of mentions that you made sorted by time of adding the mention
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               msgID:
 *                                 type: string
 *                                 description: Message id
 *                               postID:
 *                                 type: string
 *                                 description: post id
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               subredditName:
 *                                 type: string
 *                                 description: subreddit name that the reply was in
 *                               postTitle:
 *                                 type: string
 *                                 description: the title of the post that the reply happened in
 *                               senderUsername:
 *                                 type: string
 *                                 description: Username of the sender
 *                               receiverUsername:
 *                                 type: string
 *                                 description: Username of the receiver
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/mentions");

/**
 * @swagger
 * /message/messages:
 *  get:
 *      summary: Return a listing of all messages that was sent or received sorted by the time
 *      tags: [Messages]
 *      parameters:
 *       - in: query
 *         name: before
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         description: Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of items desired [Maximum = 100]
 *         schema:
 *           type: integer
 *           default: 25
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          before:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the previous things.
 *                          after:
 *                           type: string
 *                           description:  Only one of after/before should be specified. The id of last item in the listing to use as the anchor point of the slice and get the next things.
 *                          children:
 *                            msgID:
 *                                 type: string
 *                                 description: Message id
 *                            type: array
 *                            description: List of [Things] to return
 *                            items:
 *                              properties:
 *                               text:
 *                                 type: string
 *                                 description: Message Content as text
 *                               senderUsername:
 *                                 type: string
 *                                 description: Username of the sender
 *                               receiverUsername:
 *                                 type: string
 *                                 description: Username of the receiver
 *                               sendAt:
 *                                type: string
 *                                format: date-time
 *                                description: Time of sending the message
 *                               subject:
 *                                 type: string
 *                                 description: Subject of the message
 *                               isReply:
 *                                 type: boolean
 *                                 description: True if the msg is a reply to another , False if the msg isn't a reply to another
 *                               isRead:
 *                                 type: boolean
 *                                 description: True if the msg was read before , False if the msg wasn't read before
 *                                 default: false
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.get("/message/messages");

/**
 * @swagger
 * /unread-message:
 *  patch:
 *      summary: Unread a Message
 *      tags: [Messages]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - id
 *             properties:
 *              id:
 *                type: string
 *                description: Full name of the message you want to unread it
 *      responses:
 *          200:
 *              description: Message has been unread successfully
 *          401:
 *              description: Unauthorized to unread this message
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.patch("/unread-message");

/**
 * @swagger
 * /read-all-msgs:
 *  patch:
 *      summary: Mark all messages as read
 *      tags: [Messages]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - type
 *             properties:
 *              type:
 *                type: string
 *                description: Type of messages to mark as read
 *                enum:
 *                    - Post Replies
 *                    - Messages
 *                    - Username Mentions
 *                    - Unread Messages
 *      responses:
 *          200:
 *              description: All Message have been read successfully
 *          401:
 *              description: Unauthorized to read all the messages
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

messageRouter.patch(
  "/read-all-msgs",
  verifyAuthToken,
  messageController.messageValidator,
  validateRequestSchema,
  messageController.readAllMessages
);
/**
 * @swagger
 * /moderated-subreddits:
 *  get:
 *      summary: Return all subreddits that you can send message from ( the ones you are moderator in )
 *      tags: [Messages]
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          children:
 *                            type: array
 *                            description: List of the subreddits that your are moderator in and their pictures
 *                            items:
 *                              properties:
 *                               title:
 *                                 type: string
 *                                 description: the title of the subreddits that the user can send messages from and his own username
 *                               picture:
 *                                 type: string
 *                                 description: Path of the picture of the subreddit
 *          404:
 *              description: Page not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */
messageRouter.get("/moderated-subreddits");

export default messageRouter;
