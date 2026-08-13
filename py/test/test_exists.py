# ApiTools SDK exists test

import pytest
from apitools_sdk import ApiToolsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ApiToolsSDK.test(None, None)
        assert testsdk is not None
