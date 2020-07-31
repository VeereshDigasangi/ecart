/* eslint-disable no-undef */
const chai = require("chai")
  , expect = chai.expect
  , product = require("../app/models/product")

describe("Product Endpoint testcases ", async () => {

  it("should return validation error if params are missing", async () => {
    try {
      await product.validate();
    } catch (e) {
      expect(e).to.deep.equal({ message: { code: ["The name field is required."] } });
    }
  });

});
