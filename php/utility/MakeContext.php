<?php
declare(strict_types=1);

// ApiTools SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ApiToolsMakeContext
{
    public static function call(array $ctxmap, ?ApiToolsContext $basectx): ApiToolsContext
    {
        return new ApiToolsContext($ctxmap, $basectx);
    }
}
