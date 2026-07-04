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

export type CryptographyCreateData = Partial<Cryptography>

export interface Encoding {
  decoded?: string
  encoded: string
  text: string
}

export type EncodingCreateData = Partial<Encoding>

export interface Generator {
  type?: string
  uuid?: string
  value?: any
}

export type GeneratorLoadMatch = Partial<Generator>

export type GeneratorListMatch = Partial<Generator>

export interface GetDocumentation {
  description?: string
  endpoint?: string
  name?: string
}

export type GetDocumentationListMatch = Partial<GetDocumentation>

export interface Tool {
  category?: string
  description?: string
  id?: string
  name?: string
}

export type ToolListMatch = Partial<Tool>

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

export type UtilityLoadMatch = Partial<Utility>

