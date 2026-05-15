package = "voxgig-sdk-api-tools"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/api-tools-sdk.git"
}
description = {
  summary = "ApiTools SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["api-tools_sdk"] = "api-tools_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
