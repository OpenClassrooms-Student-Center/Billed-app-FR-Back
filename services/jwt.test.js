const jwt = require("./jwt");

// {"data": "to-encrypt", "exp": 1636183482, "iat": 1636179882}
const jwtValue = jwt.encrypt("to-encrypt")
const wrongValue =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzYxODM0ODIsImRhdGEiOiJ0by1lbmNyeXB0IiwiaWF0IjoxNjM2MTc5ODgyfQ.XGndQGla";


describe("Test the jwt service", () => {
  
  test("It should encrypt to-encrypt", () => {
    expect(jwt.encrypt("to-encrypt")).toMatch(/([a-zA-Z0-9-_])+\.([a-zA-Z0-9-_])+\.([a-zA-Z0-9-_])+/);
  });

  test("It should valid jwtValue", async () => {
    expect((await jwt.isValid(jwtValue)).data).toEqual("to-encrypt")
  });

  test("It should unvalid wrongValue", async () => {
      try {
        await jwt.isValid(wrongValue)
      } catch (err) {
        expect(err.message).toMatch('invalid signature')
      }
    
  });
});
