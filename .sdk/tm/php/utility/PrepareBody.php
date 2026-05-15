<?php
declare(strict_types=1);

// ApiTools SDK utility: prepare_body

class ApiToolsPrepareBody
{
    public static function call(ApiToolsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
