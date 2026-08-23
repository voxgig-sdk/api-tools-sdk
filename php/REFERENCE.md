# ApiTools PHP SDK Reference

Complete API reference for the ApiTools PHP SDK.


## ApiToolsSDK

### Constructor

```php
require_once __DIR__ . '/apitools_sdk.php';

$client = new ApiToolsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApiToolsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ApiToolsSDK::test();
```


### Instance Methods

#### `Cryptography($data = null)`

Create a new `CryptographyEntity` instance. Pass `null` for no initial data.

#### `Encoding($data = null)`

Create a new `EncodingEntity` instance. Pass `null` for no initial data.

#### `Generator($data = null)`

Create a new `GeneratorEntity` instance. Pass `null` for no initial data.

#### `GetDocumentation($data = null)`

Create a new `GetDocumentationEntity` instance. Pass `null` for no initial data.

#### `Tool($data = null)`

Create a new `ToolEntity` instance. Pass `null` for no initial data.

#### `Utility($data = null)`

Create a new `UtilityEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ApiToolsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CryptographyEntity

```php
$cryptography = $client->Cryptography();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `string` | No | Hashing algorithm |
| `hash` | `string` | No |  |
| `text` | `string` | Yes | Text to hash |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Cryptography()->create([
  "text" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CryptographyEntity`

Create a new `CryptographyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EncodingEntity

```php
$encoding = $client->Encoding();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Encoding()->create([
  "encoded" => null, // string
  "text" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EncodingEntity`

Create a new `EncodingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GeneratorEntity

```php
$generator = $client->Generator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `uuid` | `string` | No |  |
| `uuids` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Generator()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Generator()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GeneratorEntity`

Create a new `GeneratorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetDocumentationEntity

```php
$get_documentation = $client->GetDocumentation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the API |
| `endpoint` | `string` | No | Endpoint path for the API |
| `name` | `string` | No | Name of the API |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GetDocumentation()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetDocumentationEntity`

Create a new `GetDocumentationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ToolEntity

```php
$tool = $client->Tool();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Tool()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ToolEntity`

Create a new `ToolEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UtilityEntity

```php
$utility = $client->Utility();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `country` | `string` | No |  |
| `ip` | `string` | No |  |
| `iso` | `string` | No | ISO 8601 formatted date |
| `isp` | `string` | No |  |
| `milliseconds` | `int` | No | Unix timestamp in milliseconds |
| `timestamp` | `int` | No | Unix timestamp in seconds |
| `utc` | `string` | No | UTC formatted date |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Utility()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UtilityEntity`

Create a new `UtilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ApiToolsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

