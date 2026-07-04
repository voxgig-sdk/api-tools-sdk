// Typed models for the ApiTools SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Cryptography is the typed data model for the cryptography entity.
type Cryptography struct {
	Algorithm *string `json:"algorithm,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Text string `json:"text"`
}

// CryptographyCreateData mirrors the cryptography fields as an all-optional match
// filter (Go analog of Partial<Cryptography>).
type CryptographyCreateData struct {
	Algorithm *string `json:"algorithm,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Text *string `json:"text,omitempty"`
}

// Encoding is the typed data model for the encoding entity.
type Encoding struct {
	Decoded *string `json:"decoded,omitempty"`
	Encoded string `json:"encoded"`
	Text string `json:"text"`
}

// EncodingCreateData mirrors the encoding fields as an all-optional match
// filter (Go analog of Partial<Encoding>).
type EncodingCreateData struct {
	Decoded *string `json:"decoded,omitempty"`
	Encoded *string `json:"encoded,omitempty"`
	Text *string `json:"text,omitempty"`
}

// Generator is the typed data model for the generator entity.
type Generator struct {
	Type *string `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Value *any `json:"value,omitempty"`
}

// GeneratorLoadMatch mirrors the generator fields as an all-optional match
// filter (Go analog of Partial<Generator>).
type GeneratorLoadMatch struct {
	Type *string `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Value *any `json:"value,omitempty"`
}

// GeneratorListMatch mirrors the generator fields as an all-optional match
// filter (Go analog of Partial<Generator>).
type GeneratorListMatch struct {
	Type *string `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Value *any `json:"value,omitempty"`
}

// GetDocumentation is the typed data model for the get_documentation entity.
type GetDocumentation struct {
	Description *string `json:"description,omitempty"`
	Endpoint *string `json:"endpoint,omitempty"`
	Name *string `json:"name,omitempty"`
}

// GetDocumentationListMatch mirrors the get_documentation fields as an all-optional match
// filter (Go analog of Partial<GetDocumentation>).
type GetDocumentationListMatch struct {
	Description *string `json:"description,omitempty"`
	Endpoint *string `json:"endpoint,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Tool is the typed data model for the tool entity.
type Tool struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// ToolListMatch mirrors the tool fields as an all-optional match
// filter (Go analog of Partial<Tool>).
type ToolListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Utility is the typed data model for the utility entity.
type Utility struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Iso *string `json:"iso,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Millisecond *int `json:"millisecond,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Utc *string `json:"utc,omitempty"`
}

// UtilityLoadMatch mirrors the utility fields as an all-optional match
// filter (Go analog of Partial<Utility>).
type UtilityLoadMatch struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Iso *string `json:"iso,omitempty"`
	Isp *string `json:"isp,omitempty"`
	Millisecond *int `json:"millisecond,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Utc *string `json:"utc,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
