
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.apitools.workers.dev',

    auth: {
      prefix: 'Bearer',
    },

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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "hash",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "text",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "cryptography",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "method": "POST",
              "orig": "/api/hash",
              "parts": [
                "api",
                "hash"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "encoded",
          "op": {
            "create": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "text",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "encoding",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "method": "POST",
              "orig": "/api/base64/decode",
              "parts": [
                "api",
                "base64",
                "decode"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            },
            {
              "method": "POST",
              "orig": "/api/base64/encode",
              "parts": [
                "api",
                "base64",
                "encode"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 1
            },
            {
              "method": "POST",
              "orig": "/api/url/decode",
              "parts": [
                "api",
                "url",
                "decode"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 2
            },
            {
              "method": "POST",
              "orig": "/api/url/encode",
              "parts": [
                "api",
                "url",
                "encode"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 3
            }
          ],
          "input": "data",
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "generator": {
      "fields": [
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "uuid",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "value",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "generator",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "max",
                    "orig": "max",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "min",
                    "orig": "min",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "number",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": 200,
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "text",
                    "orig": "text",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "endpoint",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "get_documentation",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/",
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "parts": [],
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "tool",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/api/tools",
              "parts": [
                "api",
                "tools"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "country",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "ip",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "iso",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "isp",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "millisecond",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "timestamp",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "utc",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "utility",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 0
            },
            {
              "method": "GET",
              "orig": "/api/timestamp",
              "parts": [
                "api",
                "timestamp"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
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

