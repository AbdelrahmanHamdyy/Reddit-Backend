// const admin = require("firebase-admin");
const FCM = require("fcm-node");

const serviceAccount = require("./privateKey.json");
// const certPath = admin.credential.cert(serviceAccount);
const fcm = new FCM(serviceAccount);


module.exports = fcm;
