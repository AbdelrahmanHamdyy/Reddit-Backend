import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { User } from "../models/User.js";

export const postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation failed!");
    return res.status(422);
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("User not found.");
        return res.status(404);
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          // We make it here whether the passwords match or not
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) {
                console.log(err);
              }
              console.log("Logged In");
              res.status(200);
            });
          }
          console.log("Invalid credentials.");
          return res.status(422);
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("Internal Server Error", err);
      return res.status(500);
    });
};
