const fixtures = require("./tests/fixtures");

beforeAll(async () => {
  await fixtures.reset()
});
beforeEach(async () => {
  await fixtures.reset()
});
//afterAll(async () => {
//  await fixtures.clear();
//});
