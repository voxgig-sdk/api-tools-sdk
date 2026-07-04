<?php
declare(strict_types=1);

// ApiTools SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class ApiToolsSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ApiToolsUtility();
        $this->_utility = $utility;

        $config = ApiToolsConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = ApiToolsHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = ApiToolsHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, ApiToolsFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return ApiToolsUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ApiToolsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = ApiToolsHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ApiToolsHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ApiToolsSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ApiToolsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ApiToolsHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_cryptography = null;

    // Idiomatic facade: $client->cryptography()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Cryptography() (PHP method
    // names are case-insensitive).
    public function cryptography($data = null)
    {
        require_once __DIR__ . '/entity/cryptography_entity.php';
        if ($data === null) {
            if ($this->_cryptography === null) {
                $this->_cryptography = new CryptographyEntity($this, null);
            }
            return $this->_cryptography;
        }
        return new CryptographyEntity($this, $data);
    }


    private $_encoding = null;

    // Idiomatic facade: $client->encoding()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Encoding() (PHP method
    // names are case-insensitive).
    public function encoding($data = null)
    {
        require_once __DIR__ . '/entity/encoding_entity.php';
        if ($data === null) {
            if ($this->_encoding === null) {
                $this->_encoding = new EncodingEntity($this, null);
            }
            return $this->_encoding;
        }
        return new EncodingEntity($this, $data);
    }


    private $_generator = null;

    // Idiomatic facade: $client->generator()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Generator() (PHP method
    // names are case-insensitive).
    public function generator($data = null)
    {
        require_once __DIR__ . '/entity/generator_entity.php';
        if ($data === null) {
            if ($this->_generator === null) {
                $this->_generator = new GeneratorEntity($this, null);
            }
            return $this->_generator;
        }
        return new GeneratorEntity($this, $data);
    }


    private $_get_documentation = null;

    // Idiomatic facade: $client->get_documentation()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias GetDocumentation() (PHP method
    // names are case-insensitive).
    public function get_documentation($data = null)
    {
        require_once __DIR__ . '/entity/get_documentation_entity.php';
        if ($data === null) {
            if ($this->_get_documentation === null) {
                $this->_get_documentation = new GetDocumentationEntity($this, null);
            }
            return $this->_get_documentation;
        }
        return new GetDocumentationEntity($this, $data);
    }


    private $_tool = null;

    // Idiomatic facade: $client->tool()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Tool() (PHP method
    // names are case-insensitive).
    public function tool($data = null)
    {
        require_once __DIR__ . '/entity/tool_entity.php';
        if ($data === null) {
            if ($this->_tool === null) {
                $this->_tool = new ToolEntity($this, null);
            }
            return $this->_tool;
        }
        return new ToolEntity($this, $data);
    }


    private $_utility = null;

    // Idiomatic facade: $client->utility()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Utility() (PHP method
    // names are case-insensitive).
    public function utility($data = null)
    {
        require_once __DIR__ . '/entity/utility_entity.php';
        if ($data === null) {
            if ($this->_utility === null) {
                $this->_utility = new UtilityEntity($this, null);
            }
            return $this->_utility;
        }
        return new UtilityEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ApiToolsSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
