# ApiTools SDK

Grab-bag of 30+ free REST tools (encoders, generators, crypto helpers) hosted on a Cloudflare Workers endpoint

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About API Tools

API Tools is a small Cloudflare Workers-hosted collection of REST endpoints listed on [freepublicapis.com](https://freepublicapis.com/api-tools). It bundles roughly thirty utility endpoints under a single base URL (`https://api.apitools.workers.dev`) and is offered without sign-up, API keys, or documented rate limits.

The SDK groups the surface into utility-style entities. Typical things exposed by collections of this kind include:

- cryptography helpers (hashing, simple ciphers)
- encoding/decoding utilities (Base64, URL, etc.)
- generators (IDs, random data, text)
- documentation lookups
- miscellaneous tools and utilities

Operational notes: the upstream homepage was unreachable at enrichment time, and the freepublicapis.com listing flags the service as currently non-functional with a high error rate. There is no published authentication scheme, licence, or SLA, so use it for experimentation rather than for anything load-bearing.

## Try it

**TypeScript**
```bash
npm install api-tools
```

**Python**
```bash
pip install api-tools-sdk
```

**PHP**
```bash
composer require voxgig/api-tools-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/api-tools-sdk/go
```

**Ruby**
```bash
gem install api-tools-sdk
```

**Lua**
```bash
luarocks install api-tools-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ApiToolsSDK } from 'api-tools'

const client = new ApiToolsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o api-tools-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "api-tools": {
      "command": "/abs/path/to/api-tools-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Cryptography** | Cryptography helper endpoints (e.g. hashing or simple cipher utilities) grouped under the API's crypto tools. | `/api/hash` |
| **Encoding** | Encoding and decoding utilities such as Base64 or URL encoding helpers. | `/api/base64/decode` |
| **Generator** | Generator endpoints that produce values like IDs, random strings, or sample data on demand. | `/api/uuid` |
| **GetDocumentation** | Documentation-retrieval endpoints that return descriptive metadata about the available tools. | `/` |
| **Tool** | General-purpose tool endpoints that don't fall neatly into the other categories. | `/api/tools` |
| **Utility** | Miscellaneous utility endpoints exposed alongside the other tool groups. | `/api/ip` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from apitools_sdk import ApiToolsSDK

client = ApiToolsSDK({})

```

### PHP

```php
<?php
require_once 'apitools_sdk.php';

$client = new ApiToolsSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/api-tools-sdk/go"

client := sdk.NewApiToolsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ApiTools_sdk"

client = ApiToolsSDK.new({})

```

### Lua

```lua
local sdk = require("api-tools_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ApiToolsSDK.test()
const result = await client.Cryptography().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ApiToolsSDK.test(None, None)
result, err = client.Cryptography(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ApiToolsSDK::test(null, null);
[$result, $err] = $client->Cryptography(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cryptography(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ApiToolsSDK.test(nil, nil)
result, err = client.Cryptography(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cryptography(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the API Tools

- Upstream: [https://api.apitools.workers.dev](https://api.apitools.workers.dev)
- API docs: [https://freepublicapis.com/api-tools](https://freepublicapis.com/api-tools)

- No licence is published on the catalogue page or the service endpoint.
- Treat the API as informal/experimental; verify terms before relying on it in production.
- The freepublicapis.com listing reports the service as unreliable, so availability is not guaranteed.

---

Generated from the API Tools OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
