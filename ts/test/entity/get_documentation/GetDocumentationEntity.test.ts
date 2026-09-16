

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


describe('GetDocumentationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when API_TOOLS_TEST_LIVE=TRUE.
  afterEach(liveDelay('API_TOOLS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApiToolsSDK.test()
    const ent = testsdk.GetDocumentation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.API_TOOLS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_documentation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Description of the API","type":"`$STRING`","index$":0},{"active":true,"name":"endpoint","req":false,"short":"Endpoint path for the API","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Name of the API","type":"`$STRING`","index$":2}],"name":"get_documentation","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /","json":"{\"operationId\":\"getDocumentation\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"apis\":{\"description\":\"List of available APIs\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the API\",\"type\":\"string\"},\"endpoint\":{\"description\":\"Endpoint path for the API\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the API\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of available APIs\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/html\":{\"schema\":{\"description\":\"HTML page containing API documentation\",\"type\":\"string\"}}},\"description\":\"Successful response with API documentation\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body.apis`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_documentation","name__orig":"get_documentation","Name":"GetDocumentation","name_":"get_documentation","name-":"get-documentation","NAME":"GET_DOCUMENTATION","index$":3}, {"active":true,"entity":"get_documentation","key$":"BasicGetDocumentationFlow","kind":"basic","name":"BasicGetDocumentationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_documentation_ref01"}}],"index$":0}]}, 'GetDocumentation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_documentation_ref01_data = Object.values(setup.data.existing.get_documentation)[0] as any

    // LIST
    const get_documentation_ref01_ent = client.GetDocumentation()
    const get_documentation_ref01_match: any = {}

    const get_documentation_ref01_list = (await get_documentation_ref01_ent.list(get_documentation_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_documentation/GetDocumentationTestData.json')

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
    ['get_documentation01','get_documentation02','get_documentation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'API_TOOLS_TEST_GET_DOCUMENTATION_ENTID': idmap,
    'API_TOOLS_TEST_LIVE': 'FALSE',
    'API_TOOLS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['API_TOOLS_TEST_GET_DOCUMENTATION_ENTID']

  const live = 'TRUE' === env.API_TOOLS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['API_TOOLS_TEST_GET_DOCUMENTATION_ENTID']
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
  
