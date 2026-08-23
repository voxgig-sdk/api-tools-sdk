# ApiTools Python SDK Reference

Complete API reference for the ApiTools Python SDK.


## ApiToolsSDK

### Constructor

```python
from apitools_sdk import ApiToolsSDK

client = ApiToolsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
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

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CryptographyEntity

```python
cryptography = client.Cryptography()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `str` | No | Hashing algorithm |
| `hash` | `str` | No |  |
| `text` | `str` | Yes | Text to hash |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Cryptography().create({
    "text": "example_text",  # str
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
| `decoded` | `str` | No |  |
| `encoded` | `str` | Yes | Base64 encoded text to decode |
| `text` | `str` | Yes | Text to encode |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `decoded` | - |
| `encoded` | Yes |
| `text` | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Encoding().create({
    "encoded": "example_encoded",  # str
    "text": "example_text",  # str
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
| `uuid` | `str` | No |  |
| `uuids` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Generator().list()
for generator in results:
    print(generator)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Generator().load()
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
| `description` | `str` | No | Description of the API |
| `endpoint` | `str` | No | Endpoint path for the API |
| `name` | `str` | No | Name of the API |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GetDocumentation().list()
for get_documentation in results:
    print(get_documentation)
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
| `category` | `str` | No |  |
| `description` | `str` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tool().list()
for tool in results:
    print(tool)
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
| `city` | `str` | No |  |
| `country` | `str` | No |  |
| `ip` | `str` | No |  |
| `iso` | `str` | No | ISO 8601 formatted date |
| `isp` | `str` | No |  |
| `milliseconds` | `int` | No | Unix timestamp in milliseconds |
| `timestamp` | `int` | No | Unix timestamp in seconds |
| `utc` | `str` | No | UTC formatted date |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Utility().load()
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

