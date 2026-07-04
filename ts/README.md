# ApiTools TypeScript SDK



The TypeScript SDK for the ApiTools API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/api-tools-sdk/releases](https://github.com/voxgig-sdk/api-tools-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ApiToolsSDK } from '@voxgig-sdk/api-tools'

const client = new ApiToolsSDK()
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.cryptography.create({
  name: 'Example',
})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ApiToolsSDK.test()

const result = await client.cryptography.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new ApiToolsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.cryptography

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ApiToolsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
API_TOOLS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ApiToolsSDK

#### Constructor

```ts
new ApiToolsSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Cryptography(data?)` | `CryptographyEntity` | Create a Cryptography entity instance. |
| `Encoding(data?)` | `EncodingEntity` | Create a Encoding entity instance. |
| `Generator(data?)` | `GeneratorEntity` | Create a Generator entity instance. |
| `GetDocumentation(data?)` | `GetDocumentationEntity` | Create a GetDocumentation entity instance. |
| `Tool(data?)` | `ToolEntity` | Create a Tool entity instance. |
| `Utility(data?)` | `UtilityEntity` | Create a Utility entity instance. |
| `tester(testopts?, sdkopts?)` | `ApiToolsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ApiToolsSDK.test(testopts?, sdkopts?)` | `ApiToolsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ApiToolsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Cryptography

| Field | Description |
| --- | --- |
| `algorithm` |  |
| `hash` |  |
| `text` |  |

Operations: create.

API path: `/api/hash`

#### Encoding

| Field | Description |
| --- | --- |
| `decoded` |  |
| `encoded` |  |
| `text` |  |

Operations: create.

API path: `/api/base64/decode`

#### Generator

| Field | Description |
| --- | --- |
| `type` |  |
| `uuid` |  |
| `value` |  |

Operations: list, load.

API path: `/api/uuid`

#### GetDocumentation

| Field | Description |
| --- | --- |
| `description` |  |
| `endpoint` |  |
| `name` |  |

Operations: list.

API path: `/`

#### Tool

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: list.

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

Operations: load.

API path: `/api/ip`



## Entities


### Cryptography

Create an instance: `const cryptography = client.cryptography`

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
const cryptography = await client.cryptography.create({
  text: /* `$STRING` */,
})
```


### Encoding

Create an instance: `const encoding = client.encoding`

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
const encoding = await client.encoding.create({
  encoded: /* `$STRING` */,
  text: /* `$STRING` */,
})
```


### Generator

Create an instance: `const generator = client.generator`

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
const generator = await client.generator.load({ id: 'generator_id' })
```

#### Example: List

```ts
const generators = await client.generator.list()
```


### GetDocumentation

Create an instance: `const get_documentation = client.get_documentation`

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
const get_documentations = await client.get_documentation.list()
```


### Tool

Create an instance: `const tool = client.tool`

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
const tools = await client.tool.list()
```


### Utility

Create an instance: `const utility = client.utility`

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
const utility = await client.utility.load({ id: 'utility_id' })
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
api-tools/
├── src/
│   ├── ApiToolsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ApiToolsSDK } from '@voxgig-sdk/api-tools'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const cryptography = client.cryptography
await cryptography.load({ id: "example_id" })

// cryptography.data() now returns the loaded cryptography data
// cryptography.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
