@if (auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Role")
    || auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Group")
    || auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Assignment")
)
    <h3 class="flex items-center font-normal text-white mb-4 text-base no-underline">
        <span class="text-grey" style="font-size: 20px;">
            <i class="sidebar-icon mr-3 fas fa-key"></i>
        </span>
        <span class="sidebar-label">{{ __("Permissions") }}</span>
    </h3>
    <ul class="list-reset mb-8">

        @if (auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Role"))
            <li class="leading-tight mb-4 ml-8 text-sm">
                <router-link
                    :to="{name: 'laravel-nova-governor-roles'}"
                    class="text-white text-justify no-underline dim">
                    Roles
                </router-link>
            </li>
        @endif

        @if (auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Group"))
            <li class="leading-tight mb-4 ml-8 text-sm">
                <router-link
                    :to="{name: 'laravel-nova-governor-groups'}"
                    class="text-white text-justify no-underline dim">
                    Groups
                </router-link>
            </li>
        @endif

        @if (auth()->user()->can("viewAny", "GeneaLabs\LaravelGovernor\Assignment"))
            <li class="leading-tight mb-4 ml-8 text-sm">
                <router-link
                    :to="{name: 'laravel-nova-governor-assignments'}"
                    class="text-white text-justify no-underline dim">
                    Assignments
                </router-link>
            </li>
        @endif

    </ul>
@endif
