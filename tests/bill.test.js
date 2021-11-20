const request = require("supertest");
const app = require("../app");
const jwt = require("../services/jwt");

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
      .get("/bills")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(200);
  });

  test("It should return unauthenticated error for list bills", () => {
    return request(app)
      .get("/bills")
      .expect(401);
  });

  test("It should return unauthenticated error for create bill", () => {
    return request(app)
      .post("/bills")
      .expect(401);
  });

  test("It should return unauthenticated error for update bill", () => {
    return request(app)
      .patch("/bills/47qAXb6fIm2zOKkLzMrb")
      .expect(401);
  });

  test("It should return unauthenticated error for delete bill", () => {
    return request(app)
      .delete("/bills/47qAXb6fIm2zOKkLzMrb")
      .expect(401);
  });

  test("It should list all bills as admin", () => {
    return request(app)
      .get("/bills")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toContainEqual({
          id: "47qAXb6fIm2zOKkLzMrb",
          vat: "80",
          status: "pending",
          type: "bill type",
          commentary: "bill comment",
          name: "bill name",
          fileName: "file-path/filename.jpg",
          fileUrl: "http://localhost:5678/null",
          date: "2004-04-04",
          amount: 300,
          commentAdmin: "ok",
          pct: 20,
          email: "john-wick@domain.tld",
        });
      });
  });

  test("It should not list all bills as admin", () => {
    return request(app)
      .get("/bills")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(200)
      .then((response) => {
        expect(response.body).not.toContainEqual({
          id: "47qAXb6fIm2zOKkLzMro",
          vat: "80",
          status: "pending",
          type: "bill type",
          commentary: "bill comment",
          name: "bill name",
          fileName: "file-path/filename.jpg",
          fileUrl: "http://localhost:5678/null",
          date: "2004-04-04",
          amount: 400,
          commentAdmin: "ok",
          pct: 20,
          email: "john-doe@domain.tld",
        });
      });
  });

  test("It should return a specific bill as admin", () => {
    return request(app)
      .get("/bills/47qAXb6fIm2zOKkLzMrb")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: "47qAXb6fIm2zOKkLzMrb",
          vat: "80",
          status: "pending",
          type: "bill type",
          commentary: "bill comment",
          name: "bill name",
          fileName: "file-path/filename.jpg",
          fileUrl: "http://localhost:5678/null",
          date: "2004-04-04",
          amount: 300,
          commentAdmin: "ok",
          pct: 20,
          email: "john-wick@domain.tld",
        });
      });
  });

  test("It should not return a specific bill as unauthorized", () => {
    return request(app)
      .get("/bills/47qAXb6fIm2zOKkLzMro")
      .set("Authorization", `Bearer ${jwtValue}`)
      .expect(401);
  });

  test("It should create a bill", () => {
    return request(app)
      .post("/bills")
      .set("Authorization", `Bearer ${jwtValue}`)
      .set("Accept", "multipart/form-data")
      .field('name','bill-name')
      .attach('file', 'tests/fixture-cat.jpg')
      .expect(201);
  });

  test("It should create a bill with non picture file type and not save file", () => {
    return request(app)
      .post("/bills")
      .set("Authorization", `Bearer ${jwtValue}`)
      .set("Accept", "multipart/form-data")
      .field('name','bill-name')
      .attach('file', 'tests/fixture-cat.pdf')
      .then((response) => {
        expect(response.body).toMatchObject({
          name: 'bill-name',
          fileName: false,
          filePath: false,
        });
      });
  });

  test("It should update a bill as admin", () => {
    return request(app)
      .patch("/bills/47qAXb6fIm2zOKkLzMrb")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .send({ name: "bill-name" })
      .set("Accept", "application/json")
      .expect(200);
  });

  test("It should not update a bill as unauthorized", () => {
    return request(app)
      .patch("/bills/47qAXb6fIm2zOKkLzMro")
      .set("Authorization", `Bearer ${jwtValue}`)
      .send({ name: "bill-name" })
      .set("Accept", "application/json")
      .expect(401);
  });

  test("It should delete a bill as admin", () => {
    return request(app)
      .delete("/bills/47qAXb6fIm2zOKkLzMrb")
      .set("Authorization", `Bearer ${jwtValueAdmin}`)
      .set("Accept", "application/json")
      .expect(200);
  });

  test("It should delete a bill as unauthorized", () => {
    return request(app)
      .delete("/bills/47qAXb6fIm2zOKkLzMro")
      .set("Authorization", `Bearer ${jwtValue}`)
      .set("Accept", "application/json")
      .expect(401);
  });
});
