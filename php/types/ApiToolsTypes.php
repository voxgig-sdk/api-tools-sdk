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

/** Match filter for Cryptography#create (any subset of Cryptography fields). */
class CryptographyCreateData
{
    public ?string $algorithm = null;
    public ?string $hash = null;
    public ?string $text = null;
}

/** Encoding entity data model. */
class Encoding
{
    public ?string $decoded = null;
    public string $encoded;
    public string $text;
}

/** Match filter for Encoding#create (any subset of Encoding fields). */
class EncodingCreateData
{
    public ?string $decoded = null;
    public ?string $encoded = null;
    public ?string $text = null;
}

/** Generator entity data model. */
class Generator
{
    public ?string $type = null;
    public ?string $uuid = null;
    public mixed $value = null;
}

/** Match filter for Generator#load (any subset of Generator fields). */
class GeneratorLoadMatch
{
    public ?string $type = null;
    public ?string $uuid = null;
    public mixed $value = null;
}

/** Match filter for Generator#list (any subset of Generator fields). */
class GeneratorListMatch
{
    public ?string $type = null;
    public ?string $uuid = null;
    public mixed $value = null;
}

/** GetDocumentation entity data model. */
class GetDocumentation
{
    public ?string $description = null;
    public ?string $endpoint = null;
    public ?string $name = null;
}

/** Match filter for GetDocumentation#list (any subset of GetDocumentation fields). */
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

/** Match filter for Tool#list (any subset of Tool fields). */
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
    public ?int $millisecond = null;
    public ?int $timestamp = null;
    public ?string $utc = null;
}

/** Match filter for Utility#load (any subset of Utility fields). */
class UtilityLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $ip = null;
    public ?string $iso = null;
    public ?string $isp = null;
    public ?int $millisecond = null;
    public ?int $timestamp = null;
    public ?string $utc = null;
}

