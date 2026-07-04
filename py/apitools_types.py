# Typed models for the ApiTools SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Cryptography:
    text: str
    algorithm: Optional[str] = None
    hash: Optional[str] = None


@dataclass
class CryptographyCreateData:
    algorithm: Optional[str] = None
    hash: Optional[str] = None
    text: Optional[str] = None


@dataclass
class Encoding:
    encoded: str
    text: str
    decoded: Optional[str] = None


@dataclass
class EncodingCreateData:
    decoded: Optional[str] = None
    encoded: Optional[str] = None
    text: Optional[str] = None


@dataclass
class Generator:
    type: Optional[str] = None
    uuid: Optional[str] = None
    value: Optional[Any] = None


@dataclass
class GeneratorLoadMatch:
    type: Optional[str] = None
    uuid: Optional[str] = None
    value: Optional[Any] = None


@dataclass
class GeneratorListMatch:
    type: Optional[str] = None
    uuid: Optional[str] = None
    value: Optional[Any] = None


@dataclass
class GetDocumentation:
    description: Optional[str] = None
    endpoint: Optional[str] = None
    name: Optional[str] = None


@dataclass
class GetDocumentationListMatch:
    description: Optional[str] = None
    endpoint: Optional[str] = None
    name: Optional[str] = None


@dataclass
class Tool:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None


@dataclass
class ToolListMatch:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None


@dataclass
class Utility:
    city: Optional[str] = None
    country: Optional[str] = None
    ip: Optional[str] = None
    iso: Optional[str] = None
    isp: Optional[str] = None
    millisecond: Optional[int] = None
    timestamp: Optional[int] = None
    utc: Optional[str] = None


@dataclass
class UtilityLoadMatch:
    city: Optional[str] = None
    country: Optional[str] = None
    ip: Optional[str] = None
    iso: Optional[str] = None
    isp: Optional[str] = None
    millisecond: Optional[int] = None
    timestamp: Optional[int] = None
    utc: Optional[str] = None

