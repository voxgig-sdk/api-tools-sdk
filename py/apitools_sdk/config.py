# ApiTools SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ApiTools",
            "slug": "api-tools",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.apitools.workers.dev",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "cryptography": {},
                "encoding": {},
                "generator": {},
                "get_documentation": {},
                "tool": {},
                "utility": {},
            },
        },
        "entity": {
      "cryptography": {
        "fields": [
          {
            "name": "algorithm",
            "short": "Hashing algorithm",
            "type": "`$STRING`",
          },
          {
            "name": "hash",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "req": True,
            "short": "Text to hash",
            "type": "`$STRING`",
          },
        ],
        "name": "cryptography",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/hash",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "hash",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "hash",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "encoding": {
        "fields": [
          {
            "name": "decoded",
            "type": "`$STRING`",
          },
          {
            "name": "encoded",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "Base64 encoded text to decode",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "req": True,
            "short": "Text to encode",
            "type": "`$STRING`",
          },
        ],
        "name": "encoding",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/base64/decode",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "base64",
                  },
                  {
                    "lit": "decode",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "base64",
                  "decode",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/base64/encode",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "base64",
                  },
                  {
                    "lit": "encode",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "base64",
                  "encode",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/url/decode",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "url",
                  },
                  {
                    "lit": "decode",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "url",
                  "decode",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/url/encode",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "url",
                  },
                  {
                    "lit": "encode",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "url",
                  "encode",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "generator": {
        "fields": [
          {
            "name": "uuid",
            "type": "`$STRING`",
          },
          {
            "name": "uuids",
            "type": "`$ARRAY`",
          },
        ],
        "name": "generator",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 16,
                      "kind": "query",
                      "name": "length",
                      "orig": "length",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "max",
                      "orig": "max",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "min",
                      "orig": "min",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "number",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/random",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "select": {
                  "exist": [
                    "length",
                    "max",
                    "min",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.value`",
                },
                "parts": [
                  "api",
                  "random",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 200,
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/qrcode",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "qrcode",
                  },
                ],
                "select": {
                  "exist": [
                    "size",
                    "text",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "qrcode",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_documentation": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the API",
            "type": "`$STRING`",
          },
          {
            "name": "endpoint",
            "short": "Endpoint path for the API",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Name of the API",
            "type": "`$STRING`",
          },
        ],
        "name": "get_documentation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "segments": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.apis`",
                },
                "parts": [],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "tool": {
        "fields": [
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "tool",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/tools",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "tools",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tools`",
                },
                "parts": [
                  "api",
                  "tools",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "utility": {
        "fields": [
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "type": "`$STRING`",
          },
          {
            "name": "iso",
            "short": "ISO 8601 formatted date",
            "type": "`$STRING`",
          },
          {
            "name": "isp",
            "type": "`$STRING`",
          },
          {
            "name": "milliseconds",
            "short": "Unix timestamp in milliseconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "timestamp",
            "short": "Unix timestamp in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "utc",
            "short": "UTC formatted date",
            "type": "`$STRING`",
          },
        ],
        "name": "utility",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/ip",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ip",
                  },
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "ip",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/timestamp",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "timestamp",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "timestamp",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
