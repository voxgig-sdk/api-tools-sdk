# Typed models for the ApiTools SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CryptographyRequired(TypedDict):
    text: str


class Cryptography(CryptographyRequired, total=False):
    algorithm: str
    hash: str


class CryptographyCreateData(TypedDict, total=False):
    algorithm: str
    hash: str
    text: str


class EncodingRequired(TypedDict):
    encoded: str
    text: str


class Encoding(EncodingRequired, total=False):
    decoded: str


class EncodingCreateData(TypedDict, total=False):
    decoded: str
    encoded: str
    text: str


class Generator(TypedDict, total=False):
    type: str
    uuid: str
    value: Any


class GeneratorLoadMatch(TypedDict, total=False):
    type: str
    uuid: str
    value: Any


class GeneratorListMatch(TypedDict, total=False):
    type: str
    uuid: str
    value: Any


class GetDocumentation(TypedDict, total=False):
    description: str
    endpoint: str
    name: str


class GetDocumentationListMatch(TypedDict, total=False):
    description: str
    endpoint: str
    name: str


class Tool(TypedDict, total=False):
    category: str
    description: str
    id: str
    name: str


class ToolListMatch(TypedDict, total=False):
    category: str
    description: str
    id: str
    name: str


class Utility(TypedDict, total=False):
    city: str
    country: str
    ip: str
    iso: str
    isp: str
    millisecond: int
    timestamp: int
    utc: str


class UtilityLoadMatch(TypedDict, total=False):
    city: str
    country: str
    ip: str
    iso: str
    isp: str
    millisecond: int
    timestamp: int
    utc: str
