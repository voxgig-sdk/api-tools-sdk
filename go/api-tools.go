package voxgigapitoolssdk

import (
	"github.com/voxgig-sdk/api-tools-sdk/core"
	"github.com/voxgig-sdk/api-tools-sdk/entity"
	"github.com/voxgig-sdk/api-tools-sdk/feature"
	_ "github.com/voxgig-sdk/api-tools-sdk/utility"
)

// Type aliases preserve external API.
type ApiToolsSDK = core.ApiToolsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ApiToolsEntity = core.ApiToolsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ApiToolsError = core.ApiToolsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCryptographyEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewCryptographyEntity(client, entopts)
	}
	core.NewEncodingEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewEncodingEntity(client, entopts)
	}
	core.NewGeneratorEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewGeneratorEntity(client, entopts)
	}
	core.NewGetDocumentationEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewGetDocumentationEntity(client, entopts)
	}
	core.NewToolEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewToolEntity(client, entopts)
	}
	core.NewUtilityEntityFunc = func(client *core.ApiToolsSDK, entopts map[string]any) core.ApiToolsEntity {
		return entity.NewUtilityEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewApiToolsSDK = core.NewApiToolsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
