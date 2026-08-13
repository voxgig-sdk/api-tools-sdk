package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/api-tools-sdk/go"
	"github.com/voxgig-sdk/api-tools-sdk/go/core"

	vs "github.com/voxgig-sdk/api-tools-sdk/go/utility/struct"
)

func TestEncodingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Encoding(nil)
		if ent == nil {
			t.Fatal("expected non-nil EncodingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := encodingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "encoding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set API_TOOLS_TEST_ENCODING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		encodingRef01Ent := client.Encoding(nil)
		encodingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "encoding"}, setup.data), "encoding_ref01"))

		encodingRef01DataResult, err := encodingRef01Ent.Create(encodingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		encodingRef01Data = core.ToMapAny(entityData(encodingRef01DataResult))
		if encodingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func encodingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "encoding", "EncodingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read encoding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse encoding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"encoding01", "encoding02", "encoding03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("API_TOOLS_TEST_ENCODING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"API_TOOLS_TEST_ENCODING_ENTID": idmap,
		"API_TOOLS_TEST_LIVE":      "FALSE",
		"API_TOOLS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["API_TOOLS_TEST_ENCODING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["API_TOOLS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewApiToolsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["API_TOOLS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["API_TOOLS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
