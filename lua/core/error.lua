-- ApiTools SDK error

local ApiToolsError = {}
ApiToolsError.__index = ApiToolsError


function ApiToolsError.new(code, msg, ctx)
  local self = setmetatable({}, ApiToolsError)
  self.is_sdk_error = true
  self.sdk = "ApiTools"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ApiToolsError:error()
  return self.msg
end


function ApiToolsError:__tostring()
  return self.msg
end


return ApiToolsError
