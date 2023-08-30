import request from "supertest";

import app from "../../app";

it("returns a 200 status code", async () => {
    const response = await request(app).get("/").send();

    expect(response.status).toBe(200);
});
