<?php namespace GeneaLabs\LaravelGovernor;

use Laravel\Nova\ResourceTool;

class PermissionsTool extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'PermissionsTool';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'permissions-tool';
    }
}
