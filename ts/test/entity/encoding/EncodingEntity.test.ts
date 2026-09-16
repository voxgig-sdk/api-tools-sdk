

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ApiToolsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('EncodingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when API_TOOLS_TEST_LIVE=TRUE.
  afterEach(liveDelay('API_TOOLS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApiToolsSDK.test()
    const ent = testsdk.Encoding()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.API_TOOLS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'encoding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"decoded","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"encoded","op":{"create":{"req":false,"type":"`$STRING`"}},"req":true,"short":"Base64 encoded text to decode","type":"`$STRING`","index$":1},{"active":true,"name":"text","req":true,"short":"Text to encode","type":"`$STRING`","index$":2}],"name":"encoding","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/base64/decode","json":"{\"operationId\":\"decodeBase64\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"encoded\":{\"description\":\"Base64 encoded text to decode\",\"type\":\"string\"}},\"required\":[\"encoded\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"decoded\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with decoded text\"},\"400\":{\"description\":\"Invalid Base64 input\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/base64/decode","segments":[{"lit":"api"},{"lit":"base64"},{"lit":"decode"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /api/base64/encode","json":"{\"operationId\":\"encodeBase64\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"text\":{\"description\":\"Text to encode\",\"type\":\"string\"}},\"required\":[\"text\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"encoded\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with Base64 encoded text\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/base64/encode","segments":[{"lit":"api"},{"lit":"base64"},{"lit":"encode"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /api/url/decode","json":"{\"operationId\":\"urlDecode\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"encoded\":{\"description\":\"URL encoded text to decode\",\"type\":\"string\"}},\"required\":[\"encoded\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"decoded\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with decoded text\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/url/decode","segments":[{"lit":"api"},{"lit":"url"},{"lit":"decode"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{},"contract":{"id":"POST /api/url/encode","json":"{\"operationId\":\"urlEncode\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"text\":{\"description\":\"Text to URL encode\",\"type\":\"string\"}},\"required\":[\"text\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"encoded\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with URL encoded text\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/url/encode","segments":[{"lit":"api"},{"lit":"url"},{"lit":"encode"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"encoding","name__orig":"encoding","Name":"Encoding","name_":"encoding","name-":"encoding","NAME":"ENCODING","index$":1}, {"active":true,"entity":"encoding","key$":"BasicEncodingFlow","kind":"basic","name":"BasicEncodingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"encoding_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Encoding')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const encoding_ref01_ent = client.Encoding()
    let encoding_ref01_data = setup.data.new.encoding['encoding_ref01']

    encoding_ref01_data = (await encoding_ref01_ent.create(encoding_ref01_data)).data()
    assert(null != encoding_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/encoding/EncodingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ApiToolsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['encoding01','encoding02','encoding03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'API_TOOLS_TEST_ENCODING_ENTID': idmap,
    'API_TOOLS_TEST_LIVE': 'FALSE',
    'API_TOOLS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['API_TOOLS_TEST_ENCODING_ENTID']

  const live = 'TRUE' === env.API_TOOLS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['API_TOOLS_TEST_ENCODING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ApiToolsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
