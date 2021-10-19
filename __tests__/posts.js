const request = require("supertest");
const server = require("../api/server");

describe("GET / members integrations test", () => {
  it("GET list of members /api/members", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.statusCode).toBe(400);
    expect(res.type).toBe("application/json");
  });
  it("GET ping route /api/ping", async () => {
    const res = await request(server).get("/api/ping");
    expect(res.body).toEqual({ success: true });
  });
});
