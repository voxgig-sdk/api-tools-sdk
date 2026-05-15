<?php
declare(strict_types=1);

// ApiTools SDK utility: result_headers

class ApiToolsResultHeaders
{
    public static function call(ApiToolsContext $ctx): ?ApiToolsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
