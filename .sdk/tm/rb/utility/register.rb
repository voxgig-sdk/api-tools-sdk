# ApiTools SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ApiToolsUtility.registrar = ->(u) {
  u.clean = ApiToolsUtilities::Clean
  u.done = ApiToolsUtilities::Done
  u.make_error = ApiToolsUtilities::MakeError
  u.feature_add = ApiToolsUtilities::FeatureAdd
  u.feature_hook = ApiToolsUtilities::FeatureHook
  u.feature_init = ApiToolsUtilities::FeatureInit
  u.fetcher = ApiToolsUtilities::Fetcher
  u.make_fetch_def = ApiToolsUtilities::MakeFetchDef
  u.make_context = ApiToolsUtilities::MakeContext
  u.make_options = ApiToolsUtilities::MakeOptions
  u.make_request = ApiToolsUtilities::MakeRequest
  u.make_response = ApiToolsUtilities::MakeResponse
  u.make_result = ApiToolsUtilities::MakeResult
  u.make_point = ApiToolsUtilities::MakePoint
  u.make_spec = ApiToolsUtilities::MakeSpec
  u.make_url = ApiToolsUtilities::MakeUrl
  u.param = ApiToolsUtilities::Param
  u.prepare_auth = ApiToolsUtilities::PrepareAuth
  u.prepare_body = ApiToolsUtilities::PrepareBody
  u.prepare_headers = ApiToolsUtilities::PrepareHeaders
  u.prepare_method = ApiToolsUtilities::PrepareMethod
  u.prepare_params = ApiToolsUtilities::PrepareParams
  u.prepare_path = ApiToolsUtilities::PreparePath
  u.prepare_query = ApiToolsUtilities::PrepareQuery
  u.graphql_body = ApiToolsUtilities::GraphqlBody
  u.graphql_errors = ApiToolsUtilities::GraphqlErrors
  u.result_basic = ApiToolsUtilities::ResultBasic
  u.result_body = ApiToolsUtilities::ResultBody
  u.result_headers = ApiToolsUtilities::ResultHeaders
  u.transform_request = ApiToolsUtilities::TransformRequest
  u.transform_response = ApiToolsUtilities::TransformResponse
}
