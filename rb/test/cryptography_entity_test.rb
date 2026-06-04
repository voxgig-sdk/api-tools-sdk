# Cryptography entity test

require "minitest/autorun"
require "json"
require_relative "../ApiTools_sdk"
require_relative "runner"

class CryptographyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApiToolsSDK.test(nil, nil)
    ent = testsdk.Cryptography(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = cryptography_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "cryptography." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APITOOLS_TEST_CRYPTOGRAPHY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    cryptography_ref01_ent = client.Cryptography(nil)
    cryptography_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.cryptography"), "cryptography_ref01"))

    cryptography_ref01_data_result, err = cryptography_ref01_ent.create(cryptography_ref01_data, nil)
    assert_nil err
    cryptography_ref01_data = Helpers.to_map(cryptography_ref01_data_result)
    assert !cryptography_ref01_data.nil?

  end
end

def cryptography_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "cryptography", "CryptographyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApiToolsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["cryptography01", "cryptography02", "cryptography03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["APITOOLS_TEST_CRYPTOGRAPHY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APITOOLS_TEST_CRYPTOGRAPHY_ENTID" => idmap,
    "APITOOLS_TEST_LIVE" => "FALSE",
    "APITOOLS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["APITOOLS_TEST_CRYPTOGRAPHY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["APITOOLS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ApiToolsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["APITOOLS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["APITOOLS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
