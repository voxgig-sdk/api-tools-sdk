package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ApiTools",
			"slug": "api-tools",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.apitools.workers.dev",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cryptography": map[string]any{},
				"encoding": map[string]any{},
				"generator": map[string]any{},
				"get_documentation": map[string]any{},
				"tool": map[string]any{},
				"utility": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cryptography": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "algorithm",
						"short": "Hashing algorithm",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hash",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"req": true,
						"short": "Text to hash",
						"type": "`$STRING`",
					},
				},
				"name": "cryptography",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/hash",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "hash",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"hash",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"encoding": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "decoded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "encoded",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "Base64 encoded text to decode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"req": true,
						"short": "Text to encode",
						"type": "`$STRING`",
					},
				},
				"name": "encoding",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/base64/decode",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "base64",
									},
									map[string]any{
										"lit": "decode",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"base64",
									"decode",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/base64/encode",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "base64",
									},
									map[string]any{
										"lit": "encode",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"base64",
									"encode",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/url/decode",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "url",
									},
									map[string]any{
										"lit": "decode",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"url",
									"decode",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/url/encode",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "url",
									},
									map[string]any{
										"lit": "encode",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"url",
									"encode",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"generator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "uuid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uuids",
						"type": "`$ARRAY`",
					},
				},
				"name": "generator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 16,
											"kind": "query",
											"name": "length",
											"orig": "length",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "max",
											"orig": "max",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "min",
											"orig": "min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "number",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/random",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"length",
										"max",
										"min",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.value`",
								},
								"parts": []any{
									"api",
									"random",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 200,
											"kind": "query",
											"name": "size",
											"orig": "size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "text",
											"orig": "text",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/qrcode",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "qrcode",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"size",
										"text",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"qrcode",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_documentation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "endpoint",
						"short": "Endpoint path for the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the API",
						"type": "`$STRING`",
					},
				},
				"name": "get_documentation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.apis`",
								},
								"parts": []any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tool": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "tool",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/tools",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "tools",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tools`",
								},
								"parts": []any{
									"api",
									"tools",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"utility": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iso",
						"short": "ISO 8601 formatted date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "milliseconds",
						"short": "Unix timestamp in milliseconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "Unix timestamp in seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "utc",
						"short": "UTC formatted date",
						"type": "`$STRING`",
					},
				},
				"name": "utility",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ip",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ip",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"ip",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/timestamp",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "timestamp",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"timestamp",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
