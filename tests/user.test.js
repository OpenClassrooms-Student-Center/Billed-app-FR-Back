const request = require("supertest");
const app = require("../app");
const jwt = require("../services/jwt");
const fixtures = require('./fixtures')

const jwtValueAdmin = jwt.encrypt({
  userId: 1,
  email: "john-doe@domain.tld",
});
const jwtValue = jwt.encrypt({
  userId: 2,
  email: "john-wick@domain.tld",
});

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/users")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(200);
  });

  test("It should return unauthenticate error for list user", () => {
    return request(app)
      .get("/users/73WakrfVbNJBaAmhQtEeDv")
      .expect(401);
  });

  test("It should return unauthenticate error for update user", () => {
    return request(app)
      .patch("/users/73WakrfVbNJBaAmhQtEeDv")
      .expect(401);
  });

  test("It should return unauthenticate error for delete user", () => {
    return request(app)
      .delete("/users/73WakrfVbNJBaAmhQtEeDv")
      .expect(401);
  });

  test("It should get a list of users", () => {
    return request(app)
      .get("/users")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toContainEqual({
          id: "73WakrfVbNJBaAmhQtEeDv",
          name: "john-doe",
          type: "Admin",
          email: "john-doe@domain.tld",
          status: "connected",
        });
      });
  });

  test("It should get a specific user", () => {
    return request(app)
      .get("/users/73WakrfVbNJBaAmhQtEeDv")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: "73WakrfVbNJBaAmhQtEeDv",
          name: "john-doe",
          type: "Admin",
          email: "john-doe@domain.tld",
          status: "connected",
        });
      });
  });

  test("It should create a user", () => {
    return request(app)
      .post("/users")
      .set("Authorization", `Bearer ${jwtValue}`)
      .send({
        name: "john-wick",
        email: "john-wick@domain.tld",
        type: "Admin",
        status: "connected",
        password: "mot-de-pass",
      })
      .set("Accept", "application/json")
      .expect(201);
  });

  test("It should update a user as admin", () => {
    return request(app)
      .patch("/users/73WakrfVbNJBaAmhQtEeDg")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .send({ name: "john-wick-II", type: "Employee" })
      .set("Accept", "application/json")
      .expect(200);
  });

  test("It should update a user as unauthorized", async () => {

    await fixtures.reset()
    return request(app)
      .patch("/users/73WakrfVbNJBaAmhQtEeDv")
      .set("Authorization", `Bearer ${jwtValue}`)
      .send({ name: "john-wick-II", type: "Employee" })
      .set("Accept", "application/json")
      .expect(401);
  });

  test("It should delete a user as admin", () => {
    return request(app)
      .delete("/users/73WakrfVbNJBaAmhQtEeDg")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .set("Accept", "application/json")
      .expect(200);
  });

  test("It should not delete a user as unauthorized", async () => {
    await fixtures.reset()
    return request(app)
      .delete("/users/73WakrfVbNJBaAmhQtEeDv")
      .set("Authorization", `Bearer ${jwtValue}`)
      .set("Accept", "application/json")
      .expect(401);
  });
});
