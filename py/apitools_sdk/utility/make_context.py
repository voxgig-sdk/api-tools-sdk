# ApiTools SDK utility: make_context

from apitools_sdk.core.context import ApiToolsContext


def make_context_util(ctxmap, basectx):
    return ApiToolsContext(ctxmap, basectx)
