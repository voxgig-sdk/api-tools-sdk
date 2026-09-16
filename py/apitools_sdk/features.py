# ApiTools SDK feature factory

from apitools_sdk.feature.base_feature import ApiToolsBaseFeature
from apitools_sdk.feature.ratelimit_feature import ApiToolsRatelimitFeature
from apitools_sdk.feature.retry_feature import ApiToolsRetryFeature
from apitools_sdk.feature.test_feature import ApiToolsTestFeature
from apitools_sdk.feature.timeout_feature import ApiToolsTimeoutFeature


_FEATURES = {
    "base": lambda: ApiToolsBaseFeature(),
    "ratelimit": lambda: ApiToolsRatelimitFeature(),
    "retry": lambda: ApiToolsRetryFeature(),
    "test": lambda: ApiToolsTestFeature(),
    "timeout": lambda: ApiToolsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
