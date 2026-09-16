# API Tools

API Tools – Access over 30+ REST APIs, all completely free with no usage limits. Explore a wide range of tools designed for everyone, no sign-up or restrictions required!

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Cryptography

Results: Successful response with hash.

SDK operations: `create`.

Key fields to recognise:

- `algorithm`: Hashing algorithm
- `text`: Text to hash

### Encoding

Results: Successful response with decoded text; Successful response with Base64 encoded text; Successful response with URL encoded text.

SDK operations: `create`.

Key fields to recognise:

- `encoded`: Base64 encoded text to decode
- `text`: Text to encode

### Generator

Results: Successful response with generated UUID(s); Successful response with random data; Successful response with QR code image.

SDK operations: `list`, `load`.

### GetDocumentation

Results: Successful response with API documentation.

SDK operations: `list`.

Key fields to recognise:

- `description`: Description of the API
- `endpoint`: Endpoint path for the API
- `name`: Name of the API

### Tool

Results: Successful response with list of API tools.

SDK operations: `list`.

### Utility

Results: Successful response with IP information; Successful response with timestamp information.

SDK operations: `load`.

Key fields to recognise:

- `iso`: ISO 8601 formatted date
- `milliseconds`: Unix timestamp in milliseconds
- `timestamp`: Unix timestamp in seconds
- `utc`: UTC formatted date

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Cryptography | `create` | `POST /api/hash` | See reference |
| Encoding | `create` | `POST /api/base64/decode` | See reference |
| Encoding | `create` | `POST /api/base64/encode` | See reference |
| Encoding | `create` | `POST /api/url/decode` | See reference |
| Encoding | `create` | `POST /api/url/encode` | See reference |
| Generator | `list` | `GET /api/uuid` | See reference |
| Generator | `load` | `GET /api/random` | See reference |
| Generator | `load` | `GET /api/qrcode` | See reference |
| GetDocumentation | `list` | `GET /` | See reference |
| Tool | `list` | `GET /api/tools` | See reference |
| Utility | `load` | `GET /api/ip` | See reference |
| Utility | `load` | `GET /api/timestamp` | See reference |

## Connect to the API

- API Tools Production Server: `https://api.apitools.workers.dev`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `api-tools_list`: List records for an entity. Supported entities: `generator`, `get_documentation`, `tool`.
- `api-tools_load`: Load one record for an entity. Supported entities: `generator`, `utility`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

