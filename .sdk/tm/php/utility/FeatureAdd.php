<?php
declare(strict_types=1);

// ApiTools SDK utility: feature_add

class ApiToolsFeatureAdd
{
    public static function call(ApiToolsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
