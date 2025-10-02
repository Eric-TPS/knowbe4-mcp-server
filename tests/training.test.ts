import { describe, it } from "node:test";
import assert from "node:assert";
import { callKB4API, getTestConfig, hasFields, getFirstId } from "./helpers.js";

describe("Training Endpoints", () => {
  const config = getTestConfig();
  let testStorePurchaseId: string | null = null;
  let testPolicyId: string | null = null;
  let testCampaignId: string | null = null;
  let testEnrollmentId: string | null = null;

  it("should get all store purchases", async () => {
    const data = await callKB4API("/v1/training/store_purchases", config);

    assert.ok(Array.isArray(data), "Store purchases response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["store_purchase_id", "name", "content_type"]),
        "Store purchase should have expected fields");
      testStorePurchaseId = getFirstId(data, "store_purchase_id");
      console.log(`✓ Retrieved ${data.length} store purchases`);
    } else {
      console.log("✓ No store purchases found");
    }
  });

  it("should get a specific store purchase", async function(this: any) {
    if (!testStorePurchaseId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/training/store_purchases/${testStorePurchaseId}`, config);

    assert.ok(data, "Store purchase response should not be null");
    assert.ok(hasFields(data, ["store_purchase_id", "name", "content_type"]),
      "Store purchase should have expected fields");

    console.log(`✓ Retrieved store purchase: ${data.name}`);
  });

  it("should get all policies", async () => {
    const data = await callKB4API("/v1/training/policies", config);

    assert.ok(Array.isArray(data), "Policies response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["policy_id", "name", "content_type"]),
        "Policy should have expected fields");
      testPolicyId = getFirstId(data, "policy_id");
      console.log(`✓ Retrieved ${data.length} policies`);
    } else {
      console.log("✓ No policies found");
    }
  });

  it("should get a specific policy", async function(this: any) {
    if (!testPolicyId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/training/policies/${testPolicyId}`, config);

    assert.ok(data, "Policy response should not be null");
    assert.ok(hasFields(data, ["policy_id", "name", "content_type"]),
      "Policy should have expected fields");

    console.log(`✓ Retrieved policy: ${data.name}`);
  });

  it("should get all training campaigns", async () => {
    const data = await callKB4API("/v1/training/campaigns", config, { exclude_percentages: "true" });

    assert.ok(Array.isArray(data), "Training campaigns response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["campaign_id", "name", "status"]),
        "Training campaign should have expected fields");
      testCampaignId = getFirstId(data, "campaign_id");
      console.log(`✓ Retrieved ${data.length} training campaigns`);
    } else {
      console.log("✓ No training campaigns found");
    }
  });

  it("should get a specific training campaign", async function(this: any) {
    if (!testCampaignId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/training/campaigns/${testCampaignId}`, config);

    assert.ok(data, "Training campaign response should not be null");
    assert.ok(hasFields(data, ["campaign_id", "name", "status"]),
      "Training campaign should have expected fields");

    console.log(`✓ Retrieved training campaign: ${data.name} (${data.status})`);
  });

  it("should get all training enrollments", async () => {
    const data = await callKB4API("/v1/training/enrollments", config, { per_page: "10" });

    assert.ok(Array.isArray(data), "Training enrollments response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["enrollment_id", "module_name", "user", "status"]),
        "Training enrollment should have expected fields");
      testEnrollmentId = getFirstId(data, "enrollment_id");
      console.log(`✓ Retrieved ${data.length} training enrollments`);
    } else {
      console.log("✓ No training enrollments found");
    }
  });

  it("should get a specific training enrollment", async function(this: any) {
    if (!testEnrollmentId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/training/enrollments/${testEnrollmentId}`, config);

    assert.ok(data, "Training enrollment response should not be null");
    assert.ok(hasFields(data, ["enrollment_id", "module_name", "user", "status"]),
      "Training enrollment should have expected fields");

    console.log(`✓ Retrieved enrollment: ${data.module_name} - ${data.user.email} (${data.status})`);
  });

  it("should support pagination for enrollments", async () => {
    const data = await callKB4API("/v1/training/enrollments", config, { per_page: "5" });

    assert.ok(Array.isArray(data), "Paginated enrollments response should be an array");
    assert.ok(data.length <= 5, "Should return at most 5 enrollments");

    console.log(`✓ Pagination working: retrieved ${data.length} enrollments (max 5)`);
  });
});
