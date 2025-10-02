import { describe, it } from "node:test";
import assert from "node:assert";
import { callKB4API, getTestConfig, hasFields, getFirstId } from "./helpers.js";

describe("Group Endpoints", () => {
  const config = getTestConfig();
  let testGroupId: string | null = null;

  it("should get all groups", async () => {
    const data = await callKB4API("/v1/groups", config);

    assert.ok(Array.isArray(data), "Groups response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["id", "name", "group_type"]),
        "Group should have expected fields");
      testGroupId = getFirstId(data, "id");
      console.log(`✓ Retrieved ${data.length} groups`);
    } else {
      console.log("✓ No groups found in account");
    }
  });

  it("should get active groups only", async () => {
    const data = await callKB4API("/v1/groups", config, { status: "active" });

    assert.ok(Array.isArray(data), "Active groups response should be an array");

    if (data.length > 0) {
      assert.strictEqual(data[0].status, "active", "Group should be active");
      console.log(`✓ Retrieved ${data.length} active groups`);
    }
  });

  it("should get a specific group", async function(this: any) {
    if (!testGroupId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/groups/${testGroupId}`, config);

    assert.ok(data, "Group response should not be null");
    assert.strictEqual(data.id.toString(), testGroupId, "Group ID should match");
    assert.ok(hasFields(data, ["id", "name", "group_type"]),
      "Group should have expected fields");

    console.log(`✓ Retrieved group: ${data.name} (${data.member_count || 0} members)`);
  });

  it("should get group members", async function(this: any) {
    if (!testGroupId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/groups/${testGroupId}/members`, config);

    assert.ok(Array.isArray(data), "Group members should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["id", "email", "first_name", "last_name"]),
        "Group member should have expected fields");
      console.log(`✓ Group has ${data.length} members`);
    } else {
      console.log("✓ Group has no members");
    }
  });

  it("should get group risk score history", async function(this: any) {
    if (!testGroupId) {
      this.skip();
      return;
    }

    try {
      const data = await callKB4API(`/v1/groups/${testGroupId}/risk_score_history`, config);

      assert.ok(Array.isArray(data), "Group risk score history should be an array");

      if (data.length > 0) {
        assert.ok(hasFields(data[0], ["risk_score", "date"]),
          "Risk score entry should have expected fields");
        console.log(`✓ Group risk score history: ${data.length} entries`);
      } else {
        console.log("✓ No risk score history for group");
      }
    } catch (error: any) {
      // KnowBe4 API sometimes returns 500 for group risk score history
      if (error.message.includes("500")) {
        console.log("⚠ Group risk score history endpoint returned 500 (API issue)");
        this.skip();
      } else {
        throw error;
      }
    }
  });
});
