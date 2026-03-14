import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createStarterApplication } from "../../src/app";

test("GET /health returns starter metadata", async () => {
  const { expressApp, application } = await createStarterApplication();

  try {
    const response = await request(expressApp).get("/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
    assert.equal(response.body.framework, "xTaskJS");
    assert.equal(response.body.adapter, "express");
    assert.ok(Number.isFinite(Date.parse(response.body.timestamp)));
  } finally {
    await application.close();
  }
});

test("GET / renders the configured home view", async () => {
  const { expressApp, application } = await createStarterApplication();

  try {
    const response = await request(expressApp).get("/");

    assert.equal(response.status, 200);
    assert.match(response.text, /xTaskJS TypeScript Starter/);
    assert.match(response.text, /Minimal starter wired for xTaskJS controllers/);
    assert.match(response.text, /github\.com\/xtaskjs\/xtask/);
  } finally {
    await application.close();
  }
});