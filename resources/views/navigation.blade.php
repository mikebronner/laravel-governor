<h3 class="flex items-center font-normal text-white mb-4 text-base no-underline">
    <span class="text-grey" style="font-size: 20px;">
        <i class="sidebar-icon mr-3 fas fa-key"></i>
    </span>
    <span class="sidebar-label">{{ __("Permissions") }}</span>
</h3>
<ul class="list-reset mb-8">
    <li class="leading-tight mb-4 ml-8 text-sm">
        <router-link
            :to="{name: 'laravel-nova-governor-roles'}"
            class="text-white text-justify no-underline dim">
            Roles
        </router-link>
    </li>
    <li class="leading-tight mb-4 ml-8 text-sm">
        <router-link
            :to="{name: 'laravel-nova-governor-assignments'}"
            class="text-white text-justify no-underline dim">
            Assignments
        </router-link>
    </li>
</ul>
