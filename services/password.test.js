const password = require("./password");

// value: mot-de-passe
const hashValue =
  "$2b$10$x2P7uxTO8xDRIuQTh.c8z.2/qnXID/P/w73VDKVRruTE4HXtvHpAS";
const wrongValue = "$2b$10$x2P7uxTO8xDRIuQTh.c8z.2/qnXID/P/w73VDKS";

describe("Test the jwt service", () => {
  test("It should hash a password", async () => {
    expect(await password.hash("mot-de-passe")).toMatch("$2b");
  });

  test("It should not hash a password and return error for unset parameter", async () => {
    try {
      expect(await password.hash()).toMatch("$2b");
    } catch (err) {
      expect(err.message).toEqual("data and salt arguments required");
    }
  });

  test("It should valid hashValue", async () => {
    expect(await password.compare("mot-de-passe", hashValue)).toBe(true);
  });

  test("It should not valid hashValue for unset var", async () => {
    try {
      expect(await password.compare("mot-de-passe")).toBe(true);
    } catch (err) {
      expect(err.message).toEqual("data and hash arguments required");
    }
  });

  test("It should unvalid wrongValue", async () => {
    expect(await password.compare("mot-de", hashValue)).toBe(false);
  });
});
