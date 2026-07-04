<?php
declare(strict_types=1);

// Tool entity test

require_once __DIR__ . '/../apitools_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ToolEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ApiToolsSDK::test(null, null);
        $ent = $testsdk->Tool(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = tool_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "tool." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set APITOOLS_TEST_TOOL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $tool_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.tool")));
        $tool_ref01_data = null;
        if (count($tool_ref01_data_raw) > 0) {
            $tool_ref01_data = Helpers::to_map($tool_ref01_data_raw[0][1]);
        }

        // LIST
        $tool_ref01_ent = $client->Tool(null);
        $tool_ref01_match = [];

        $tool_ref01_list_result = $tool_ref01_ent->list($tool_ref01_match, null);
        $this->assertIsArray($tool_ref01_list_result);

    }
}

function tool_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/tool/ToolTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ApiToolsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["tool01", "tool02", "tool03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("APITOOLS_TEST_TOOL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "APITOOLS_TEST_TOOL_ENTID" => $idmap,
        "APITOOLS_TEST_LIVE" => "FALSE",
        "APITOOLS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["APITOOLS_TEST_TOOL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["APITOOLS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ApiToolsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["APITOOLS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["APITOOLS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
