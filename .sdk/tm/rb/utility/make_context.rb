# ApiTools SDK utility: make_context
require_relative '../core/context'
module ApiToolsUtilities
  MakeContext = ->(ctxmap, basectx) {
    ApiToolsContext.new(ctxmap, basectx)
  }
end
