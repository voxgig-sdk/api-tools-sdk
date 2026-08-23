
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ApiTools',
        slug: "api-tools",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.apitools.workers.dev",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      cryptography: {
      },

      encoding: {
      },

      generator: {
      },

      get_documentation: {
      },

      tool: {
      },

      utility: {
      },

    }
  }


  entity = {
    "cryptography": {
      "fields": [
        {
          "name": "algorithm",
          "short": "Hashing algorithm",
          "type": "`$STRING`"
        },
        {
          "name": "hash",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "req": true,
          "short": "Text to hash",
          "type": "`$STRING`"
        }
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
              "parts": [
                "api",
                "hash"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "encoding": {
      "fields": [
        {
          "name": "decoded",
          "type": "`$STRING`"
        },
        {
          "name": "encoded",
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "req": true,
          "short": "Base64 encoded text to decode",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "req": true,
          "short": "Text to encode",
          "type": "`$STRING`"
        }
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
              "parts": [
                "api",
                "base64",
                "decode"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/base64/encode",
              "parts": [
                "api",
                "base64",
                "encode"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/url/decode",
              "parts": [
                "api",
                "url",
                "decode"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/url/encode",
              "parts": [
                "api",
                "url",
                "encode"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "generator": {
      "fields": [
        {
          "name": "uuid",
          "type": "`$STRING`"
        },
        {
          "name": "uuids",
          "type": "`$ARRAY`"
        }
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
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid",
              "parts": [
                "api",
                "uuid"
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              }
            }
          ]
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "max",
                    "orig": "max",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "min",
                    "orig": "min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "number",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/random",
              "parts": [
                "api",
                "random"
              ],
              "select": {
                "exist": [
                  "length",
                  "max",
                  "min",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.value`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 200,
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "text",
                    "orig": "text",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/qrcode",
              "parts": [
                "api",
                "qrcode"
              ],
              "select": {
                "exist": [
                  "size",
                  "text"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_documentation": {
      "fields": [
        {
          "name": "description",
          "short": "Description of the API",
          "type": "`$STRING`"
        },
        {
          "name": "endpoint",
          "short": "Endpoint path for the API",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the API",
          "type": "`$STRING`"
        }
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
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.apis`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "tool": {
      "fields": [
        {
          "name": "category",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "api",
                "tools"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.tools`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "utility": {
      "fields": [
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "type": "`$STRING`"
        },
        {
          "name": "iso",
          "short": "ISO 8601 formatted date",
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "type": "`$STRING`"
        },
        {
          "name": "milliseconds",
          "short": "Unix timestamp in milliseconds",
          "type": "`$INTEGER`"
        },
        {
          "name": "timestamp",
          "short": "Unix timestamp in seconds",
          "type": "`$INTEGER`"
        },
        {
          "name": "utc",
          "short": "UTC formatted date",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/ip",
              "parts": [
                "api",
                "ip"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/timestamp",
              "parts": [
                "api",
                "timestamp"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

