"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GeneratorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when API_TOOLS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('API_TOOLS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApiToolsSDK.test();
        const ent = testsdk.Generator();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.API_TOOLS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'generator.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "uuid", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "uuids", "req": false, "type": "`$ARRAY`", "index$": 1 }], "name": "generator", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/uuid", "json": "{\"operationId\":\"generateUuid\",\"parameters\":[{\"description\":\"Number of UUIDs to generate\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"uuid\":{\"type\":\"string\"},\"uuids\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with generated UUID(s)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/uuid", "segments": [{ "lit": "api" }, { "lit": "uuid" }], "select": { "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body.uuids`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 16, "kind": "query", "name": "length", "orig": "length", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "max", "orig": "max", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "min", "orig": "min", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "number", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /api/random", "json": "{\"operationId\":\"generateRandom\",\"parameters\":[{\"description\":\"Type of random data to generate\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"default\":\"number\",\"enum\":[\"number\",\"string\",\"boolean\"],\"type\":\"string\"}},{\"description\":\"Minimum value for random number\",\"in\":\"query\",\"name\":\"min\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Maximum value for random number\",\"in\":\"query\",\"name\":\"max\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Length of random string\",\"in\":\"query\",\"name\":\"length\",\"required\":false,\"schema\":{\"default\":16,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"type\":{\"type\":\"string\"},\"value\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"type\":\"boolean\"}]}},\"type\":\"object\"}}},\"description\":\"Successful response with random data\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/random", "segments": [{ "lit": "api" }, { "lit": "random" }], "select": { "exist": ["length", "max", "min", "type"] }, "transform": { "req": "`reqdata`", "res": "`body.value`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": 200, "kind": "query", "name": "size", "orig": "size", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "text", "orig": "text", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /api/qrcode", "json": "{\"operationId\":\"generateQrCode\",\"parameters\":[{\"description\":\"Text or URL to encode in the QR code\",\"in\":\"query\",\"name\":\"text\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Size of the QR code in pixels\",\"in\":\"query\",\"name\":\"size\",\"required\":false,\"schema\":{\"default\":200,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with QR code image\"},\"400\":{\"description\":\"Bad request - missing or invalid parameters\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/qrcode", "segments": [{ "lit": "api" }, { "lit": "qrcode" }], "select": { "exist": ["size", "text"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "generator", "name__orig": "generator", "Name": "Generator", "name_": "generator", "name-": "generator", "NAME": "GENERATOR", "index$": 2 }, { "active": true, "entity": "generator", "key$": "BasicGeneratorFlow", "kind": "basic", "name": "BasicGeneratorFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "generator_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "generator_ref01", "srcdatavar": "generator_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-generator_ref01" } }], "index$": 1 }] }, 'Generator');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let generator_ref01_data = Object.values(setup.data.existing.generator)[0];
        // LIST
        const generator_ref01_ent = client.Generator();
        const generator_ref01_match = {};
        const generator_ref01_list = (await generator_ref01_ent.list(generator_ref01_match)).map((e) => e.data());
        // LOAD
        const generator_ref01_match_dt0 = {};
        const generator_ref01_data_dt0 = (await generator_ref01_ent.load(generator_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != generator_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/generator/GeneratorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApiToolsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['generator01', 'generator02', 'generator03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'API_TOOLS_TEST_GENERATOR_ENTID': idmap,
        'API_TOOLS_TEST_LIVE': 'FALSE',
        'API_TOOLS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['API_TOOLS_TEST_GENERATOR_ENTID'];
    const live = 'TRUE' === env.API_TOOLS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['API_TOOLS_TEST_GENERATOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ApiToolsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.API_TOOLS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GeneratorEntity.test.js.map