# ApiTools Golang SDK



The Golang SDK for the ApiTools API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Cryptography(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/api-tools-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/api-tools-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/api-tools-sdk/go=../api-tools-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/api-tools-sdk/go"
)

func main() {
    client := sdk.New()

    // Create a cryptography.
    created, err := client.Cryptography(nil).Create(map[string]any{"text": "example_text"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
generators, err := client.Generator(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = generators
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

generator, err := client.Generator(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(generator) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewApiToolsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
API_TOOLS_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewApiToolsSDK

```go
func NewApiToolsSDK(options map[string]any) *ApiToolsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ApiToolsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ApiToolsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Cryptography` | `(data map[string]any) ApiToolsEntity` | Create a Cryptography entity instance. |
| `Encoding` | `(data map[string]any) ApiToolsEntity` | Create an Encoding entity instance. |
| `Generator` | `(data map[string]any) ApiToolsEntity` | Create a Generator entity instance. |
| `GetDocumentation` | `(data map[string]any) ApiToolsEntity` | Create a GetDocumentation entity instance. |
| `Tool` | `(data map[string]any) ApiToolsEntity` | Create a Tool entity instance. |
| `Utility` | `(data map[string]any) ApiToolsEntity` | Create an Utility entity instance. |

### Entity interface (ApiToolsEntity)

All entities implement the `ApiToolsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    cryptography, err := client.Cryptography(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // cryptography is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Cryptography

| Field | Description |
| --- | --- |
| `"algorithm"` |  |
| `"hash"` |  |
| `"text"` |  |

Operations: Create.

API path: `/api/hash`

#### Encoding

| Field | Description |
| --- | --- |
| `"decoded"` |  |
| `"encoded"` |  |
| `"text"` |  |

Operations: Create.

API path: `/api/base64/decode`

#### Generator

| Field | Description |
| --- | --- |
| `"type"` |  |
| `"uuid"` |  |
| `"value"` |  |

Operations: List, Load.

API path: `/api/uuid`

#### GetDocumentation

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"endpoint"` |  |
| `"name"` |  |

Operations: List.

API path: `/`

#### Tool

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/tools`

#### Utility

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"country"` |  |
| `"ip"` |  |
| `"iso"` |  |
| `"isp"` |  |
| `"millisecond"` |  |
| `"timestamp"` |  |
| `"utc"` |  |

Operations: Load.

API path: `/api/ip`



## Entities


### Cryptography

Create an instance: `cryptography := client.Cryptography(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `string` |  |
| `hash` | `string` |  |
| `text` | `string` |  |

#### Example: Create

```go
result, err := client.Cryptography(nil).Create(map[string]any{
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Encoding

Create an instance: `encoding := client.Encoding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decoded` | `string` |  |
| `encoded` | `string` |  |
| `text` | `string` |  |

#### Example: Create

```go
result, err := client.Encoding(nil).Create(map[string]any{
    "encoded": "example_encoded",
    "text": "example_text",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Generator

Create an instance: `generator := client.Generator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` |  |
| `uuid` | `string` |  |
| `value` | `any` |  |

#### Example: Load

```go
generator, err := client.Generator(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(generator) // the loaded record
```

#### Example: List

```go
generators, err := client.Generator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(generators) // the array of records
```


### GetDocumentation

Create an instance: `getDocumentation := client.GetDocumentation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `endpoint` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
getDocumentations, err := client.GetDocumentation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getDocumentations) // the array of records
```


### Tool

Create an instance: `tool := client.Tool(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
tools, err := client.Tool(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tools) // the array of records
```


### Utility

Create an instance: `utility := client.Utility(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `country` | `string` |  |
| `ip` | `string` |  |
| `iso` | `string` |  |
| `isp` | `string` |  |
| `millisecond` | `int` |  |
| `timestamp` | `int` |  |
| `utc` | `string` |  |

#### Example: Load

```go
utility, err := client.Utility(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(utility) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/api-tools-sdk/go/
├── api-tools.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/api-tools-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
generator := client.Generator(nil)
generator.List(nil, nil)

// generator.Data() now returns the generator data from the last list
// generator.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
