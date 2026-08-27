# ApiTools TypeScript SDK Reference

Complete API reference for the ApiTools TypeScript SDK.


## ApiToolsSDK

### Constructor

```ts
new ApiToolsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApiToolsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ApiToolsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ApiToolsSDK` instance in test mode.


### Instance Methods

#### `Cryptography(data?: object)`

Create a new `Cryptography` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CryptographyEntity` instance.

#### `Encoding(data?: object)`

Create a new `Encoding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EncodingEntity` instance.

#### `Generator(data?: object)`

Create a new `Generator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GeneratorEntity` instance.

#### `GetDocumentation(data?: object)`

Create a new `GetDocumentation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetDocumentationEntity` instance.

#### `Tool(data?: object)`

Create a new `Tool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ToolEntity` instance.

#### `Utility(data?: object)`

Create a new `Utility` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UtilityEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ApiToolsSDK.test()`.

**Returns:** `ApiToolsSDK` instance in test mode.


---

## CryptographyEntity

```ts
const cryptography = client.Cryptography()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `string` | No | Hashing algorithm |
| `hash` | `string` | No |  |
| `text` | `string` | Yes | Text to hash |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Cryptography().create({
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CryptographyEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EncodingEntity

```ts
const encoding = client.Encoding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decoded` | `string` | No |  |
| `encoded` | `string` | Yes | Base64 encoded text to decode |
| `text` | `string` | Yes | Text to encode |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `decoded` | - |
| `encoded` | Yes |
| `text` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Encoding().create({
  encoded: 'example_encoded',
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EncodingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GeneratorEntity

```ts
const generator = client.Generator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `uuid` | `string` | No |  |
| `uuids` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Generator().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Generator().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GeneratorEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetDocumentationEntity

```ts
const get_documentation = client.GetDocumentation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the API |
| `endpoint` | `string` | No | Endpoint path for the API |
| `name` | `string` | No | Name of the API |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GetDocumentation().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetDocumentationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ToolEntity

```ts
const tool = client.Tool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tool().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UtilityEntity

```ts
const utility = client.Utility()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `country` | `string` | No |  |
| `ip` | `string` | No |  |
| `iso` | `string` | No | ISO 8601 formatted date |
| `isp` | `string` | No |  |
| `milliseconds` | `number` | No | Unix timestamp in milliseconds |
| `timestamp` | `number` | No | Unix timestamp in seconds |
| `utc` | `string` | No | UTC formatted date |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Utility().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UtilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApiToolsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ApiToolsSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

