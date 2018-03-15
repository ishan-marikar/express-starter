"use strict";
process.env.NODE_ENV = "tests";
// Removes the JSHint warning about undefined variables.
/*jshint -W117 */

const chai = require("chai");
const http = require("chai-http");
const server = require("../../index");
const { expect } = chai;
chai.use(http);

describe("route /", () => {
  it("it should return 200", done => {
    chai
      .request(server)
      .get("/")
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });
});

describe("route /ping", () => {
  it("it should return pong", done => {
    chai
      .request(server)
      .get("/ping")
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("PONG");
        done();
      });
  });
});

describe("invalid pages", () => {
  it("it should return 404", done => {
    chai
      .request(server)
      .get("/page-that-does-not-exist")
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.payload.status.code).to.equal("invalid.route");
        done();
      });
  });
});
