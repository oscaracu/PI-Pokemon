const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    before(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
      it("should throw an error if name is already used", (used) => {
        Pokemon.create({ name: "Pikachu" })
          .then(() => used(new Error("Name already used")))
          .catch(() => used());
      });
    });

    describe("properties", () => {
      it("should have name, hp, attack, defense, speed, height and weight properties", async () => {
        const pokemon = await Pokemon.create({ name: "Kika", num: 999 });
        expect(pokemon).to.have.property("name");
        expect(pokemon).to.have.property("hp");
        expect(pokemon).to.have.property("attack");
        expect(pokemon).to.have.property("defense");
        expect(pokemon).to.have.property("speed");
        expect(pokemon).to.have.property("height");
        expect(pokemon).to.have.property("weight");
      });
    });
  });
});
