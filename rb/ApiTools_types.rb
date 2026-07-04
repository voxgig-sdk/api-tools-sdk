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

# Match filter for Cryptography#create (any subset of Cryptography fields).
#
# @!attribute [rw] algorithm
#   @return [String, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
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
Encoding = Struct.new(
  :decoded,
  :encoded,
  :text,
  keyword_init: true
)

# Match filter for Encoding#create (any subset of Encoding fields).
#
# @!attribute [rw] decoded
#   @return [String, nil]
#
# @!attribute [rw] encoded
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
EncodingCreateData = Struct.new(
  :decoded,
  :encoded,
  :text,
  keyword_init: true
)

# Generator entity data model.
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
Generator = Struct.new(
  :type,
  :uuid,
  :value,
  keyword_init: true
)

# Match filter for Generator#load (any subset of Generator fields).
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
GeneratorLoadMatch = Struct.new(
  :type,
  :uuid,
  :value,
  keyword_init: true
)

# Match filter for Generator#list (any subset of Generator fields).
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] uuid
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Object, nil]
GeneratorListMatch = Struct.new(
  :type,
  :uuid,
  :value,
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

# Match filter for GetDocumentation#list (any subset of GetDocumentation fields).
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

# Match filter for Tool#list (any subset of Tool fields).
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
# @!attribute [rw] millisecond
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
  :millisecond,
  :timestamp,
  :utc,
  keyword_init: true
)

# Match filter for Utility#load (any subset of Utility fields).
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
# @!attribute [rw] millisecond
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
  :millisecond,
  :timestamp,
  :utc,
  keyword_init: true
)

