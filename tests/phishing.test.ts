import { describe, it } from "node:test";
import assert from "node:assert";
import { callKB4API, getTestConfig, hasFields, getFirstId } from "./helpers.js";

describe("Phishing Endpoints", () => {
  const config = getTestConfig();
  let testCampaignId: string | null = null;
  let testPstId: string | null = null;
  let testRecipientId: string | null = null;

  it("should get all phishing campaigns", async () => {
    const data = await callKB4API("/v1/phishing/campaigns", config);

    assert.ok(Array.isArray(data), "Campaigns response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["campaign_id", "name"]),
        "Campaign should have campaign_id and name fields");
      testCampaignId = getFirstId(data, "campaign_id");
      console.log(`✓ Retrieved ${data.length} phishing campaigns`);
      console.log(`  First campaign: "${data[0].name}" (Status: ${data[0].status || "N/A"})`);
    } else {
      console.log("✓ No phishing campaigns found");
    }
  });

  it("should get a specific phishing campaign", async function(this: any) {
    if (!testCampaignId) {
      this.skip();
      return;
    }

    const response = await callKB4API(`/v1/phishing/campaigns/${testCampaignId}`, config);

    // API returns either array or object depending on endpoint
    const data = Array.isArray(response) ? response : [response];

    assert.ok(data.length > 0, "Campaign response should not be empty");
    assert.ok(hasFields(data[0], ["campaign_id", "name"]),
      "Campaign should have expected fields");

    const campaign = data[0];
    console.log(`✓ Campaign details: "${campaign.name}"`);
    console.log(`  Status: ${campaign.status || "N/A"}`);
    console.log(`  PSTs: ${campaign.psts_count || 0}`);
    if (campaign.last_phish_prone_percentage !== undefined) {
      console.log(`  Last Phish-Prone %: ${campaign.last_phish_prone_percentage}`);
    }
  });

  it("should get PSTs from specific campaign", async function(this: any) {
    if (!testCampaignId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/phishing/campaigns/${testCampaignId}/security_tests`, config);

    assert.ok(Array.isArray(data), "Campaign PSTs response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["pst_id", "campaign_id", "status", "name"]),
        "PST should have expected fields");
      testPstId = getFirstId(data, "pst_id");
      console.log(`✓ Campaign has ${data.length} PST(s)`);
      console.log(`  First PST: "${data[0].name}" (${data[0].status})`);
    } else {
      console.log("✓ Campaign has no PSTs yet");
    }
  });

  it("should get all phishing security tests", async () => {
    const data = await callKB4API("/v1/phishing/security_tests", config);

    assert.ok(Array.isArray(data), "PSTs response should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["pst_id", "campaign_id", "status", "name"]),
        "PST should have expected fields");
      if (!testPstId) testPstId = getFirstId(data, "pst_id");
      console.log(`✓ Retrieved ${data.length} phishing security tests (all campaigns)`);
    } else {
      console.log("✓ No phishing security tests found");
    }
  });

  it("should get a specific PST", async function(this: any) {
    if (!testPstId) {
      this.skip();
      return;
    }

    const response = await callKB4API(`/v1/phishing/security_tests/${testPstId}`, config);

    // API returns either array or object depending on endpoint
    const data = Array.isArray(response) ? response : [response];

    assert.ok(data.length > 0, "PST response should not be empty");
    assert.strictEqual(data[0].pst_id.toString(), testPstId, "PST ID should match");
    assert.ok(hasFields(data[0], ["pst_id", "campaign_id", "status", "name"]),
      "PST should have expected fields");

    console.log(`✓ Retrieved PST: ${data[0].name} (${data[0].status})`);
  });

  it("should get PST recipients", async function(this: any) {
    if (!testPstId) {
      this.skip();
      return;
    }

    const data = await callKB4API(`/v1/phishing/security_tests/${testPstId}/recipients`, config);

    assert.ok(Array.isArray(data), "PST recipients should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["recipient_id", "pst_id", "user"]),
        "Recipient should have expected fields");
      testRecipientId = getFirstId(data, "recipient_id");
      console.log(`✓ PST has ${data.length} recipients`);
    } else {
      console.log("✓ PST has no recipients");
    }
  });

  it("should get a specific recipient result", async function(this: any) {
    if (!testPstId || !testRecipientId) {
      this.skip();
      return;
    }

    const response = await callKB4API(
      `/v1/phishing/security_tests/${testPstId}/recipients/${testRecipientId}`,
      config
    );

    // API returns either array or object depending on endpoint
    const data = Array.isArray(response) ? response : [response];

    assert.ok(data.length > 0, "Recipient response should not be empty");
    assert.strictEqual(data[0].recipient_id.toString(), testRecipientId, "Recipient ID should match");
    assert.ok(hasFields(data[0], ["recipient_id", "pst_id", "user"]),
      "Recipient should have expected fields");

    const user = data[0].user;
    console.log(`✓ Retrieved recipient: ${user.first_name} ${user.last_name} (${user.email})`);
  });

  it("should support pagination for PSTs", async () => {
    const data = await callKB4API("/v1/phishing/security_tests", config, { per_page: "3" });

    assert.ok(Array.isArray(data), "Paginated PSTs response should be an array");
    assert.ok(data.length <= 3, "Should return at most 3 PSTs");

    console.log(`✓ Pagination working: retrieved ${data.length} PSTs (max 3)`);
  });
});
