# KnowBe4 MCP Server Tests

Integration tests for the KnowBe4 MCP Server using Node.js built-in test runner.

## Prerequisites

- Node.js 18+ (for built-in test runner)
- Valid KnowBe4 API key
- KnowBe4 account with test data

## Setup

1. Set your API key as an environment variable:

```bash
export KNOWBE4_API_KEY="your-api-key-here"
export KNOWBE4_REGION="us"  # Optional: us, eu, ca, uk, or de
```

Or create a `.env` file (not recommended for production):

```bash
KNOWBE4_API_KEY=your-api-key-here
KNOWBE4_REGION=us
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run specific test file:

```bash
KNOWBE4_API_KEY=your-key node --test tests/account.test.js
```

## Test Structure

### Test Files

- `account.test.ts` - Account and subscription endpoints
- `users.test.ts` - User management endpoints
- `groups.test.ts` - Group management endpoints
- `phishing.test.ts` - Phishing campaign and PST endpoints
- `training.test.ts` - Training content and enrollment endpoints

### Helper Functions

`helpers.ts` provides:
- `getTestConfig()` - Get API configuration from environment
- `callKB4API()` - Make authenticated API calls
- `hasFields()` - Validate response structure
- `getFirstId()` - Extract IDs for follow-up tests

## Test Coverage

### Account Endpoints (3 tests)
- ✓ Get account data
- ✓ Get risk score history (6 months)
- ✓ Get full risk score history

### User Endpoints (5 tests)
- ✓ Get all users
- ✓ Get active users
- ✓ Get specific user
- ✓ Get user risk score history
- ✓ Pagination support

### Group Endpoints (5 tests)
- ✓ Get all groups
- ✓ Get active groups
- ✓ Get specific group
- ✓ Get group members
- ✓ Get group risk score history

### Phishing Endpoints (8 tests)
- ✓ Get all phishing campaigns
- ✓ Get specific phishing campaign
- ✓ Get PSTs from specific campaign
- ✓ Get all PSTs
- ✓ Get specific PST
- ✓ Get PST recipients
- ✓ Get specific recipient
- ✓ Pagination support

### Training Endpoints (9 tests)
- ✓ Get all store purchases
- ✓ Get specific store purchase
- ✓ Get all policies
- ✓ Get specific policy
- ✓ Get all training campaigns
- ✓ Get specific training campaign
- ✓ Get all training enrollments
- ✓ Get specific training enrollment
- ✓ Pagination support

**Total: 30 integration tests**

## Test Behavior

### Smart Test Skipping

Tests intelligently skip when data is not available:
- If no users exist, user-specific tests are skipped
- If no groups exist, group-specific tests are skipped
- If no PSTs exist, phishing detail tests are skipped
- If no training data exists, training detail tests are skipped

### Real API Testing

These are **integration tests** that:
- Make real API calls to your KnowBe4 account
- Validate actual data structure and content
- Test pagination and filtering
- Verify relationships between entities

### Rate Limiting

Be mindful of KnowBe4's rate limits:
- 4 requests per second
- 50 requests per minute burst
- 2,000 + licensed users per day

The test suite makes approximately 30 API calls.

## Troubleshooting

### "KNOWBE4_API_KEY environment variable is required"

Set your API key:
```bash
export KNOWBE4_API_KEY="your-key"
```

### "401 Unauthorized"

Your API key is invalid or expired. Generate a new one in KnowBe4 Account Settings.

### "404 Not Found"

Check your region setting. Make sure `KNOWBE4_REGION` matches your account location.

### Tests are skipped

This is normal if your account doesn't have the tested data. The tests will skip gracefully and note what was skipped.

### "429 Too Many Requests"

Wait a moment and run tests again. Consider running specific test files instead of the full suite.

## Continuous Integration

Example GitHub Actions workflow:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
        env:
          KNOWBE4_API_KEY: ${{ secrets.KNOWBE4_API_KEY }}
          KNOWBE4_REGION: us
```

## Best Practices

1. **Use a test account**: Don't run tests against production data
2. **Secure your API key**: Never commit API keys to version control
3. **Monitor rate limits**: Space out test runs if testing frequently
4. **Check test output**: Tests log helpful information about retrieved data
5. **Keep tests updated**: Update tests when API changes

## Contributing

When adding new tests:
1. Follow existing test patterns
2. Use helper functions from `helpers.ts`
3. Skip gracefully when data doesn't exist
4. Add informative console output
5. Test both list and detail endpoints
6. Include pagination tests for list endpoints
