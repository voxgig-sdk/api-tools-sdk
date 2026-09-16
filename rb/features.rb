# ApiTools SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ApiToolsFeatures
  def self.make_feature(name)
    case name
    when "base"
      ApiToolsBaseFeature.new
    when "ratelimit"
      ApiToolsRatelimitFeature.new
    when "retry"
      ApiToolsRetryFeature.new
    when "test"
      ApiToolsTestFeature.new
    when "timeout"
      ApiToolsTimeoutFeature.new
    else
      ApiToolsBaseFeature.new
    end
  end
end
