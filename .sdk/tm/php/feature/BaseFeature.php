<?php
declare(strict_types=1);

// ApiTools SDK base feature

class ApiToolsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ApiToolsContext $ctx, array $options): void {}
    public function PostConstruct(ApiToolsContext $ctx): void {}
    public function PostConstructEntity(ApiToolsContext $ctx): void {}
    public function SetData(ApiToolsContext $ctx): void {}
    public function GetData(ApiToolsContext $ctx): void {}
    public function GetMatch(ApiToolsContext $ctx): void {}
    public function SetMatch(ApiToolsContext $ctx): void {}
    public function PrePoint(ApiToolsContext $ctx): void {}
    public function PreSpec(ApiToolsContext $ctx): void {}
    public function PreRequest(ApiToolsContext $ctx): void {}
    public function PreResponse(ApiToolsContext $ctx): void {}
    public function PreResult(ApiToolsContext $ctx): void {}
    public function PreDone(ApiToolsContext $ctx): void {}
    public function PreUnexpected(ApiToolsContext $ctx): void {}
}
