<script>
	import { goto } from "$app/navigation";
	import DashboardLayout from "$components/elements/DashboardLayout/DashboardLayout.svelte";
	import MenuButton from "$components/materials/SideMenu/MenuButton.svelte";
	import MonitorinMenuButton from "$components/materials/SideMenu/MonitorinMenuButton.svelte";
	import { ensureServiceRole } from "$lib/middleware/serviceRole";
	import { AdminServiceRoles } from "$lib/statics/auth";
	import { beforeUpdate } from "svelte";
	let isReady = false;

	beforeUpdate(() => {
		checkServiceRole();
	});

	const checkServiceRole = () => {
		const hasRole = ensureServiceRole(AdminServiceRoles.KTALK);
		if (!hasRole) return goto("/dashboard");
		isReady = true;
	};
</script>

{#if isReady}
	<div class=" w-full h-full">
		<DashboardLayout>
			<div slot="menu">
				<MonitorinMenuButton
					tailwindClass="font-semibold"
					href="/dashboard/ktalk"
				/>
				<div class="pl-5">
					<MenuButton title="unknown" href="/dashboard/ktalk/unknown" />
				</div>
			</div>
			<div slot="content" class="relative h-full w-full">
				<slot />
			</div>
		</DashboardLayout>
	</div>
{/if}
