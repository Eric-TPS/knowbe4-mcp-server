Published Time: Thu, 25 Sep 2025 20:48:26 GMT

Warning: Target URL returned error 404: Not Found

KnowBe4 API Documentation

\===============

KnowBe4 Documentation

*   [Reporting](https://developer.knowbe4.com/rest/reporting#)
    *   REST APIs
        
        *   [Reporting](https://developer.knowbe4.com/rest/reporting)
        *   [User Events](https://developer.knowbe4.com/rest/userEvents)
    

***

```
*   GRAPH APIs
    *   [KSAT](https://developer.knowbe4.com/graphql/ksat)
    *   [PasswordIQ](https://developer.knowbe4.com/graphql/passwordiq)
    *   [PhishER](https://developer.knowbe4.com/graphql/phisher)
    *   [SecurityCoach](https://developer.knowbe4.com/graphql/securitycoach)
```

![Image 1: KnowBe4 logo](https://helpimg.s3.us-east-1.amazonaws.com/Status_Page/knowbe4-logo-black-orange-rgb.png)

*   Introduction
    
*   Base URL
    
*   Authentication
    
*   Request IDs
    
*   Response Format
    
*   Pagination
    
*   Account
    
    *   get Get Account and Subscription Data
    *   get Get Account Risk Score History
*   Users
    
    *   get Get a List of All Users
    *   get Get a Specific User
    *   get Get a List of Users in a Specific Group
    *   get Get a Specific User's Risk Score History
*   Groups
    
    *   get Get a List of All Groups
    *   get Get a Specific Group
    *   get Get a Specific Group's Risk Score History
*   Phishing
    
    *   get Get a Specific Phishing Campaign
    *   get Get All Phishing Security Tests (PSTs)
    *   get Get All PSTs From a Specific Campaign
    *   get Get a Specific PST
    *   get Get All Recipient Results
    *   get Get a Specific Recipient's Results
*   Training
    
    *   get Get all Store Purchases
    *   get Get a Specific Store Purchase
    *   get Get all Policies
    *   get Get a Specific Policy
    *   get Get all Training Campaigns
    *   get Get a Specific Training Campaign
    *   get Get all Training Enrollments
    *   get Get a Specific Training Enrollment
*   Rate Limiting
    
*   Terms of Use
    
*   Errors
    

[![Image 2: redocly logo](https://cdn.redoc.ly/redoc/logo-mini.svg)API docs by Redocly](https://redocly.com/redoc/)

# KnowBe4 API Reference Guide

# [](https://developer.knowbe4.com/rest/reporting#tag/Introduction)Introduction

KnowBe4’s APIs are [REST APIs](http://en.wikipedia.org/wiki/Representational_State_Transfer) that allow you to pull phishing, training, user, and group data from the KnowBe4 console. Data is returned in a JSON structure by default--no additional parameter is needed.

By using KnowBe4's APIs, you agree to our [Terms of Use](https://developer.knowbe4.com/rest/reporting#tag/Terms-of-Use).

Our APIs use resource-oriented URLs for requests and HTTP response codes for error handling. HTTP features, such as HTTP authentication and HTTP verbs, are built-in and understood by standard HTTP clients.

Our APIs are available to Platinum and Diamond customers. We offer limited support for our APIs.

Anonymized KnowBe4 accounts (accounts that have elected to make their user data anonymous) will not be able to retrieve any anonymized data. See our [Anonymous Console](https://support.knowbe4.com/hc/en-us/articles/115009509107) documentation to review what data will be available on anonymized accounts.

# [](https://developer.knowbe4.com/rest/reporting#tag/Base-URL)Base URL

When submitting API requests, you will need to use the correct base URL depending on where your KnowBe4 account is located.

*   Accounts on the US server (located at [training.knowbe4.com](https://training.knowbe4.com/)) must use the Base URL of [https://us.api.knowbe4.com](https://us.api.knowbe4.com).
*   Accounts on the EU server (located at [eu.knowbe4.com](https://eu.knowbe4.com/)) must use [https://eu.api.knowbe4.com](https://eu.api.knowbe4.com).
*   Accounts on the CA server (located at [ca.knowbe4.com](https://ca.knowbe4.com/)) must use [https://ca.api.knowbe4.com](https://ca.api.knowbe4.com).
*   Accounts on the UK server (located at [uk.knowbe4.com](https://uk.knowbe4.com/)) must use [https://uk.api.knowbe4.com](https://uk.api.knowbe4.com).
*   Accounts on the DE server (located at [de.knowbe4.com](https://de.knowbe4.com/)) must use [https://de.api.knowbe4.com](https://de.api.knowbe4.com).

The shell and HTTP examples shown below use the [https://us.api.knowbe4.com](https://us.api.knowbe4.com) base URL. Be sure to modify your request if your account is on the EU, CA, UK, or DE server.

# [](https://developer.knowbe4.com/rest/reporting#tag/Authentication)Authentication

Authenticate your account by including your secret API key in the request. You can access your API key and generate a new key if needed in your [KnowBe4 Account Settings](https://training.knowbe4.com/account/info) under the API section. Your API keys provide access to the data within your KnowBe4 platform and should be kept private. Do not share your API key in publicly-accessible areas.

The API key should be included in all API requests to the server. The header should look like the following:

Authorization: Bearer

You must replace with your account API key.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

Please note that Reporting APIs and User Event APIs do not share an API key. User Event API keys must be generated in the [User Event API Management Console](https://training.knowbe4.com/app/api_tokens/user_event/keys).

# [](https://developer.knowbe4.com/rest/reporting#tag/Request-IDs)Request IDs

Each API request has an associated request identifier. You can find this value in the response headers, under X-Request-Id. **If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution**.

Example:X-Request-Id →1235678-39e4-4005-bad8-33ec22f78fc0

# [](https://developer.knowbe4.com/rest/reporting#tag/Response-Format)Response Format

The supported response format is JSON. The response will be returned in a JSON structure by default--no additional parameter is needed. All dates and times in the response will be in UTC (Coordinated Universal Time) despite your time zone. These dates and times will be indicated in the response code by the Z at the end of the datetime value.

# [](https://developer.knowbe4.com/rest/reporting#tag/Pagination)Pagination

Pagination is supported for all API endpoint requests that return multiple objects. These parameters are optional when making a HTTP request. The default pagination doesn't return all data, so pagination is required to obtain all available data endpoints that return multiple objects. The values used by default are indicated below.

| Parameter | Default | Description |
| --- | --- | --- |
| page | 1 | The page number you want to retrieve. |
| per\_page | 100 | The maximum number of results returned in the response (Max = 500) |
| cursor | null | The pointer of the current cursor. Currently, this is only available for [Get all Training Enrollments](https://developer.knowbe4.com/rest/reporting). |

The returned results are listed in sequence with the request's response when the per\_page parameters and page numbers remain the same as long as the reported data itself does not change.

# [](https://developer.knowbe4.com/rest/reporting#tag/Account)Account

[Find out more at KnowBe4.com](http://knowbe4.com/)

## [](https://developer.knowbe4.com/rest/reporting#tag/Account/paths/~1v1~1account/get)Get Account and Subscription Data

This endpoint retrieves account data from you Knowbe4 account, including your subscription level, number of seats, risk score history, and more.

##### Authorizations:

### Responses

**200** Success

get/v1/account

US Server

[https://us.api.knowbe4.com/v1/account](https://us.api.knowbe4.com/v1/account)

EU Server

[https://eu.api.knowbe4.com/v1/account](https://eu.api.knowbe4.com/v1/account)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"name": "KB4-Demo","type": "paid","domains": ["kb4-demo.com"],"admins": [{"id": 974278,"first_name": "Grace","last_name": "O'Malley","email": "grace.o@kb4-demo.com"}],"subscription_level": "Diamond","subscription_end_date": "2021-03-06","number_of_seats": 25,"current_risk_score": 45.742}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Account/paths/~1v1~1account~1risk_score_history/get)Get Account Risk Score History

This endpoint retrieves your Knowbe4 account risk score history.

##### Authorizations:

##### query Parameters

full=true string

Include the entire risk score history of your organization. If this parameter isn't used, six months of data will show by default.

### Responses

**200** Success

get/v1/account/risk\_score\_history

US Server

[https://us.api.knowbe4.com/v1/account/risk\_score\_history](https://us.api.knowbe4.com/v1/account/risk_score_history)

EU Server

[https://eu.api.knowbe4.com/v1/account/risk\_score\_history](https://eu.api.knowbe4.com/v1/account/risk_score_history)

### Response samples

*   200

Content type

application/json

Copy

`{"risk_score": 37.3,"date": "2021-02-07"}`

# [](https://developer.knowbe4.com/rest/reporting#tag/Users)Users

[Find out more at KnowBe4.com](http://knowbe4.com/)

## [](https://developer.knowbe4.com/rest/reporting#tag/Users/paths/~1v1~1users/get)Get a List of All Users

This endpoint retrieves a list of all users in your KnowBe4 account.

##### Authorizations:

##### query Parameters

status=active string

Returns a list of all active users in your account. status=archived string

Returns a list of all archived users in your account. group\_id=\[group\_id\]string

Returns a list of all users who are members of the group indicated by the \[group\_id\]. expand=group string

Expands groups to provide additional details.

### Responses

**200** Success

get/v1/users

US Server

[https://us.api.knowbe4.com/v1/users](https://us.api.knowbe4.com/v1/users)

EU Server

[https://eu.api.knowbe4.com/v1/users](https://eu.api.knowbe4.com/v1/users)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"id": 667542,"employee_number": "19425","first_name": "William","last_name": "Marcoux","job_title": "VP of Sales","email": "wmarcoux@kb4-demo.com","phish_prone_percentage": 14.235,"phone_number": "555-554-2222","extension": "42","mobile_phone_number": "555-553-4422","location": "Office A","division": "Sales","manager_name": "Michael Scott","manager_email": "mscott@kb4-demo.com","provisioning_managed": false,"provisioning_guid": null,"groups": [3264],"current_risk_score": 45.742,"aliases": ["alias_email@kb4-demo.com"],"joined_on": "2019-04-02T15:02:38.000Z","last_sign_in": "2019-04-02T15:02:38.000Z","status": "active","organization": "KB4-Demo","department": "Sales","language": "English - United States","comment": "Low PPP","employee_start_date": "2019-04-02T15:02:38.000Z","archived_at": null,"custom_field_1": "Building C, 4th Floor","custom_field_2": null,"custom_field_3": null,"custom_field_4": null,"custom_date_1": "1986-11-26","custom_date_2": null}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Users/paths/~1v1~1users~1%7Buser_id%7D/get)Get a Specific User

This endpoint retrieves a specific user based on the provided user identifier (user\_id).

##### Authorizations:

##### path Parameters

user\_id

required integer

User ID

### Responses

**200** Success

get/v1/users/{user\_id}

US Server

[https://us.api.knowbe4.com/v1/users/{user\_id}](https://us.api.knowbe4.com/v1/users/%7Buser_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/users/{user\_id}](https://eu.api.knowbe4.com/v1/users/%7Buser_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"id": 667542,"employee_number": "19425","first_name": "William","last_name": "Marcoux","job_title": "VP of Sales","email": "wmarcoux@kb4-demo.com","phish_prone_percentage": 14.235,"phone_number": "555-554-2222","extension": "42","mobile_phone_number": "555-553-4422","location": "Office A","division": "Sales","manager_name": "Michael Scott","manager_email": "mscott@kb4-demo.com","provisioning_managed": false,"provisioning_guid": null,"groups": [3264],"current_risk_score": 45.742,"aliases": ["alias_email@kb4-demo.com"],"joined_on": "2019-04-02T15:02:38.000Z","last_sign_in": "2019-04-02T15:02:38.000Z","status": "active","organization": "KB4-Demo","department": "Sales","language": "English - United States","comment": "Low PPP","employee_start_date": "2019-04-02T15:02:38.000Z","archived_at": null,"custom_field_1": "Building C, 4th Floor","custom_field_2": null,"custom_field_3": null,"custom_field_4": null,"custom_date_1": "1986-11-26","custom_date_2": null}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Users/paths/~1v1~1groups~1%7Bgroup_id%7D~1members/get)Get a List of Users in a Specific Group

This endpoint retrieves a list of all users who are members of a specific group.

##### Authorizations:

##### path Parameters

group\_id

required integer

Group ID

### Responses

**200** Success

get/v1/groups/{group\_id}/members

US Server

[https://us.api.knowbe4.com/v1/groups/{group\_id}/members](https://us.api.knowbe4.com/v1/groups/%7Bgroup_id%7D/members)

EU Server

[https://eu.api.knowbe4.com/v1/groups/{group\_id}/members](https://eu.api.knowbe4.com/v1/groups/%7Bgroup_id%7D/members)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"id": 667542,"employee_number": "19425","first_name": "William","last_name": "Marcoux","job_title": "VP of Sales","email": "wmarcoux@kb4-demo.com","phish_prone_percentage": 14.235,"phone_number": "555-554-2222","extension": "42","mobile_phone_number": "555-553-4422","location": "Office A","division": "Sales","manager_name": "Michael Scott","manager_email": "mscott@kb4-demo.com","provisioning_managed": false,"provisioning_guid": null,"groups": [3264],"current_risk_score": 45.742,"aliases": ["alias_email@kb4-demo.com"],"joined_on": "2019-04-02T15:02:38.000Z","last_sign_in": "2019-04-02T15:02:38.000Z","status": "active","organization": "KB4-Demo","department": "Sales","language": "English - United States","comment": "Low PPP","employee_start_date": "2019-04-02T15:02:38.000Z","archived_at": null,"custom_field_1": "Building C, 4th Floor","custom_field_2": null,"custom_field_3": null,"custom_field_4": null,"custom_date_1": "1986-11-26","custom_date_2": null}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Users/paths/~1v1~1users~1%7Buser_id%7D~1risk_score_history/get)Get a Specific User's Risk Score History

This endpoint retrieves risk score history for a specific user based on the provided user identifier (user\_id).

##### Authorizations:

##### query Parameters

full=true Array of arrays

Include the entire risk score history of a specifc user. If this parameter isn't used, six months of data will show by default.

### Responses

**200** Success

get/v1/users/{user\_id}/risk\_score\_history

US Server

[https://us.api.knowbe4.com/v1/users/{user\_id}/risk\_score\_history](https://us.api.knowbe4.com/v1/users/%7Buser_id%7D/risk_score_history)

EU Server

[https://eu.api.knowbe4.com/v1/users/{user\_id}/risk\_score\_history](https://eu.api.knowbe4.com/v1/users/%7Buser_id%7D/risk_score_history)

### Response samples

*   200

Content type

application/json

Copy

`{"risk_score": 37.3,"date": "2021-02-07"}`

# [](https://developer.knowbe4.com/rest/reporting#tag/Groups)Groups

[Find out more at KnowBe4.com](http://knowbe4.com/)

## [](https://developer.knowbe4.com/rest/reporting#tag/Groups/paths/~1v1~1groups/get)Get a List of All Groups

This endpoint retrieves a list of all groups in your KnowBe4 account.

##### Authorizations:

##### query Parameters

status=active string

Returns a list of all active groups in your account. status=archived string

Returns a list of all archived groups in your account.

### Responses

**200** Success

get/v1/groups

US Server

[https://us.api.knowbe4.com/v1/groups](https://us.api.knowbe4.com/v1/groups)

EU Server

[https://eu.api.knowbe4.com/v1/groups](https://eu.api.knowbe4.com/v1/groups)

### Response samples

*   200

Content type

application/json

Copy

`{"id": 3142,"name": "Customer Service","group_type": "console_group","provisioning_guid": "abc12345-6789-abc-1234-456789abc123","member_count": 42,"current_risk_score": 45.742,"status": "active"}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Groups/paths/~1v1~1groups~1%7Bgroup_id%7D/get)Get a Specific Group

This endpoint retrieves a specific group in your KnowBe4 account, based on the provided group identifier (group\_id).

##### Authorizations:

##### path Parameters

group\_id

required integer

Group ID

### Responses

**200** Success

get/v1/groups/{group\_id}

US Server

[https://us.api.knowbe4.com/v1/groups/{group\_id}](https://us.api.knowbe4.com/v1/groups/%7Bgroup_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/groups/{group\_id}](https://eu.api.knowbe4.com/v1/groups/%7Bgroup_id%7D)

### Response samples

*   200

Content type

application/json

Copy

`{"id": 3142,"name": "Customer Service","group_type": "console_group","provisioning_guid": "abc12345-6789-abc-1234-456789abc123","member_count": 42,"current_risk_score": 45.742,"status": "active"}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Groups/paths/~1v1~1groups~1%7Bgroup_id%7D~1risk_score_history/get)Get a Specific Group's Risk Score History

This endpoint retrieves risk score history for a specific group in your KnowBe4 account, based on the provided group identifier (group\_id).

##### Authorizations:

##### query Parameters

full=true Array of arrays

Include the entire risk score history for a specific group. If this parameter isn't used, six months of data will show by default.

### Responses

**200** Success

get/v1/groups/{group\_id}/risk\_score\_history

US Server

[https://us.api.knowbe4.com/v1/groups/{group\_id}/risk\_score\_history](https://us.api.knowbe4.com/v1/groups/%7Bgroup_id%7D/risk_score_history)

EU Server

[https://eu.api.knowbe4.com/v1/groups/{group\_id}/risk\_score\_history](https://eu.api.knowbe4.com/v1/groups/%7Bgroup_id%7D/risk_score_history)

### Response samples

*   200

Content type

application/json

Copy

`{"risk_score": 37.3,"date": "2021-02-07"}`

# [](https://developer.knowbe4.com/rest/reporting#tag/Phishing)Phishing

[Find out more at KnowBe4.com](http://knowbe4.com/)

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1campaigns~1%7Bcampaign_id%7D/get)Get a Specific Phishing Campaign

This endpoint retrieves data from a specific phishing campaign, based on the provided campaign identifier (campaign\_id).

##### Authorizations:

##### path Parameters

campaign\_id

required integer

Campaign ID

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/campaigns/{campaign\_id}

US Server

[https://us.api.knowbe4.com/v1/phishing/campaigns/{campaign\_id}](https://us.api.knowbe4.com/v1/phishing/campaigns/%7Bcampaign_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/campaigns/{campaign\_id}](https://eu.api.knowbe4.com/v1/phishing/campaigns/%7Bcampaign_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"campaign_id": 242333,"name": "One Time Phishing Security Test","groups": [{"group_id": 0,"name": "All Users"}],"last_phish_prone_percentage": 0.3,"last_run": "2019-04-02T15:02:38.000Z","status": "Closed","hidden": false,"send_duration": "3 Business Days","track_duration": "3 Days","frequency": "One Time","difficulty_filter": [1,2,3,4,5],"create_date": "2019-04-02T15:02:38.000Z","psts_count": 1,"psts": [{"pst_id": 1,"status": "Closed","start_date": "2019-04-02T15:02:38.000Z","users_count": 123,"phish_prone_percentage": 0.3}]}]`

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests/get)Get All Phishing Security Tests (PSTs)

This endpoint retrieves a list of all phishing security tests in your account.

##### Authorizations:

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/security\_tests

US Server

[https://us.api.knowbe4.com/v1/phishing/security\_tests](https://us.api.knowbe4.com/v1/phishing/security_tests)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/security\_tests](https://eu.api.knowbe4.com/v1/phishing/security_tests)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"campaign_id": 3423,"pst_id": 16142,"status": "Closed","name": "Corporate Test","groups": [{"group_id": 16342,"name": "Corporate Employees"}],"phish_prone_percentage": 0.5,"started_at": "2019-04-02T15:02:38.000Z","duration": 1,"categories": [{"category_id": 4237,"name": "Current Events"}],"template": {"id": 11428,"name": "CNN Breaking News"},"landing-page": {"id": 1842,"name": "SEI Landing Page"},"scheduled_count": 42,"delivered_count": 4,"opened_count": 24,"clicked_count": 20,"replied_count": 0,"attachment_open_count": 3,"macro_enabled_count": 0,"data_entered_count": 0,"qr_code_scanned_count": 0,"reported_count": 0,"bounced_count": 0}]`

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1campaigns~1%7Bcampaign_id%7D~1security_tests/get)Get All PSTs From a Specific Campaign

This endpoint retrieves a list of all phishing security tests from a specific phishing campaign, based on the provided phishing campaign identifier (campaign\_id).

##### Authorizations:

##### path Parameters

campaign\_id

required integer

Campaign ID

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/campaigns/{campaign\_id}/security\_tests

US Server

[https://us.api.knowbe4.com/v1/phishing/campaigns/{campaign\_id}/security\_tests](https://us.api.knowbe4.com/v1/phishing/campaigns/%7Bcampaign_id%7D/security_tests)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/campaigns/{campaign\_id}/security\_tests](https://eu.api.knowbe4.com/v1/phishing/campaigns/%7Bcampaign_id%7D/security_tests)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"campaign_id": 3423,"pst_id": 16142,"status": "Closed","name": "Corporate Test","groups": [{"group_id": 16342,"name": "Corporate Employees"}],"phish_prone_percentage": 0.5,"started_at": "2019-04-02T15:02:38.000Z","duration": 1,"categories": [{"category_id": 4237,"name": "Current Events"}],"template": {"id": 11428,"name": "CNN Breaking News"},"landing-page": {"id": 1842,"name": "SEI Landing Page"},"scheduled_count": 42,"delivered_count": 4,"opened_count": 24,"clicked_count": 20,"replied_count": 0,"attachment_open_count": 3,"macro_enabled_count": 0,"data_entered_count": 0,"qr_code_scanned_count": 0,"reported_count": 0,"bounced_count": 0}]`

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1%7Bpst_id%7D/get)Get a Specific PST

This endpoint retrieves data from a specific phishing security test, based on the provided phishing security test identifier (pst\_id).

##### Authorizations:

##### path Parameters

pst\_id

required integer

PST ID

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/security\_tests/{pst\_id}

US Server

[https://us.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}](https://us.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}](https://eu.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"campaign_id": 3423,"pst_id": 16142,"status": "Closed","name": "Corporate Test","groups": [{"group_id": 16342,"name": "Corporate Employees"}],"phish_prone_percentage": 0.5,"started_at": "2019-04-02T15:02:38.000Z","duration": 1,"categories": [{"category_id": 4237,"name": "Current Events"}],"template": {"id": 11428,"name": "CNN Breaking News"},"landing-page": {"id": 1842,"name": "SEI Landing Page"},"scheduled_count": 42,"delivered_count": 4,"opened_count": 24,"clicked_count": 20,"replied_count": 0,"attachment_open_count": 3,"macro_enabled_count": 0,"data_entered_count": 0,"qr_code_scanned_count": 0,"reported_count": 0,"bounced_count": 0}]`

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1%7Bpst_id%7D~1recipients/get)Get All Recipient Results

This endpoint retrieves a list of all the recipients (users) that were part of a specific phishing security test, based on the provided phishing security test identifier (pst\_id).

##### Authorizations:

##### path Parameters

pst\_id

required integer

PST ID

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/security\_tests/{pst\_id}/recipients

US Server

[https://us.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}/recipients](https://us.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D/recipients)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}/recipients](https://eu.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D/recipients)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"recipient_id": 3077742,"pst_id": 14240,"user": {"id": 264215,"provisioning_guid": null,"first_name": "Bob","last_name": "Ross","email": "bob.r@kb4-demo.com"},"template": {"id": 2,"name": "Your Amazon Order"},"scheduled_at": "2019-04-02T15:02:38.000Z","delivered_at": "2019-04-02T15:02:38.000Z","opened_at": "2019-04-02T15:02:38.000Z","clicked_at": "2019-04-02T15:02:38.000Z","replied_at": null,"attachment_opened_at": null,"macro_enabled_at": null,"data_entered_at": "2019-04-02T15:02:38.000Z","qr_code_scanned": "2022-05-12T15:29:54.000Z","reported_at": null,"bounced_at": null,"ip": "XX.XX.XXX.XXX","ip_location": "St.Petersburg, FL","browser": "Chrome","browser_version": "48.0","os": "MacOSX"}]`

## [](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1%7Bpst_id%7D~1recipients~1%7Brecipient_id%7D/get)Get a Specific Recipient's Results

This endpoint retrieves details about a specific user's phishing security test results, based on the provided phishing security test identifier (pst\_id) and recipient identifier (recipient\_id).

##### Authorizations:

##### path Parameters

pst\_id

required integer

PST ID recipient\_id

required integer

Recipient ID

##### query Parameters

campaign\_type=callback string

Returns information related to callback phishing campaigns.

### Responses

**200** Success

get/v1/phishing/security\_tests/{pst\_id}/recipients/{recipient\_id}

US Server

[https://us.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}/recipients/{recipient\_id}](https://us.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D/recipients/%7Brecipient_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/phishing/security\_tests/{pst\_id}/recipients/{recipient\_id}](https://eu.api.knowbe4.com/v1/phishing/security_tests/%7Bpst_id%7D/recipients/%7Brecipient_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`[{"recipient_id": 3077742,"pst_id": 14240,"user": {"id": 264215,"provisioning_guid": null,"first_name": "Bob","last_name": "Ross","email": "bob.r@kb4-demo.com"},"template": {"id": 2,"name": "Your Amazon Order"},"scheduled_at": "2019-04-02T15:02:38.000Z","delivered_at": "2019-04-02T15:02:38.000Z","opened_at": "2019-04-02T15:02:38.000Z","clicked_at": "2019-04-02T15:02:38.000Z","replied_at": null,"attachment_opened_at": null,"macro_enabled_at": null,"data_entered_at": "2019-04-02T15:02:38.000Z","qr_code_scanned": "2022-05-12T15:29:54.000Z","reported_at": null,"bounced_at": null,"ip": "XX.XX.XXX.XXX","ip_location": "St.Petersburg, FL","browser": "Chrome","browser_version": "48.0","os": "MacOSX"}]`

# [](https://developer.knowbe4.com/rest/reporting#tag/Training)Training

[Find out more at KnowBe4.com](http://knowbe4.com/)

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1store_purchases/get)Get all Store Purchases

This endpoint retrieves a list of all Store Purchases in your KnowBe4 account.

##### Authorizations:

### Responses

**200** Success

get/v1/training/store\_purchases

US Server

[https://us.api.knowbe4.com/v1/training/store\_purchases](https://us.api.knowbe4.com/v1/training/store_purchases)

EU Server

[https://eu.api.knowbe4.com/v1/training/store\_purchases](https://eu.api.knowbe4.com/v1/training/store_purchases)

### Response samples

*   200

Content type

application/json

Copy

`{"store_purchased_id": 6420,"content_type": "Store Purchase","name": "FFIEC (Financial Compliance)","description": "This module covers specific IT...","type": "Training Module","duration": 40,"retired": false,"retirement_date": null,"publish_date": "2019-04-02T15:02:38.000Z","publisher": "Security Awareness Company","purchase_date": "2019-04-02T15:02:38.000Z","policy_url": null}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1store_purchases~1%7Bstore_purchase_id%7D/get)Get a Specific Store Purchase

This endpoint retrieves a specific Store Purchase from your KnowBe4 account.

##### Authorizations:

##### path Parameters

store\_purchase\_id

required integer

Store Purchase ID

### Responses

**200** Success

get/v1/training/store\_purchases/{store\_purchase\_id}

US Server

[https://us.api.knowbe4.com/v1/training/store\_purchases/{store\_purchase\_id}](https://us.api.knowbe4.com/v1/training/store_purchases/%7Bstore_purchase_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/training/store\_purchases/{store\_purchase\_id}](https://eu.api.knowbe4.com/v1/training/store_purchases/%7Bstore_purchase_id%7D)

### Response samples

*   200

Content type

application/json

Copy

`{"store_purchased_id": 6420,"content_type": "Store Purchase","name": "FFIEC (Financial Compliance)","description": "This module covers specific IT...","type": "Training Module","duration": 40,"retired": false,"retirement_date": null,"publish_date": "2019-04-02T15:02:38.000Z","publisher": "Security Awareness Company","purchase_date": "2019-04-02T15:02:38.000Z","policy_url": null}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1policies/get)Get all Policies

This endpoint retrieves a list of all uploaded policies in your KnowBe4 account.

##### Authorizations:

### Responses

**200** Success

get/v1/training/policies

US Server

[https://us.api.knowbe4.com/v1/training/policies](https://us.api.knowbe4.com/v1/training/policies)

EU Server

[https://eu.api.knowbe4.com/v1/training/policies](https://eu.api.knowbe4.com/v1/training/policies)

### Response samples

*   200

Content type

application/json

Copy

`{"policy_id": 2420,"content_type": "Uploaded Policy","name": "Physical Security Policy","minimum_time": 3,"default_language": "en-us","status": 1}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1policies~1%7Bpolicy_id%7D/get)Get a Specific Policy

This endpoint retrieves a specific uploaded policy from your KnowBe4 account.

##### Authorizations:

##### path Parameters

policy\_id

required integer

### Responses

**200** Success

get/v1/training/policies/{policy\_id}

US Server

[https://us.api.knowbe4.com/v1/training/policies/{policy\_id}](https://us.api.knowbe4.com/v1/training/policies/%7Bpolicy_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/training/policies/{policy\_id}](https://eu.api.knowbe4.com/v1/training/policies/%7Bpolicy_id%7D)

### Response samples

*   200

Content type

application/json

Copy

`{"policy_id": 2420,"content_type": "Uploaded Policy","name": "Physical Security Policy","minimum_time": 3,"default_language": "en-us","status": 1}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1campaigns/get)Get all Training Campaigns

Retrieves a list of all training campaigns in your account.

##### Authorizations:

##### query Parameters

exclude\_percentages=false boolean

Excludes the `completion_percentage` field from the response to greatly speed up response time. If this parameter is set to anything other than `true`, the response limit will be set to 10.

### Responses

**200** Success

get/v1/training/campaigns

US Server

[https://us.api.knowbe4.com/v1/training/campaigns](https://us.api.knowbe4.com/v1/training/campaigns)

EU Server

[https://eu.api.knowbe4.com/v1/training/campaigns](https://eu.api.knowbe4.com/v1/training/campaigns)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"campaign_id": 4261,"name": "Annual Training","groups": [{"group_id": 0,"name": "All Users"}],"status": "Completed","content": [[{"store_purchase_id": 7,"content_type": "Store Purchase","name": "2019 Security Awareness Training","description": "A comprehensive overview of best practices...","type": "Training Module","duration": 42,"retired": false,"retirement_date": null,"publish_date": "2019-04-02T15:02:38.000Z","publisher": "KnowBe4","purchase_date": "2019-04-02T15:02:38.000Z","policy_url": "https://www.yourcompany.com/employees/acceptableusepolicy.html"},{"policy_id": 142,"content_type": "Uploaded Policy","name": "Security Awareness Policy","minimum_time": 3,"default_language": "en-us","published": true}]],"duration_type": "Specific End Date","start_date": "2019-04-02T15:02:38.000Z","end_date": "2019-04-02T15:02:38.000Z","relative_duration": "string","auto_enroll": true,"allow_multiple_enrollments": false,"completion_percentage": 0}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1campaigns~1%7Bcampaign_id%7D/get)Get a Specific Training Campaign

This endpoint retrieves a specific Training Campaign from your KnowBe4 account.

##### Authorizations:

##### path Parameters

campaign\_id

required integer

### Responses

**200** Success

get/v1/training/campaigns/{campaign\_id}

US Server

[https://us.api.knowbe4.com/v1/training/campaigns/{campaign\_id}](https://us.api.knowbe4.com/v1/training/campaigns/%7Bcampaign_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/training/campaigns/{campaign\_id}](https://eu.api.knowbe4.com/v1/training/campaigns/%7Bcampaign_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"campaign_id": 4261,"name": "Annual Training","groups": [{"group_id": 0,"name": "All Users"}],"status": "Completed","content": [[{"store_purchase_id": 7,"content_type": "Store Purchase","name": "2019 Security Awareness Training","description": "A comprehensive overview of best practices...","type": "Training Module","duration": 42,"retired": false,"retirement_date": null,"publish_date": "2019-04-02T15:02:38.000Z","publisher": "KnowBe4","purchase_date": "2019-04-02T15:02:38.000Z","policy_url": "https://www.yourcompany.com/employees/acceptableusepolicy.html"},{"policy_id": 142,"content_type": "Uploaded Policy","name": "Security Awareness Policy","minimum_time": 3,"default_language": "en-us","published": true}]],"duration_type": "Specific End Date","start_date": "2019-04-02T15:02:38.000Z","end_date": "2019-04-02T15:02:38.000Z","relative_duration": "string","auto_enroll": true,"allow_multiple_enrollments": false,"completion_percentage": 0}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1enrollments/get)Get all Training Enrollments

This endpoint retrieves a list of all Training Enrollments in your KnowBe4 account.

##### Authorizations:

##### query Parameters

store\_purchase\_id=\[store\_purchase\_id\]integer

Returns a list of all training enrollments filtered by module, as indicated by the \[store\_purchase\_id\]. campaign\_id=\[campaign\_id\]integer

Returns a list of all training enrollments filtered by a campaign, as indicated by the \[campaign\_id\]. If the Show Scores option is enabled for a training campaign, the scores will also be displayed in the API. user\_id=\[user\_id\]integer

Returns a list of all training enrollments filtered by a user, as indicated by the \[user\_id\] exclude\_archived\_users=true boolean

Excludes archived users when returning a list of training enrollments include\_campaign\_id=true boolean

Returns the campaign ID for each training enrollment. include\_store\_purchase\_id=true boolean

Returns the store purchase ID for each training enrollment. include\_employee\_number=true boolean

Returns the employee number for each training enrollment.

### Responses

**200** Success

get/v1/training/enrollments

US Server

[https://us.api.knowbe4.com/v1/training/enrollments](https://us.api.knowbe4.com/v1/training/enrollments)

EU Server

[https://eu.api.knowbe4.com/v1/training/enrollments](https://eu.api.knowbe4.com/v1/training/enrollments)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"enrollment_id": 1425526,"content_type": "Uploaded Policy","module_name": "Acceptable Use Policy","user": {"id": 796742,"first_name": "Sarah","last_name": "Thomas","email": "s_thomas@kb4-demo.com","employee_number": 123456},"campaign_name": "New Employee Policies","enrollment_date": "2019-04-02T15:02:38.000Z","start_date": "2019-04-02T15:02:38.000Z","completion_date": "2019-04-02T15:02:38.000Z","status": "Passed","time_spent": 2340,"policy_acknowledged": false}`

## [](https://developer.knowbe4.com/rest/reporting#tag/Training/paths/~1v1~1training~1enrollments~1%7Benrollment_id%7D/get)Get a Specific Training Enrollment

This endpoint retrieves a specific Training Enrollment from your KnowBe4 account.

##### Authorizations:

##### path Parameters

enrollment\_id

required integer

Enrollment ID

##### query Parameters

include\_campaign\_id=true boolean

Returns the campaign ID for each training enrollment.

### Responses

**200** Success

get/v1/training/enrollments/{enrollment\_id}

US Server

[https://us.api.knowbe4.com/v1/training/enrollments/{enrollment\_id}](https://us.api.knowbe4.com/v1/training/enrollments/%7Benrollment_id%7D)

EU Server

[https://eu.api.knowbe4.com/v1/training/enrollments/{enrollment\_id}](https://eu.api.knowbe4.com/v1/training/enrollments/%7Benrollment_id%7D)

### Response samples

*   200

Content type

application/json

Copy

Expand all Collapse all

`{"enrollment_id": 1425526,"content_type": "Uploaded Policy","module_name": "Acceptable Use Policy","user": {"id": 796742,"first_name": "Sarah","last_name": "Thomas","email": "s_thomas@kb4-demo.com","employee_number": 123456},"campaign_name": "New Employee Policies","enrollment_date": "2019-04-02T15:02:38.000Z","start_date": "2019-04-02T15:02:38.000Z","completion_date": "2019-04-02T15:02:38.000Z","status": "Passed","time_spent": 2340,"policy_acknowledged": false}`

# [](https://developer.knowbe4.com/rest/reporting#tag/Rate-Limiting)Rate Limiting

Usage of KnowBe4's Reporting APIs is limited to 2,000 requests per day plus the number of licensed users on your account. The APIs may only be accessed four times per second. The API burst limit is 50 requests per minute. Please note that the API bursts limits will start around five (5) minutes and the API daily limit starts around twenty-four (24) hours from the first API request.

By using KnowBe4's APIs, you agree to our API [Terms of Use](https://developer.knowbe4.com/rest/reporting#tag/Terms-of-Use).

# [](https://developer.knowbe4.com/rest/reporting#tag/Terms-of-Use)Terms of Use

## API Terms of Use

***

This agreement (“Terms”) between you and KnowBe4, Inc. applies to your use of KnowBe4’s Application Programming Interface (“API”), alone or in combination with any services provided by KnowBe4 as defined in KnowBe4’s Terms of Service and Privacy Policy (collectively “KnowBe4 Terms”). By using the APIs, you’re agreeing to these API Terms and the KnowBe4 Terms.

### Section 1: Account and Registration

1.  **Accepting the Terms**: You may not use the APIs and may not accept the API Terms if (a) you are not of legal age to form a binding contract with KnowBe4, or (b) you are a person barred from using or receiving the APIs under the applicable laws of the United States or other countries including the country in which you are a resident or from which you use the APIs.
    
2.  **Entity Level Acceptance**: If you are using the APIs on behalf of an entity, you represent and warrant that you have authority to bind that entity to the Terms and by accepting the Terms, you are doing so on behalf of that entity (and all references to "you" in the Terms refer to that entity).
    
3.  **Registration**: In order to access the APIs you will be required to provide certain information (such as an account-specific secret key provided to you through the KnowBe4 console) to authenticate the APIs, or as part of your continued use of the APIs.
    

### Section 2: Using Our APIs

1.  **Compliance with Law, Third Party Rights, and Other KnowBe4 Terms of Service**: You will comply with all applicable law, regulation, and third party rights (including without limitation laws regarding the import or export of data or software, privacy, and local laws). You will not use the APIs to encourage or promote illegal activity or violation of third party rights. You will not violate any other terms of service with KnowBe4 (or its affiliates).
    
2.  **Permitted Access**: You will only access (or attempt to access) the APIs by the means described in the documentation. When KnowBe4 assigns you account-specific secret keys, you must use them with the applicable APIs. You will not misrepresent or mask your identity when using the APIs.
    
3.  **API Limitations**: KnowBe4 sets and enforces limits on your use of the APIs (e.g. limiting the number of API requests that you may make), in our sole discretion. API usage is designed for internal usage and as such the usage is limited to 2,000 requests per day plus the number of licensed users on your account. The APIs may only be accessed four times per second. You agree to, and will not attempt to circumvent, such limitations.
    
4.  **Feedback**: If you provide feedback or suggestions about our APIs, then we (and those we allow) may use such information without obligation to you.
    

### Section 3: Use

1.  **Monitoring**: The APIs are designed to help you access and export data derived from your KnowBe4 platform. YOU AGREE THAT KNOWBE4 MAY MONITOR USE OF THE APIS TO ENSURE QUALITY, IMPROVE KNOWBE4 PRODUCTS AND SERVICES, AND VERIFY YOUR COMPLIANCE WITH THE TERMS. You will not interfere with this monitoring. KnowBe4 may use any technical means to overcome such interference. KnowBe4 may suspend access to the APIs by you without notice if we reasonably believe that you are in violation of the Terms.
    
2.  **Security**: You will use commercially reasonable efforts to protect user information from unauthorized access or use and will promptly report to your users any unauthorized access or use of such information to the extent required by applicable law.
    
3.  **Ownership**: KnowBe4 does not acquire ownership in your websites or applications, and by using our APIs, you do not acquire ownership of any rights in our APIs or the content that is accessed through our APIs.
    
4.  **User Privacy**: You will comply with all applicable privacy laws and regulations. You will provide and adhere to a privacy policy for your API use that clearly and accurately describes to users of your website or application what user information you collect and how you use and share such information (including for advertising) with KnowBe4 and third parties.
    

### Section 4: Prohibitions and Confidentiality

1.  **API Prohibitions**: When using the APIs, you may not (or allow those acting on your behalf to):

```
1.    Sublicense an API for use by a third party. Consequently, you will not create a website, platform, or application that functions substantially the same as the APIs or the KnowBe4 platform and offer it for use by third parties. 
2.    Perform an action with the intent of introducing to KnowBe4 products and services any viruses, worms, defects, Trojan horses, malware, or any items of a destructive nature. 
3.    Defame, abuse, harass, stalk, or threaten others. 
4.    Interfere with or disrupt the APIs or the servers or networks providing the APIs. 
5.    Promote or facilitate unlawful online gambling or disruptive commercial messages or advertisements. 
6.    Reverse engineer or attempt to extract the source code from any API or any related software, except to the extent that this restriction is expressly prohibited by applicable law. 
7.    Use the APIs for any activities where the use or failure of the APIs could lead to death, personal injury, or environmental damage (such as the operation of nuclear facilities, air traffic control, or life support systems). 
8.    Use the APIs to process or store any data that is subject to the International Traffic in Arms Regulations maintained by the U.S. Department of State. 
9.    Remove, obscure, or alter any KnowBe4 terms of service or any links to or notices of those terms. Unless otherwise specified in writing by KnowBe4, KnowBe4 does not intend use of the APIs to create obligations under the Health Insurance Portability and Accountability Act, as amended ("HIPAA"), and makes no representations that the APIs satisfy HIPAA requirements. If you are (or become) a "covered entity" or "business associate" as defined in HIPAA, you will not use the APIs for any purpose or in any manner involving transmitting protected health information to KnowBe4 unless you have received prior written consent to such use from KnowBe4. 
```

2.  **Confidential Matters**

```
1.    Credentials (such as passwords, account-specific secret keys, and client IDs) are intended to be used by you to authenticate the APIs. You will keep your credentials confidential and make reasonable efforts to prevent and discourage others from using your credentials. Credentials may not be embedded in open source projects. 
2.    Our communications to you and our APIs may contain KnowBe4 confidential information. KnowBe4 confidential information includes any materials, communications, and information that are marked confidential or that would normally be considered confidential under the circumstances. If you receive any such information, then you will not disclose it to any third party without KnowBe4's prior written consent. KnowBe4 confidential information does not include information that you independently developed, that was rightfully given to you by a third party without confidentiality obligation, or that becomes public through no fault of your own. You may disclose KnowBe4 confidential information when compelled to do so by law if you provide us reasonable prior notice, unless a court orders that we not receive notice. 
```

### Section 5: Brand Features; Attribution

1.  **Brand Features**: "Brand Features" is defined as the trade names, trademarks, service marks, logos, domain names, and other distinctive brand features of each party. Except where expressly stated, the Terms do not grant either party any right, title, or interest in or to the other party's Brand Features. All use by you of KnowBe4's Brand Features (including any goodwill associated therewith) will inure to the benefit of KnowBe4.
    
2.  **Attribution**: You agree to display any attribution(s) required by KnowBe4 as described in the documentation for the APIs. KnowBe4 hereby grants to you a nontransferable, nonsublicenseable, nonexclusive license while the Terms are in effect to display KnowBe4's Brand Features for the purpose of promoting or advertising that you use the APIs. You must only use the KnowBe4 Brand Features in accordance with the Terms and for the purpose of fulfilling your obligations under this Section. You understand and agree that KnowBe4 has the sole discretion to determine whether your attribution(s) and use of KnowBe4's Brand Features are in accordance with this section.
    
3.  **Publicity**: You will not make any statement regarding your use of the APIs which suggests partnership with, sponsorship by, or endorsement by KnowBe4 without KnowBe4's prior written approval.
    

### Section 6: Privacy

1.  By using our APIs, KnowBe4 may use submitted information in accordance with our Privacy Policy.

### Section 7: Termination

1.  **Termination**: You may stop using our APIs at any time with or without notice. Further, if you want to terminate the Terms, you must provide KnowBe4 with prior written notice and upon termination, cease your use of the applicable APIs. KnowBe4 reserves the right to terminate the Terms with you or discontinue the APIs or any portion or feature or your access thereto for any reason and at any time without liability or other obligation to you.
    
2.  **Your Obligations Post-Termination**: Upon any termination of the Terms or discontinuation of your access to an APIs, you will immediately stop using the APIs and cease all use of the KnowBe4 Brand Features.
    
3.  **Surviving Provisions**: When the Terms come to an end, those terms that by their nature are intended to continue indefinitely will continue to apply, including but not limited to: Sections 4b, 7, 8, and 9.
    

### Section 8: Liability for our APIs

1.  **WARRANTIES**: EXCEPT AS EXPRESSLY SET OUT IN THE TERMS, KNOWBE4 NOR ITS VENDORS OR LICENSORS MAKE ANY SPECIFIC PROMISES ABOUT THE APIS. FOR EXAMPLE, WE DON'T MAKE ANY COMMITMENTS ABOUT THE CONTENT ACCESSED THROUGH THE APIS, THE SPECIFIC FUNCTIONS OF THE APIS, OR THEIR RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS. WE PROVIDE THE APIS "AS IS". SOME JURISDICTIONS PROVIDE FOR CERTAIN WARRANTIES, LIKE THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. EXCEPT AS EXPRESSLY PROVIDED FOR IN THE TERMS, TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE ALL WARRANTIES, GUARANTEES, CONDITIONS, REPRESENTATIONS, AND UNDERTAKINGS.
    
2.  **LIMITATION OF LIABILITY**: WHEN PERMITTED BY LAW, KNOWBE4, AND KNOWBE4'S VENDORS AND LICENSORS, WILL NOT BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA; FINANCIAL LOSSES; OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES. TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF KNOWBE4, AND ITS SUPPLIERS AND DISTRIBUTORS, FOR ANY CLAIM UNDER THE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO THE AMOUNT YOU PAID US TO USE THE APPLICABLE APIS (OR, IF WE CHOOSE, TO SUPPLYING YOU THE APIS AGAIN) DURING THE SIX MONTHS PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY. IN ALL CASES, KNOWBE4, AND ITS VENDORS AND LICENSORS, WILL NOT BE LIABLE FOR ANY EXPENSE, LOSS, OR DAMAGE THAT IS NOT REASONABLY FORESEEABLE.
    
3.  **Indemnification**: Unless prohibited by applicable law, you will defend and indemnify KnowBe4, and its affiliates, directors, officers, employees, and users, against all liabilities, damages, losses, costs, fees (including legal fees), and expenses relating to any allegation or third-party legal proceeding to the extent arising from:
    

```
1.    your misuse or your end user's misuse of the APIs; 
2.    your violation or your end user's violation of the Terms; or 
3.    any content or data routed into or used with the APIs by you, those acting on your behalf, or your end users. 
```

### Section 9: General Provisions

1.  **Modification**: We may modify the Terms or any portion to, for example, reflect changes to the law or changes to our APIs. You should look at the Terms regularly. Our documentation will be updated in the event of material changes, depreciations, or removal of functionality from the APIs so that you may continue using the APIs with minimal interruption. Changes will not apply retroactively and will become effective no sooner than 30 days after they are posted. But changes addressing new functions for an APIs or changes made for legal reasons will be effective immediately. If you do not agree to the modified Terms for an API, you should discontinue your use of that API. Your continued use of the API constitutes your acceptance of the modified Terms.
    
2.  **General Legal Terms**: We each agree to contract in the English language. If we provide a translation of the Terms, we do so for your convenience only and the English Terms will solely govern our relationship. The Terms do not create any third party beneficiary rights or any agency, partnership, or joint venture. Nothing in the Terms will limit either party's ability to seek injunctive relief. We are not liable for failure or delay in performance to the extent caused by circumstances beyond our reasonable control. If you do not comply with the Terms, and KnowBe4 does not take action right away, this does not mean that KnowBe4 is giving up any rights that it may have (such as taking action in the future). If it turns out that a particular term is not enforceable, this will not affect any other terms. The Terms are the entire agreement between you and KnowBe4 relating to its subject and supersede any prior or contemporaneous agreements on that subject. The laws of Florida, U.S.A., excluding Florida’s conflict of laws rules, will apply to any disputes arising out of or related to the Terms or the API. ALL CLAIMS ARISING OUT OF OR RELATING TO THE TERMS OR THE APIS WILL BE LITIGATED EXCLUSIVELY IN THE FEDERAL OR STATE COURTS OF HILLSBOROUGH COUNTY OR PINELLAS COUNTY, FLORIDA, USA, AND YOU AND KNOWBE4 CONSENT TO PERSONAL JURISDICTION IN THOSE COURTS.
    

# [](https://developer.knowbe4.com/rest/reporting#tag/Errors)Errors

KnowBe4 uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a campaign wasn't found, etc.), and codes in the 5xx range indicate an error with KnowBe4's servers (these are rare).

| Error Code | Meaning |
| --- | --- |
| 401 | Unauthorized -- Your API key is incorrect. |
| 403 | Forbidden -- The request is not allowed. |
| 404 | Not Found -- The specified resource could not be found. |
| 406 | Incorrect Response Format Requested -- The output must be in JSON format. |
| 429 | Too many requests -- Too many requests were submitted at once. See Rate Limiting section above. |
| 500 | Internal Server Error -- We had a problem with our server. Try again later. |
| 503 | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. |
