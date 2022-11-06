import express from "express";

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Notifications
 *    description: Notifications that sent to each user about an occurred event
 *  - name : Threads
 *    description: Containers that help us to send notifications
 */

/**
 * @swagger
 * /notifications:
 *  get:
 *      summary: get all the notifications sent to the user
 *      tags: [Notifications]
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
 *                            description: List of notifications
 *                            items:
 *                              properties:
 *                               title:
 *                                 type: string
 *                                 description: title of the notification
 *                               link:
 *                                 type: string
 *                                 description: link to the full item in the notification
 *                               sendAt:
 *                                 type: string
 *                                 description: time of sending the notification
 *                               content:
 *                                 type: string
 *                                 description: content of the notification
 *                               isRead:
 *                                type: boolean
 *                                description: true if notification is read false if it's not
 *                               smallIcon:
 *                                 type: string
 *                                 description: the path of the icon of the notification
 *                               senderID:
 *                                 type: string
 *                                 description: Name of the sender of the notification
 *                               data:
 *                                 type: object
 *                                 description: the external data that you want to send with the notification
 *          404:
 *              description: notifications not found
 *          401:
 *              description: User unauthorized to view this info
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.get("/notifications");

/**
 * @swagger
 * /mark-all-notifications-read:
 *  patch:
 *      summary: mark all the notifications as read
 *      tags: [Notifications]
 *      responses:
 *          200:
 *              description: Notification is hidden successfully
 *          401:
 *              description: Unauthorized to hide the notifications
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.patch("/mark-all-notifications-read");

/**
 * @swagger
 * /hide-noification:
 *  patch:
 *      summary: mark a specific notification as hidden
 *      tags: [Notifications]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: string
 *                description: id of the notification you want to make hidden
 *      responses:
 *          200:
 *              description: Notifications are set to read successfully
 *          401:
 *              description: Unauthorized to Read the notifications
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.patch("/hide-noification");

/**
 * @swagger
 * /live/thread:
 *  get:
 *      summary: Get a list of updates posted in this thread. (canceled feature)
 *      tags: [Threads]
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
 *                        type: array
 *                        items:
 *                              $ref: '#/components/schemas/Threads'
 *          404:
 *              description: thread not found
 *          401:
 *              description: User unauthorized to get this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.get("/live/thread");

/**
 * @swagger
 * /live/by-id/names:
 *  get:
 *      summary: Get a list all the live events (canceled feature)
 *      tags: [Threads]
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                              $ref: '#/components/schemas/Threads'
 *          404:
 *              description: thread not found
 *          401:
 *              description: User unauthorized to get this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.get("live/by-id/names");

/**
 * @swagger
 * /live/create:
 *  post:
 *      summary: Create a new live thread.
 *       Once created, the initial settings can be modified with /live/thread/edit and new updates can be posted with /live/thread/update. (canceled feature)
 *      tags: [Threads]
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                              $ref: '#/components/schemas/Threads'
 *          201:
 *              description: Created successfully
 *          401:
 *              description: Unauthorized to create this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.post("/live/create");

/**
 * @swagger
 * /live/thread/about:
 *  get:
 *      summary: get a some basic info about the live thread (canceled feature)
 *      tags: [Threads]
 *      responses:
 *          200:
 *              description: Returned successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                              $ref: '#/components/schemas/Threads'
 *          404:
 *              description: threads not found
 *          401:
 *              description: User unauthorized to get the threads
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.get("/live/thread/about");

/**
 * @swagger
 * /live/thread:
 *  patch:
 *      summary: editing a thread (canceled feature)
 *      tags: [Threads]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: string
 *                description: Full name of the thread that you want to edit
 *      responses:
 *          200:
 *              description: thread has just been edited
 *          401:
 *              description: Unauthorized to spam this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.patch("/live/thread");

/**
 * @swagger
 * /live/thread:
 *  put:
 *      summary: updating a thread (canceled feature)
 *      tags: [Threads]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: string
 *                description: Full name of the thread
 *      responses:
 *          200:
 *              description: Thread has ben updated successfully
 *          401:
 *              description: Unauthorized to update this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.put("/live/thread");

/**
 * @swagger
 * /live/thread:
 *  delete:
 *      summary: closes a thread (canceled feature)
 *      tags: [Threads]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: string
 *                description: Full name of the thread that you want to close
 *      responses:
 *          200:
 *              description: thread has just been closed successfully
 *          401:
 *              description: Unauthorized to close this thread
 *          500:
 *              description: Server Error
 *      security:
 *       - bearerAuth: []
 */

router.delete("/live/thread");

export default router;
