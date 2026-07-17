-- ApiTools SDK exists test

local sdk = require("api-tools_sdk")

describe("ApiToolsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
