// Test helper utilities for KnowBe4 API testing
import { config } from "dotenv";

// Load .env file if it exists
config();

export interface KB4Config {
  apiKey: string;
  region: "us" | "eu" | "ca" | "uk" | "de";
}

export function getTestConfig(): KB4Config {
  const apiKey = process.env.KNOWBE4_API_KEY;
  const region = (process.env.KNOWBE4_REGION || "us") as KB4Config["region"];

  if (!apiKey) {
    throw new Error(
      "KNOWBE4_API_KEY environment variable is required for tests"
    );
  }

  return { apiKey, region };
}

export function getBaseUrl(region: string): string {
  const baseUrls: Record<string, string> = {
    us: "https://us.api.knowbe4.com",
    eu: "https://eu.api.knowbe4.com",
    ca: "https://ca.api.knowbe4.com",
    uk: "https://uk.api.knowbe4.com",
    de: "https://de.api.knowbe4.com",
  };
  return baseUrls[region] || baseUrls.us;
}

export async function callKB4API(
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

// Helper to check if response is an array
export function isArray(data: any): boolean {
  return Array.isArray(data);
}

// Helper to check if response has expected fields
export function hasFields(obj: any, fields: string[]): boolean {
  if (!obj || typeof obj !== "object") return false;
  return fields.every((field) => field in obj);
}

// Helper to extract first item from list endpoints for testing detail endpoints
export function getFirstId(data: any[], idField: string = "id"): string | null {
  if (!Array.isArray(data) || data.length === 0) return null;
  return data[0][idField]?.toString() || null;
}
