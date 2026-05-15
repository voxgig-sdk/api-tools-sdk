package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCryptographyEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

var NewEncodingEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

var NewGeneratorEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

var NewGetDocumentationEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

var NewToolEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

var NewUtilityEntityFunc func(client *ApiToolsSDK, entopts map[string]any) ApiToolsEntity

