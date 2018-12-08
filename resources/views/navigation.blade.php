<h3 class="flex items-center font-normal text-white mb-4 text-base no-underline">
    <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="var(--sidebar-icon)" d="M11.85 17.56a1.5 1.5 0 0 1-1.06.44H10v.5c0 .83-.67 1.5-1.5 1.5H8v.5c0 .83-.67 1.5-1.5 1.5H4a2 2 0 0 1-2-2v-2.59A2 2 0 0 1 2.59 16l5.56-5.56A7.03 7.03 0 0 1 15 2a7 7 0 1 1-1.44 13.85l-1.7 1.71zm1.12-3.95l.58.18a5 5 0 1 0-3.34-3.34l.18.58L4 17.4V20h2v-.5c0-.83.67-1.5 1.5-1.5H8v-.5c0-.83.67-1.5 1.5-1.5h1.09l2.38-2.39zM18 9a1 1 0 0 1-2 0 1 1 0 0 0-1-1 1 1 0 0 1 0-2 3 3 0 0 1 3 3z"/></svg>
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
