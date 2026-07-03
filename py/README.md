# ApiTools Python SDK



The Python SDK for the ApiTools API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
pip install voxgig-sdk-api-tools
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from apitools_sdk import ApiToolsSDK

client = ApiToolsSDK({
    "apikey": os.environ.get("API-TOOLS_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create
created, _ = client.Cryptography().create({"name": "Example"})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ApiToolsSDK.test()

result, err = client.ApiTools().load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ApiToolsSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
API-TOOLS_TEST_LIVE=TRUE
API-TOOLS_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### ApiToolsSDK

```python
from apitools_sdk import ApiToolsSDK

client = ApiToolsSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ApiToolsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ApiToolsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Cryptography` | `(data) -> CryptographyEntity` | Create a Cryptography entity instance. |
| `Encoding` | `(data) -> EncodingEntity` | Create a Encoding entity instance. |
| `Generator` | `(data) -> GeneratorEntity` | Create a Generator entity instance. |
| `GetDocumentation` | `(data) -> GetDocumentationEntity` | Create a GetDocumentation entity instance. |
| `Tool` | `(data) -> ToolEntity` | Create a Tool entity instance. |
| `Utility` | `(data) -> UtilityEntity` | Create a Utility entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Cryptography

| Field | Description |
| --- | --- |
| `algorithm` |  |
| `hash` |  |
| `text` |  |

Operations: Create.

API path: `/api/hash`

#### Encoding

| Field | Description |
| --- | --- |
| `decoded` |  |
| `encoded` |  |
| `text` |  |

Operations: Create.

API path: `/api/base64/decode`

#### Generator

| Field | Description |
| --- | --- |
| `type` |  |
| `uuid` |  |
| `value` |  |

Operations: List, Load.

API path: `/api/uuid`

#### GetDocumentation

| Field | Description |
| --- | --- |
| `description` |  |
| `endpoint` |  |
| `name` |  |

Operations: List.

API path: `/`

#### Tool

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/api/tools`

#### Utility

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `ip` |  |
| `iso` |  |
| `isp` |  |
| `millisecond` |  |
| `timestamp` |  |
| `utc` |  |

Operations: Load.

API path: `/api/ip`



## Entities


### Cryptography

Create an instance: `const cryptography = client.Cryptography()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | ``$STRING`` |  |
| `hash` | ``$STRING`` |  |
| `text` | ``$STRING`` |  |

#### Example: Create

```ts
const cryptography = await client.Cryptography().create({
  text: /* `$STRING` */,
})
```


### Encoding

Create an instance: `const encoding = client.Encoding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `decoded` | ``$STRING`` |  |
| `encoded` | ``$STRING`` |  |
| `text` | ``$STRING`` |  |

#### Example: Create

```ts
const encoding = await client.Encoding().create({
  encoded: /* `$STRING` */,
  text: /* `$STRING` */,
})
```


### Generator

Create an instance: `const generator = client.Generator()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | ``$STRING`` |  |
| `uuid` | ``$STRING`` |  |
| `value` | ``$ANY`` |  |

#### Example: Load

```ts
const generator = await client.Generator().load({ id: 'generator_id' })
```

#### Example: List

```ts
const generators = await client.Generator().list()
```


### GetDocumentation

Create an instance: `const get_documentation = client.GetDocumentation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `endpoint` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```ts
const get_documentations = await client.GetDocumentation().list()
```


### Tool

Create an instance: `const tool = client.Tool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```ts
const tools = await client.Tool().list()
```


### Utility

Create an instance: `const utility = client.Utility()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `iso` | ``$STRING`` |  |
| `isp` | ``$STRING`` |  |
| `millisecond` | ``$INTEGER`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `utc` | ``$STRING`` |  |

#### Example: Load

```ts
const utility = await client.Utility().load({ id: 'utility_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── apitools_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`apitools_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
