import { describe, it } from "node:test";
import assert from "node:assert";
import { callKB4API, getTestConfig, hasFields } from "./helpers.js";

describe("Account Endpoints", () => {
  const config = getTestConfig();

  it("should get account data", async () => {
    const data = await callKB4API("/v1/account", config);

    assert.ok(data, "Response should not be null");
    assert.ok(hasFields(data, ["name", "type"]),
      "Account should have name and type fields");

    console.log(`✓ Account: ${data.name} (${data.subscription_level || data.type})`);
  });

  it("should get account risk score history (6 months)", async () => {
    const data = await callKB4API("/v1/account/risk_score_history", config);

    assert.ok(Array.isArray(data), "Risk score history should be an array");

    if (data.length > 0) {
      assert.ok(hasFields(data[0], ["risk_score", "date"]),
        "Risk score entry should have risk_score and date");
      console.log(`✓ Risk score history: ${data.length} entries`);
    } else {
      console.log("✓ No risk score history available");
    }
  });

  it("should get full account risk score history", async () => {
    const data = await callKB4API("/v1/account/risk_score_history", config, { full: "true" });

    assert.ok(Array.isArray(data), "Full risk score history should be an array");
    console.log(`✓ Full risk score history: ${data.length} entries`);
  });
});
