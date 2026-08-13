# ApiTools SDK feature factory

from apitools_sdk.feature.base_feature import ApiToolsBaseFeature
from apitools_sdk.feature.test_feature import ApiToolsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ApiToolsBaseFeature(),
        "test": lambda: ApiToolsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
