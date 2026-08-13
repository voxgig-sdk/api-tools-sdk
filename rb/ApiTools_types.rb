# frozen_string_literal: true

# Typed models for the ApiTools SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cryptography entity data model.
#
# @!attribute [rw] algorithm
#   @return [String, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
Cryptography = Struct.new(
  :algorithm,
  :hash,
  :text,
  keyword_init: true
)

# Request payload for Cryptography#create.
#
# @!attribute [rw] algorithm
#   @return [String, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
CryptographyCreateData = Struct.new(
  :algorithm,
  :hash,
  :text,
  keyword_init: true
)

# Encoding entity data model.
#
# @!attribute [rw] decoded
#   @return [String, nil]
#
# @!attribute [rw] encoded
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
EncodingType = Struct.new(
  :decoded,
  :encoded,
  :text,
  keyword_init: true
)

# Request payload for Encoding#create.
#
# @!attribute [rw] decoded
#   @return [String, nil]
#
# @!attribute [rw] encoded
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
EncodingCreateData = Struct.new(
  :decoded,
  :encoded,
  :text,
  keyword_init: true
)

# Generator entity data model.
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
Generator = Struct.new(
  :uuid,
  :uuids,
  keyword_init: true
)

# Request payload for Generator#load.
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
GeneratorLoadMatch = Struct.new(
  :uuid,
  :uuids,
  keyword_init: true
)

# Request payload for Generator#list.
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
GeneratorListMatch = Struct.new(
  :uuid,
  :uuids,
  keyword_init: true
)

# GetDocumentation entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endpoint
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GetDocumentation = Struct.new(
  :description,
  :endpoint,
  :name,
  keyword_init: true
)

# Request payload for GetDocumentation#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endpoint
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GetDocumentationListMatch = Struct.new(
  :description,
  :endpoint,
  :name,
  keyword_init: true
)

# Tool entity data model.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Tool = Struct.new(
  :category,
  :description,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Tool#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
ToolListMatch = Struct.new(
  :category,
  :description,
  :id,
  :name,
  keyword_init: true
)

# Utility entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] iso
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] milliseconds
#   @return [Integer, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] utc
#   @return [String, nil]
Utility = Struct.new(
  :city,
  :country,
  :ip,
  :iso,
  :isp,
  :milliseconds,
  :timestamp,
  :utc,
  keyword_init: true
)

# Request payload for Utility#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] iso
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] milliseconds
#   @return [Integer, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] utc
#   @return [String, nil]
UtilityLoadMatch = Struct.new(
  :city,
  :country,
  :ip,
  :iso,
  :isp,
  :milliseconds,
  :timestamp,
  :utc,
  keyword_init: true
)

