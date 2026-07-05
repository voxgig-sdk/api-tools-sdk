// Typed models for the ApiTools SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cryptography {
  algorithm?: string
  hash?: string
  text: string
}

export interface CryptographyCreateData {
  algorithm?: string
  hash?: string
  text: string
}

export interface Encoding {
  decoded?: string
  encoded: string
  text: string
}

export interface EncodingCreateData {
  decoded?: string
  encoded: string
  text: string
}

export interface Generator {
  type?: string
  uuid?: string
  value?: any
}

export interface GeneratorLoadMatch {
  type?: string
  uuid?: string
  value?: any
}

export interface GeneratorListMatch {
  type?: string
  uuid?: string
  value?: any
}

export interface GetDocumentation {
  description?: string
  endpoint?: string
  name?: string
}

export interface GetDocumentationListMatch {
  description?: string
  endpoint?: string
  name?: string
}

export interface Tool {
  category?: string
  description?: string
  id?: string
  name?: string
}

export interface ToolListMatch {
  category?: string
  description?: string
  id?: string
  name?: string
}

export interface Utility {
  city?: string
  country?: string
  ip?: string
  iso?: string
  isp?: string
  millisecond?: number
  timestamp?: number
  utc?: string
}

export interface UtilityLoadMatch {
  city?: string
  country?: string
  ip?: string
  iso?: string
  isp?: string
  millisecond?: number
  timestamp?: number
  utc?: string
}

