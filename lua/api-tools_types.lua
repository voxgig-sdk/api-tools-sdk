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
---@field algorithm? string
---@field hash? string
---@field text string

---@class Encoding
---@field decoded? string
---@field encoded string
---@field text string

---@class EncodingCreateData
---@field decoded? string
---@field encoded string
---@field text string

---@class Generator
---@field uuid? string
---@field uuids? table

---@class GeneratorLoadMatch
---@field uuid? string
---@field uuids? table

---@class GeneratorListMatch
---@field uuid? string
---@field uuids? table

---@class GetDocumentation
---@field description? string
---@field endpoint? string
---@field name? string

---@class GetDocumentationListMatch
---@field description? string
---@field endpoint? string
---@field name? string

---@class Tool
---@field category? string
---@field description? string
---@field id? string
---@field name? string

---@class ToolListMatch
---@field category? string
---@field description? string
---@field id? string
---@field name? string

---@class Utility
---@field city? string
---@field country? string
---@field ip? string
---@field iso? string
---@field isp? string
---@field milliseconds? number
---@field timestamp? number
---@field utc? string

---@class UtilityLoadMatch
---@field city? string
---@field country? string
---@field ip? string
---@field iso? string
---@field isp? string
---@field milliseconds? number
---@field timestamp? number
---@field utc? string

local M = {}

return M
