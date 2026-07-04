<?php
declare(strict_types=1);

// Generator entity test

require_once __DIR__ . '/../apitools_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GeneratorEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ApiToolsSDK::test(null, null);
        $ent = $testsdk->Generator(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = generator_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "generator." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set APITOOLS_TEST_GENERATOR_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $generator_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.generator")));
        $generator_ref01_data = null;
        if (count($generator_ref01_data_raw) > 0) {
            $generator_ref01_data = Helpers::to_map($generator_ref01_data_raw[0][1]);
        }

        // LIST
        $generator_ref01_ent = $client->Generator(null);
        $generator_ref01_match = [];

        $generator_ref01_list_result = $generator_ref01_ent->list($generator_ref01_match, null);
        $this->assertIsArray($generator_ref01_list_result);

        // LOAD
        $generator_ref01_match_dt0 = [];
        $generator_ref01_data_dt0_loaded = $generator_ref01_ent->load($generator_ref01_match_dt0, null);
        $this->assertNotNull($generator_ref01_data_dt0_loaded);

    }
}

function generator_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/generator/GeneratorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ApiToolsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["generator01", "generator02", "generator03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("APITOOLS_TEST_GENERATOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "APITOOLS_TEST_GENERATOR_ENTID" => $idmap,
        "APITOOLS_TEST_LIVE" => "FALSE",
        "APITOOLS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["APITOOLS_TEST_GENERATOR_ENTID"]);
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
