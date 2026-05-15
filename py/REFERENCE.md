# ApiTools Python SDK Reference

Complete API reference for the ApiTools Python SDK.


## ApiToolsSDK

### Constructor

```python
from api-tools_sdk import ApiToolsSDK

client = ApiToolsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApiToolsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ApiToolsSDK.test()
```


### Instance Methods

#### `Cryptography(data=None)`

Create a new `CryptographyEntity` instance. Pass `None` for no initial data.

#### `Encoding(data=None)`

Create a new `EncodingEntity` instance. Pass `None` for no initial data.

#### `Generator(data=None)`

Create a new `GeneratorEntity` instance. Pass `None` for no initial data.

#### `GetDocumentation(data=None)`

Create a new `GetDocumentationEntity` instance. Pass `None` for no initial data.

#### `Tool(data=None)`

Create a new `ToolEntity` instance. Pass `None` for no initial data.

#### `Utility(data=None)`

Create a new `UtilityEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## CryptographyEntity

```python
cryptography = client.Cryptography()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | ``$STRING`` | No |  |
| `hash` | ``$STRING`` | No |  |
| `text` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Cryptography().create({
    "text": # `$STRING`,
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CryptographyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EncodingEntity

```python
encoding = client.Encoding()
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

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Encoding().create({
    "encoded": # `$STRING`,
    "text": # `$STRING`,
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EncodingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GeneratorEntity

```python
generator = client.Generator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | ``$STRING`` | No |  |
| `uuid` | ``$STRING`` | No |  |
| `value` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Generator().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Generator().load({"id": "generator_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneratorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetDocumentationEntity

```python
get_documentation = client.GetDocumentation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `endpoint` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.GetDocumentation().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetDocumentationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ToolEntity

```python
tool = client.Tool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Tool().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UtilityEntity

```python
utility = client.Utility()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Utility().load({"id": "utility_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UtilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ApiToolsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

