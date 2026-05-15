<?php
declare(strict_types=1);

// ApiTools SDK utility: result_body

class ApiToolsResultBody
{
    public static function call(ApiToolsContext $ctx): ?ApiToolsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
