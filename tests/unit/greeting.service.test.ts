import test from "node:test";
import assert from "node:assert/strict";
import { GreetingService } from "../../src/greeting.service";

test("GreetingService returns the home page model", () => {
  const service = new GreetingService();
  const model = service.getHomeModel();

  assert.equal(model.title, "xTaskJS TypeScript Starter");
  assert.match(model.repository, /xtaskjs\/xtask/);
  assert.match(model.runtime, /Express adapter/);
});

test("GreetingService returns a health payload with ISO timestamp", () => {
  const service = new GreetingService();
  const snapshot = service.getHealthSnapshot();

  assert.equal(snapshot.status, "ok");
  assert.equal(snapshot.framework, "xTaskJS");
  assert.equal(snapshot.adapter, "express");
  assert.ok(Number.isFinite(Date.parse(snapshot.timestamp)));
});