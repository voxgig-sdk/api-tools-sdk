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
  uuid?: string
  uuids?: any[]
}

export interface GeneratorLoadMatch {
  uuid?: string
  uuids?: any[]
}

export interface GeneratorListMatch {
  uuid?: string
  uuids?: any[]
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
  milliseconds?: number
  timestamp?: number
  utc?: string
}

export interface UtilityLoadMatch {
  city?: string
  country?: string
  ip?: string
  iso?: string
  isp?: string
  milliseconds?: number
  timestamp?: number
  utc?: string
}

