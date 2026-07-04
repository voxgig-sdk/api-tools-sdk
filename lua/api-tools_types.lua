-- Typed models for the ApiTools SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cryptography
---@field algorithm? string
---@field hash? string
---@field text string

---@class CryptographyCreateData

---@class Encoding
---@field decoded? string
---@field encoded string
---@field text string

---@class EncodingCreateData

---@class Generator
---@field type? string
---@field uuid? string
---@field value? any

---@class GeneratorLoadMatch

---@class GeneratorListMatch

---@class GetDocumentation
---@field description? string
---@field endpoint? string
---@field name? string

---@class GetDocumentationListMatch

---@class Tool
---@field category? string
---@field description? string
---@field id? string
---@field name? string

---@class ToolListMatch

---@class Utility
---@field city? string
---@field country? string
---@field ip? string
---@field iso? string
---@field isp? string
---@field millisecond? number
---@field timestamp? number
---@field utc? string

---@class UtilityLoadMatch

local M = {}

return M
