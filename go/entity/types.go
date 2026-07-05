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

// CryptographyCreateData is the typed request payload for Cryptography.CreateTyped.
type CryptographyCreateData struct {
	Algorithm *string `json:"algorithm,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Text string `json:"text"`
}

// Encoding is the typed data model for the encoding entity.
type Encoding struct {
	Decoded *string `json:"decoded,omitempty"`
	Encoded string `json:"encoded"`
	Text string `json:"text"`
}

// EncodingCreateData is the typed request payload for Encoding.CreateTyped.
type EncodingCreateData struct {
	Decoded *string `json:"decoded,omitempty"`
	Encoded string `json:"encoded"`
	Text string `json:"text"`
}

// Generator is the typed data model for the generator entity.
type Generator struct {
	Type *string `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Value *any `json:"value,omitempty"`
}

// GeneratorLoadMatch is the typed request payload for Generator.LoadTyped.
type GeneratorLoadMatch struct {
	Type *string `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Value *any `json:"value,omitempty"`
}

// GeneratorListMatch is the typed request payload for Generator.ListTyped.
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

// GetDocumentationListMatch is the typed request payload for GetDocumentation.ListTyped.
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

// ToolListMatch is the typed request payload for Tool.ListTyped.
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

// UtilityLoadMatch is the typed request payload for Utility.LoadTyped.
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
