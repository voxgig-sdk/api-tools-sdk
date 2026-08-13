<?php
declare(strict_types=1);

// Typed models for the ApiTools SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cryptography entity data model. */
class Cryptography
{
    public ?string $algorithm = null;
    public ?string $hash = null;
    public string $text;
}

/** Request payload for Cryptography#create. */
class CryptographyCreateData
{
    public ?string $algorithm = null;
    public ?string $hash = null;
    public string $text;
}

/** Encoding entity data model. */
class Encoding
{
    public ?string $decoded = null;
    public string $encoded;
    public string $text;
}

/** Request payload for Encoding#create. */
class EncodingCreateData
{
    public ?string $decoded = null;
    public string $encoded;
    public string $text;
}

/** Generator entity data model. */
class Generator
{
    public ?string $uuid = null;
    public ?array $uuids = null;
}

/** Request payload for Generator#load. */
class GeneratorLoadMatch
{
    public ?string $uuid = null;
    public ?array $uuids = null;
}

/** Request payload for Generator#list. */
class GeneratorListMatch
{
    public ?string $uuid = null;
    public ?array $uuids = null;
}

/** GetDocumentation entity data model. */
class GetDocumentation
{
    public ?string $description = null;
    public ?string $endpoint = null;
    public ?string $name = null;
}

/** Request payload for GetDocumentation#list. */
class GetDocumentationListMatch
{
    public ?string $description = null;
    public ?string $endpoint = null;
    public ?string $name = null;
}

/** Tool entity data model. */
class Tool
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
}

/** Request payload for Tool#list. */
class ToolListMatch
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
}

/** Utility entity data model. */
class Utility
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $ip = null;
    public ?string $iso = null;
    public ?string $isp = null;
    public ?int $milliseconds = null;
    public ?int $timestamp = null;
    public ?string $utc = null;
}

/** Request payload for Utility#load. */
class UtilityLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $ip = null;
    public ?string $iso = null;
    public ?string $isp = null;
    public ?int $milliseconds = null;
    public ?int $timestamp = null;
    public ?string $utc = null;
}

