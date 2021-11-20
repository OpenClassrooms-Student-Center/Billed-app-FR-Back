const request = require("supertest");
const app = require("../app");
const jwt = require("../services/jwt")

const jwtValue = jwt.encrypt({
    userId: 1,
    email: "john-doe@domain.tld"
});

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app).get("/auth").expect(200);
  });

  test("It should authenticate a user", () => {
    return request(app)
      .post("/auth/login")
      .send({ email: "john-doe@domain.tld", password: "mot-de-passe" })
      .set("Accept", "application/json")
      .expect(201);
  });

  test("It should not authenticate a user with wrong password", () => {
    return request(app)
      .post("/auth/login")
      .send({ email: "john-doe@domain.tld", password: "mot-de" })
      .set("Accept", "application/json")
      .expect(400);
  });

  test("It should not authenticate a user with wrong email", () => {
    return request(app)
      .post("/auth/login")
      .send({ email: "john-doe@domain.t", password: "mot-de-passe" })
      .set("Accept", "application/json")
      .expect(400);
  });

  test("It should loggout a user", () => {
    return request(app)
      .patch("/auth/loggout")
      .set('Authorization', `Bearer ${jwtValue}`)
      .set("Accept", "application/json")
      .expect(200);
  });
});
