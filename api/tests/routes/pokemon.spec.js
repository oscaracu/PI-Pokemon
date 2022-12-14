/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  num: 999,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  // beforeEach(() =>
  //   Pokemon.sync({ force: false }).then(() => Pokemon.create(pokemon))
  // );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
  describe("GET /pokemons/:id", () => {
    it("should get status 200", () => agent.get("/pokemons/1").expect(200));
  });
  describe("GET /pokemons?name", () => {
    it("should get status 200", () =>
      agent.get("/pokemons?name=pikachu").expect(200));
  });
});
