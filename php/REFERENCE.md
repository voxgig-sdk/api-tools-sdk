# ApiTools PHP SDK Reference

Complete API reference for the ApiTools PHP SDK.


## ApiToolsSDK

### Constructor

```php
require_once __DIR__ . '/api-tools_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$cryptography = $client->cryptography();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | ``$STRING`` | No |  |
| `hash` | ``$STRING`` | No |  |
| `text` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->cryptography()->create([
  "text" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CryptographyEntity`

Create a new `CryptographyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EncodingEntity

```php
$encoding = $client->encoding();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->encoding()->create([
  "encoded" => /* `$STRING` */,
  "text" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EncodingEntity`

Create a new `EncodingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GeneratorEntity

```php
$generator = $client->generator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | ``$STRING`` | No |  |
| `uuid` | ``$STRING`` | No |  |
| `value` | ``$ANY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->generator()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->generator()->load(["id" => "generator_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GeneratorEntity`

Create a new `GeneratorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetDocumentationEntity

```php
$get_documentation = $client->get_documentation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `endpoint` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->get_documentation()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetDocumentationEntity`

Create a new `GetDocumentationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ToolEntity

```php
$tool = $client->tool();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->tool()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ToolEntity`

Create a new `ToolEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UtilityEntity

```php
$utility = $client->utility();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->utility()->load(["id" => "utility_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UtilityEntity`

Create a new `UtilityEntity` instance with the same client and
options.

#### `getName(): string`

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

