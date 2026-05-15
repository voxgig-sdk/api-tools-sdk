# ApiTools SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ApiToolsFeatures
  def self.make_feature(name)
    case name
    when "base"
      ApiToolsBaseFeature.new
    when "test"
      ApiToolsTestFeature.new
    else
      ApiToolsBaseFeature.new
    end
  end
end
