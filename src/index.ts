#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// KnowBe4 API Configuration
interface KB4Config {
  apiKey: string;
  region: "us" | "eu" | "ca" | "uk" | "de";
}

const getConfig = (): KB4Config => {
  const apiKey = process.env.KNOWBE4_API_KEY;
  const region = (process.env.KNOWBE4_REGION || "us") as KB4Config["region"];

  if (!apiKey) {
    throw new Error(
      "KNOWBE4_API_KEY environment variable is required. Get your API key from your KnowBe4 Account Settings."
    );
  }

  return { apiKey, region };
};

const getBaseUrl = (region: string): string => {
  const baseUrls: Record<string, string> = {
    us: "https://us.api.knowbe4.com",
    eu: "https://eu.api.knowbe4.com",
    ca: "https://ca.api.knowbe4.com",
    uk: "https://uk.api.knowbe4.com",
    de: "https://de.api.knowbe4.com",
  };
  return baseUrls[region] || baseUrls.us;
};

// Generic API call function
async function callKB4API(
  endpoint: string,
  config: KB4Config,
  params?: Record<string, string>
): Promise<any> {
  const baseUrl = getBaseUrl(config.region);
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `KnowBe4 API error (${response.status}): ${errorText}`
    );
  }

  return response.json();
}

// Server setup
const server = new Server(
  {
    name: "knowbe4-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Account Tools
      {
        name: "get_account",
        description:
          "Get account and subscription data including subscription level, number of seats, risk score, and more",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_account_risk_score_history",
        description:
          "Get account risk score history. Optionally include full history or default to 6 months",
        inputSchema: {
          type: "object",
          properties: {
            full: {
              type: "boolean",
              description:
                "Include entire risk score history (default: false, shows 6 months)",
            },
          },
        },
      },

      // User Tools
      {
        name: "get_users",
        description:
          "Get a list of all users in your KnowBe4 account. Can filter by status, group, or expand group details",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["active", "archived"],
              description: "Filter users by status",
            },
            group_id: {
              type: "string",
              description: "Filter users by group ID",
            },
            expand: {
              type: "string",
              enum: ["group"],
              description: "Expand groups to provide additional details",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_user",
        description: "Get a specific user by their user ID",
        inputSchema: {
          type: "object",
          properties: {
            user_id: {
              type: "string",
              description: "The user ID to retrieve",
            },
          },
          required: ["user_id"],
        },
      },
      {
        name: "get_group_members",
        description: "Get a list of all users in a specific group",
        inputSchema: {
          type: "object",
          properties: {
            group_id: {
              type: "string",
              description: "The group ID",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
          required: ["group_id"],
        },
      },
      {
        name: "get_user_risk_score_history",
        description: "Get risk score history for a specific user",
        inputSchema: {
          type: "object",
          properties: {
            user_id: {
              type: "string",
              description: "The user ID",
            },
            full: {
              type: "boolean",
              description:
                "Include entire risk score history (default: false, shows 6 months)",
            },
          },
          required: ["user_id"],
        },
      },

      // Group Tools
      {
        name: "get_groups",
        description: "Get a list of all groups in your KnowBe4 account",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["active", "archived"],
              description: "Filter groups by status",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_group",
        description: "Get a specific group by group ID",
        inputSchema: {
          type: "object",
          properties: {
            group_id: {
              type: "string",
              description: "The group ID",
            },
          },
          required: ["group_id"],
        },
      },
      {
        name: "get_group_risk_score_history",
        description: "Get risk score history for a specific group",
        inputSchema: {
          type: "object",
          properties: {
            group_id: {
              type: "string",
              description: "The group ID",
            },
            full: {
              type: "boolean",
              description:
                "Include entire risk score history (default: false, shows 6 months)",
            },
          },
          required: ["group_id"],
        },
      },

      // Phishing Tools
      {
        name: "get_phishing_campaigns",
        description: "Get all phishing campaigns in your account",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_phishing_campaign",
        description: "Get data from a specific phishing campaign",
        inputSchema: {
          type: "object",
          properties: {
            campaign_id: {
              type: "string",
              description: "The campaign ID",
            },
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
          },
          required: ["campaign_id"],
        },
      },
      {
        name: "get_phishing_security_tests",
        description:
          "Get all phishing security tests (PSTs) in your account",
        inputSchema: {
          type: "object",
          properties: {
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_campaign_security_tests",
        description: "Get all PSTs from a specific phishing campaign",
        inputSchema: {
          type: "object",
          properties: {
            campaign_id: {
              type: "string",
              description: "The campaign ID",
            },
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
          required: ["campaign_id"],
        },
      },
      {
        name: "get_phishing_security_test",
        description: "Get a specific phishing security test by PST ID",
        inputSchema: {
          type: "object",
          properties: {
            pst_id: {
              type: "string",
              description: "The PST ID",
            },
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
          },
          required: ["pst_id"],
        },
      },
      {
        name: "get_pst_recipients",
        description:
          "Get all recipient results from a specific phishing security test",
        inputSchema: {
          type: "object",
          properties: {
            pst_id: {
              type: "string",
              description: "The PST ID",
            },
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
          required: ["pst_id"],
        },
      },
      {
        name: "get_pst_recipient",
        description:
          "Get a specific recipient's results from a phishing security test",
        inputSchema: {
          type: "object",
          properties: {
            pst_id: {
              type: "string",
              description: "The PST ID",
            },
            recipient_id: {
              type: "string",
              description: "The recipient ID",
            },
            campaign_type: {
              type: "string",
              enum: ["callback"],
              description: "Filter for callback phishing campaigns",
            },
          },
          required: ["pst_id", "recipient_id"],
        },
      },

      // Training Tools
      {
        name: "get_store_purchases",
        description: "Get all store purchases in your KnowBe4 account",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_store_purchase",
        description: "Get a specific store purchase by ID",
        inputSchema: {
          type: "object",
          properties: {
            store_purchase_id: {
              type: "string",
              description: "The store purchase ID",
            },
          },
          required: ["store_purchase_id"],
        },
      },
      {
        name: "get_policies",
        description: "Get all uploaded policies in your KnowBe4 account",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_policy",
        description: "Get a specific policy by policy ID",
        inputSchema: {
          type: "object",
          properties: {
            policy_id: {
              type: "string",
              description: "The policy ID",
            },
          },
          required: ["policy_id"],
        },
      },
      {
        name: "get_training_campaigns",
        description: "Get all training campaigns in your account",
        inputSchema: {
          type: "object",
          properties: {
            exclude_percentages: {
              type: "boolean",
              description:
                "Exclude completion_percentage field to speed up response",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_training_campaign",
        description: "Get a specific training campaign by campaign ID",
        inputSchema: {
          type: "object",
          properties: {
            campaign_id: {
              type: "string",
              description: "The campaign ID",
            },
          },
          required: ["campaign_id"],
        },
      },
      {
        name: "get_training_enrollments",
        description: "Get all training enrollments in your account",
        inputSchema: {
          type: "object",
          properties: {
            store_purchase_id: {
              type: "string",
              description: "Filter by store purchase ID",
            },
            campaign_id: {
              type: "string",
              description: "Filter by campaign ID",
            },
            user_id: {
              type: "string",
              description: "Filter by user ID",
            },
            exclude_archived_users: {
              type: "boolean",
              description: "Exclude archived users",
            },
            include_campaign_id: {
              type: "boolean",
              description: "Include campaign ID in response",
            },
            include_store_purchase_id: {
              type: "boolean",
              description: "Include store purchase ID in response",
            },
            include_employee_number: {
              type: "boolean",
              description: "Include employee number in response",
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
            },
            per_page: {
              type: "number",
              description: "Results per page (default: 100, max: 500)",
            },
          },
        },
      },
      {
        name: "get_training_enrollment",
        description: "Get a specific training enrollment by enrollment ID",
        inputSchema: {
          type: "object",
          properties: {
            enrollment_id: {
              type: "string",
              description: "The enrollment ID",
            },
            include_campaign_id: {
              type: "boolean",
              description: "Include campaign ID in response",
            },
          },
          required: ["enrollment_id"],
        },
      },
    ],
  };
});

// Tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const config = getConfig();
    let endpoint = "";
    const params: Record<string, string> = {};

    // Build pagination params if provided
    if (args && typeof args === "object") {
      if ("page" in args && args.page) {
        params.page = String(args.page);
      }
      if ("per_page" in args && args.per_page) {
        params.per_page = String(args.per_page);
      }
    }

    switch (name) {
      // Account endpoints
      case "get_account":
        endpoint = "/v1/account";
        break;

      case "get_account_risk_score_history":
        endpoint = "/v1/account/risk_score_history";
        if (args && typeof args === "object" && "full" in args && args.full) {
          params.full = "true";
        }
        break;

      // User endpoints
      case "get_users":
        endpoint = "/v1/users";
        if (args && typeof args === "object") {
          if ("status" in args && args.status) params.status = String(args.status);
          if ("group_id" in args && args.group_id) params.group_id = String(args.group_id);
          if ("expand" in args && args.expand) params.expand = String(args.expand);
        }
        break;

      case "get_user":
        if (!args || typeof args !== "object" || !("user_id" in args)) {
          throw new Error("user_id is required");
        }
        endpoint = `/v1/users/${args.user_id}`;
        break;

      case "get_group_members":
        if (!args || typeof args !== "object" || !("group_id" in args)) {
          throw new Error("group_id is required");
        }
        endpoint = `/v1/groups/${args.group_id}/members`;
        break;

      case "get_user_risk_score_history":
        if (!args || typeof args !== "object" || !("user_id" in args)) {
          throw new Error("user_id is required");
        }
        endpoint = `/v1/users/${args.user_id}/risk_score_history`;
        if ("full" in args && args.full) params.full = "true";
        break;

      // Group endpoints
      case "get_groups":
        endpoint = "/v1/groups";
        if (args && typeof args === "object" && "status" in args && args.status) {
          params.status = String(args.status);
        }
        break;

      case "get_group":
        if (!args || typeof args !== "object" || !("group_id" in args)) {
          throw new Error("group_id is required");
        }
        endpoint = `/v1/groups/${args.group_id}`;
        break;

      case "get_group_risk_score_history":
        if (!args || typeof args !== "object" || !("group_id" in args)) {
          throw new Error("group_id is required");
        }
        endpoint = `/v1/groups/${args.group_id}/risk_score_history`;
        if ("full" in args && args.full) params.full = "true";
        break;

      // Phishing endpoints
      case "get_phishing_campaigns":
        endpoint = "/v1/phishing/campaigns";
        break;

      case "get_phishing_campaign":
        if (!args || typeof args !== "object" || !("campaign_id" in args)) {
          throw new Error("campaign_id is required");
        }
        endpoint = `/v1/phishing/campaigns/${args.campaign_id}`;
        if ("campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      case "get_phishing_security_tests":
        endpoint = "/v1/phishing/security_tests";
        if (args && typeof args === "object" && "campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      case "get_campaign_security_tests":
        if (!args || typeof args !== "object" || !("campaign_id" in args)) {
          throw new Error("campaign_id is required");
        }
        endpoint = `/v1/phishing/campaigns/${args.campaign_id}/security_tests`;
        if ("campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      case "get_phishing_security_test":
        if (!args || typeof args !== "object" || !("pst_id" in args)) {
          throw new Error("pst_id is required");
        }
        endpoint = `/v1/phishing/security_tests/${args.pst_id}`;
        if ("campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      case "get_pst_recipients":
        if (!args || typeof args !== "object" || !("pst_id" in args)) {
          throw new Error("pst_id is required");
        }
        endpoint = `/v1/phishing/security_tests/${args.pst_id}/recipients`;
        if ("campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      case "get_pst_recipient":
        if (
          !args ||
          typeof args !== "object" ||
          !("pst_id" in args) ||
          !("recipient_id" in args)
        ) {
          throw new Error("pst_id and recipient_id are required");
        }
        endpoint = `/v1/phishing/security_tests/${args.pst_id}/recipients/${args.recipient_id}`;
        if ("campaign_type" in args && args.campaign_type) {
          params.campaign_type = String(args.campaign_type);
        }
        break;

      // Training endpoints
      case "get_store_purchases":
        endpoint = "/v1/training/store_purchases";
        break;

      case "get_store_purchase":
        if (!args || typeof args !== "object" || !("store_purchase_id" in args)) {
          throw new Error("store_purchase_id is required");
        }
        endpoint = `/v1/training/store_purchases/${args.store_purchase_id}`;
        break;

      case "get_policies":
        endpoint = "/v1/training/policies";
        break;

      case "get_policy":
        if (!args || typeof args !== "object" || !("policy_id" in args)) {
          throw new Error("policy_id is required");
        }
        endpoint = `/v1/training/policies/${args.policy_id}`;
        break;

      case "get_training_campaigns":
        endpoint = "/v1/training/campaigns";
        if (
          args &&
          typeof args === "object" &&
          "exclude_percentages" in args &&
          args.exclude_percentages
        ) {
          params.exclude_percentages = String(args.exclude_percentages);
        }
        break;

      case "get_training_campaign":
        if (!args || typeof args !== "object" || !("campaign_id" in args)) {
          throw new Error("campaign_id is required");
        }
        endpoint = `/v1/training/campaigns/${args.campaign_id}`;
        break;

      case "get_training_enrollments":
        endpoint = "/v1/training/enrollments";
        if (args && typeof args === "object") {
          if ("store_purchase_id" in args && args.store_purchase_id) {
            params.store_purchase_id = String(args.store_purchase_id);
          }
          if ("campaign_id" in args && args.campaign_id) {
            params.campaign_id = String(args.campaign_id);
          }
          if ("user_id" in args && args.user_id) {
            params.user_id = String(args.user_id);
          }
          if ("exclude_archived_users" in args && args.exclude_archived_users) {
            params.exclude_archived_users = String(args.exclude_archived_users);
          }
          if ("include_campaign_id" in args && args.include_campaign_id) {
            params.include_campaign_id = String(args.include_campaign_id);
          }
          if ("include_store_purchase_id" in args && args.include_store_purchase_id) {
            params.include_store_purchase_id = String(args.include_store_purchase_id);
          }
          if ("include_employee_number" in args && args.include_employee_number) {
            params.include_employee_number = String(args.include_employee_number);
          }
        }
        break;

      case "get_training_enrollment":
        if (!args || typeof args !== "object" || !("enrollment_id" in args)) {
          throw new Error("enrollment_id is required");
        }
        endpoint = `/v1/training/enrollments/${args.enrollment_id}`;
        if ("include_campaign_id" in args && args.include_campaign_id) {
          params.include_campaign_id = String(args.include_campaign_id);
        }
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    const result = await callKB4API(endpoint, config, params);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("KnowBe4 MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
