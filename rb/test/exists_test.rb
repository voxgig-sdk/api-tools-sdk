# ApiTools SDK exists test

require "minitest/autorun"
require_relative "../ApiTools_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ApiToolsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
