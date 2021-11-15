const sequelize_fixtures = require("sequelize-fixtures");
const { sequelize } = require("../models");
const models = require("../models");

const fixtures = [
    {
        model: "User",
        data: {
            key: "73WakrfVbNJBaAmhQtEeDv",
            name: "john-doe",
            type: "Admin",
            // value: mot-de-passe
            password: "$2b$10$x2P7uxTO8xDRIuQTh.c8z.2/qnXID/P/w73VDKVRruTE4HXtvHpAS",
            email: "john-doe@domain.tld",
            status: "connected",
          }
    },
    {
        model: "User",
        data: {
            key: "73WakrfVbNJBaAmhQtEeDg",
            name: "john-doe",
            type: "Employee",
            // value: mot-de-passe
            password: "$2b$10$x2P7uxTO8xDRIuQTh.c8z.2/qnXID/P/w73VDKVRruTE4HXtvHpAS",
            email: "john-wick@domain.tld",
            status: "connected",
          }
    },
    {
        model: "Bill",
        data: {
            key: "47qAXb6fIm2zOKkLzMro",
            vat: "80",
            status: "pending",
            type: "bill type",
            commentary: "bill comment",
            name: "bill name",
            fileName: "file-path/filename.jpg",
            date: "2004-04-04",
            amount: 400,
            commentAdmin: "ok",
            pct: 20,
            email: "john-doe@domain.tld",
          }
    },
    {
        model: "Bill",
        data: {
            key: "47qAXb6fIm2zOKkLzMrb",
            vat: "80",
            status: "pending",
            type: "bill type",
            commentary: "bill comment",
            name: "bill name",
            fileName: "file-path/filename.jpg",
            date: "2004-04-04",
            amount: 300,
            commentAdmin: "ok",
            pct: 20,
            email: "john-wick@domain.tld",
          }
    }
]

const load = async () => {
    try {
        await sequelize_fixtures.loadFixtures(fixtures, models)
    } catch(err) {
        console.error(err)
    }
  }
const clear = async () => {
    await sequelize.query("DELETE FROM Users");
    await sequelize.query("DELETE FROM Bills");
  }
const reset = async () => {
      await clear()
      await load()
  }

module.exports = { 
  load,
  clear,
  reset
};
