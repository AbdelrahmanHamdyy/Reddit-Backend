import supertest from "supertest";
import app from "../../app.js";
import Post from "./../../models/Post.js";
import User from "../../models/User.js";
import { generateJWT } from "../../utils/generateTokens.js";

const request = supertest(app);

// eslint-disable-next-line max-statements
describe("Testing post actions endpoints", () => {
  let post = {},
    user1 = {},
    user2 = {},
    token1 = "",
    token2 = "";

  beforeAll(async () => {
    user1 = new User({
      username: "Beshoy",
      email: "beshoy@gmail.com",
    });
    await user1.save();
    token1 = generateJWT(user1);

    post = new Post({
      title: "post title",
      ownerUsername: user1.username,
      ownerId: user1._id,
      subredditName: "subreddit",
      kind: "text",
    });
    await post.save();

    user2 = new User({
      username: "Beshoy",
      email: "beshoy@gmail.com",
    });
    await user2.save();
    token2 = generateJWT(user2);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  it("try to mark a post as spoiler without jwt in the header", async () => {
    const response = await request.post("/mark-spoiler");
    expect(response.statusCode).toEqual(401);
  });
  it("try to mark a post as nsfw without jwt in the header", async () => {
    const response = await request.post("/mark-nsfw");
    expect(response.statusCode).toEqual(401);
  });

  it("try to unmark a post as spoiler without jwt in the header", async () => {
    const response = await request.post("/unmark-spoiler");
    expect(response.statusCode).toEqual(401);
  });
  it("try to unmark a post as nsfw without jwt in the header", async () => {
    const response = await request.post("/unmark-nsfw");
    expect(response.statusCode).toEqual(401);
  });

  it("try to mark a post as spoiler without id in the body", async () => {
    const response = await request
      .post("/mark-spoiler")
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(400);
  });
  it("try to mark a post as nsfw without id in the body", async () => {
    const response = await request
      .post("/mark-nsfw")
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(400);
  });

  it("try to unmark a post as spoiler without id in the body", async () => {
    const response = await request
      .post("/unmark-spoiler")
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(400);
  });
  it("try to unmark a post as nsfw without id in the body", async () => {
    const response = await request
      .post("/unmark-nsfw")
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(400);
  });

  it("try to mark a post of other user as spoiler", async () => {
    const response = await request
      .post("/mark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token2);

    expect(response.statusCode).toEqual(401);
  });
  it("try to mark a post of other user as nsfw", async () => {
    const response = await request
      .post("/mark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token2);

    expect(response.statusCode).toEqual(401);
  });

  it("try to unmark a post of other user as spoiler", async () => {
    const response = await request
      .post("/unmark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token2);

    expect(response.statusCode).toEqual(401);
  });
  it("try to unmark a post of other user as nsfw", async () => {
    const response = await request
      .post("/unmark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token2);

    expect(response.statusCode).toEqual(401);
  });

  it("try to mark a post as spoiler with all valid parameters", async () => {
    const response = await request
      .post("/mark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(200);
  });
  it("try to mark a post as nsfw with all valid parameters", async () => {
    const response = await request
      .post("/mark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(200);
  });

  it("try to mark the same post as spoiler again", async () => {
    const response = await request
      .post("/mark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(409);
  });
  it("try to mark the same post as nsfw again", async () => {
    const response = await request
      .post("/mark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(409);
  });

  it("try to unmark a post as spoiler with all valid parameters", async () => {
    const response = await request
      .post("/unmark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(200);
  });
  it("try to unmark a post as nsfw with all valid parameters", async () => {
    const response = await request
      .post("/unmark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(200);
  });

  it("try to unmark the same post as spoiler again", async () => {
    const response = await request
      .post("/unmark-spoiler")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(409);
  });
  it("try to unmark the same post as nsfw again", async () => {
    const response = await request
      .post("/unmark-nsfw")
      .send({
        id: post._id,
      })
      .set("Authorization", "Bearer " + token1);

    expect(response.statusCode).toEqual(409);
  });
});
