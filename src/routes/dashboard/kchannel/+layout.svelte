<script>
	import DashboardLayout from "$components/elements/DashboardLayout/DashboardLayout.svelte";
	import MenuButton from "$components/materials/SideMenu/MenuButton.svelte";
	import SubMenuButton from "$components/materials/SideMenu/SubMenuButton.svelte";
	import MonitorinMenuButton from "$components/materials/SideMenu/MonitorinMenuButton.svelte";
	import { beforeUpdate } from "svelte";
	import { ensureServiceRole } from "$lib/middleware/serviceRole";
	import { goto } from "$app/navigation";
	import { AdminServiceRoles } from "$lib/statics/auth";

	let isReady = false;

	beforeUpdate(() => {
		checkServiceRole();
	});

	const checkServiceRole = () => {
		const hasRole = ensureServiceRole(AdminServiceRoles.KART);
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
					href="/dashboard/kchannel"
				/>
				<div class="pl-5">
					<MenuButton
						title="Channel"
						hasSubMenu={true}
						href="/dashboard/kchannel/channel"
					>
						<SubMenuButton
							title="Channel"
							href="/dashboard/kchannel/channel"
						/>
						<SubMenuButton
							title="Catalog"
							href="/dashboard/kchannel/catalog"
						/>
					</MenuButton>
					<MenuButton
						title="Product"
						hasSubMenu={true}
						href="/dashboard/kchannel/product"
					>
						<SubMenuButton
							title="Catalog"
							href="/dashboard/kchannel/product/product-type-catalog"
						/>
						<SubMenuButton
							title="Type"
							href="/dashboard/kchannel/product/product-type"
						/>
						<SubMenuButton
							title="Product"
							href="/dashboard/kchannel/product/product"
						/>
					</MenuButton>
					<MenuButton title="Feed" href="/dashboard/kchannel/feed" />
					<MenuButton
						title="KMap"
						hasSubMenu={true}
						href="/dashboard/kchannel/kmap"
					>
						<SubMenuButton
							title="Location"
							href="/dashboard/kchannel/kmap/location"
						/>
					</MenuButton>
					<MenuButton
						title="Synchronize"
						hasSubMenu={true}
						href="/dashboard/kchannel/synchronize"
					>
						<SubMenuButton
							title="Followship"
							href="/dashboard/kchannel/synchronize/followship"
						/>
						<SubMenuButton
							title="User"
							href="/dashboard/kchannel/synchronize/user"
						/>
						<SubMenuButton
							title="Channel"
							href="/dashboard/kchannel/synchronize/channel"
						/>
					</MenuButton>
				</div>
			</div>
			<div slot="content" class="relative h-full w-full">
				<slot />
			</div>
		</DashboardLayout>
	</div>
{/if}
