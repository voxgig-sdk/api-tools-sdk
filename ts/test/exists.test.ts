
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ApiToolsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ApiToolsSDK.test()
    equal(null !== testsdk, true)
  })

})
