# ApiTools Lua SDK Reference

Complete API reference for the ApiTools Lua SDK.


## ApiToolsSDK

### Constructor

```lua
local sdk = require("api-tools_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `Cryptography(data)`

Create a new `Cryptography` entity instance. Pass `nil` for no initial data.

#### `Encoding(data)`

Create a new `Encoding` entity instance. Pass `nil` for no initial data.

#### `Generator(data)`

Create a new `Generator` entity instance. Pass `nil` for no initial data.

#### `GetDocumentation(data)`

Create a new `GetDocumentation` entity instance. Pass `nil` for no initial data.

#### `Tool(data)`

Create a new `Tool` entity instance. Pass `nil` for no initial data.

#### `Utility(data)`

Create a new `Utility` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CryptographyEntity

```lua
local cryptography = client:Cryptography(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | ``$STRING`` | No |  |
| `hash` | ``$STRING`` | No |  |
| `text` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Cryptography(nil):create({
  text = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CryptographyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EncodingEntity

```lua
local encoding = client:Encoding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decoded` | ``$STRING`` | No |  |
| `encoded` | ``$STRING`` | Yes |  |
| `text` | ``$STRING`` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `decoded` | - | - | - | - | - |
| `encoded` | - | - | Yes | - | - |
| `text` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Encoding(nil):create({
  encoded = --[[ `$STRING` ]],
  text = --[[ `$STRING` ]],
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EncodingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GeneratorEntity

```lua
local generator = client:Generator(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | ``$STRING`` | No |  |
| `uuid` | ``$STRING`` | No |  |
| `value` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Generator(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Generator(nil):load({ id = "generator_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneratorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GetDocumentationEntity

```lua
local get_documentation = client:GetDocumentation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `endpoint` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GetDocumentation(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetDocumentationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ToolEntity

```lua
local tool = client:Tool(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Tool(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UtilityEntity

```lua
local utility = client:Utility(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `ip` | ``$STRING`` | No |  |
| `iso` | ``$STRING`` | No |  |
| `isp` | ``$STRING`` | No |  |
| `millisecond` | ``$INTEGER`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `utc` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Utility(nil):load({ id = "utility_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UtilityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

