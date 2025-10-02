import { describe, it } from "node:test";
import assert from "node:assert";
import { callKB4API, getTestConfig, hasFields, getFirstId } from "./helpers.js";

describe("User Endpoints", () => {
  const config = getTestConfig();
  let testUserId: string | null = null;

  it("should get all users", async () => {
    const data = await callKB4API("/v1/users", config);

    assert.ok(Array.isArray(data), "Users response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["id", "email", "first_name", "last_name"]),
        "User should have expected fields");
      testUserId = getFirstId(data, "id");
      console.log(`✓ Retrieved ${data.length} users`);
    } else {
      console.log("✓ No users found in account");
    }
  });

  it("should get active users only", async () => {
    const data = await callKB4API("/v1/users", config, { status: "active" });

    assert.ok(Array.isArray(data), "Active users response should be an array");

    if (data.length > 0) {
      assert.strictEqual(data[0].status, "active", "User should be active");
      console.log(`✓ Retrieved ${data.length} active users`);
    }
  });

  it("should get a specific user", async function(this: any) {
    if (!testUserId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/users/${testUserId}`, config);

    assert.ok(data, "User response should not be null");
    assert.strictEqual(data.id.toString(), testUserId, "User ID should match");
    assert.ok(hasFields(data, ["id", "email", "first_name", "last_name"]),
      "User should have expected fields");

    console.log(`✓ Retrieved user: ${data.first_name} ${data.last_name} (${data.email})`);
  });

  it("should get user risk score history", async function(this: any) {
    if (!testUserId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/users/${testUserId}/risk_score_history`, config);

    assert.ok(Array.isArray(data), "User risk score history should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["risk_score", "date"]),
        "Risk score entry should have expected fields");
      console.log(`✓ User risk score history: ${data.length} entries`);
    } else {
      console.log("✓ No risk score history for user");
    }
  });

  it("should support pagination", async () => {
    const data = await callKB4API("/v1/users", config, { per_page: "5" });

    assert.ok(Array.isArray(data), "Paginated users response should be an array");
    assert.ok(data.length <= 5, "Should return at most 5 users");

    console.log(`✓ Pagination working: retrieved ${data.length} users (max 5)`);
  });
});
