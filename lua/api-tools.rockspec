package = "voxgig-sdk-api-tools"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/api-tools-sdk.git",
  tag = "lua/v0.0.1",
  dir = "api-tools-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the API Tools public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/api-tools-sdk",
  issues_url = "https://github.com/voxgig-sdk/api-tools-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "api-tools" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["api-tools_sdk"] = "api-tools_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
  }
}
