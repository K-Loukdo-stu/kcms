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
	<div class="w-full h-full">
		<DashboardLayout>
			<div slot="menu" class="w-full h-full">
				<MonitorinMenuButton
					tailwindClass="font-semibold"
					href="/dashboard/kart"
				/>
				<div class="pl-5">
					<MenuButton
						title="Sticker"
						hasSubMenu={true}
						href="/dashboard/kart/sticker"
					>
						<SubMenuButton
							title="Package"
							href="/dashboard/kart/sticker/package"
						/>
						<SubMenuButton
							title="Type"
							href="/dashboard/kart/sticker/type"
						/>
					</MenuButton>
					<MenuButton title="Cover" href="/dashboard/kart/cover" />
					<MenuButton
						title="Wide Screen"
						href="/dashboard/kart/wide-screen-sticker"
					/>
					<MenuButton
						title="GIF"
						href="/dashboard/kart/gif"
					/>
					<MenuButton
						title="Icon"
						hasSubMenu={true}
						href="/dashboard/kart/icon"
					>
						<SubMenuButton
							title="Category"
							href="/dashboard/kart/icon/category"
						/>
						<SubMenuButton
							title="Icon"
							href="/dashboard/kart/icon/icon"
						/>
					</MenuButton>
					<MenuButton
						title="Profile"
						hasSubMenu={true}
						href="/dashboard/kart/profile"
					>
						<SubMenuButton
							title="User"
							href="/dashboard/kart/profile/profile-user"
						/>
						<SubMenuButton
							title="Channel"
							href="/dashboard/kart/profile/profile-channel"
						/>
					</MenuButton>
					<MenuButton
						title="Music"
						hasSubMenu={true}
						href="/dashboard/kart/music"
					>
						<SubMenuButton
							title="Production"
							href="/dashboard/kart/music/production"
						/>
						<SubMenuButton
							title="Album"
							href="/dashboard/kart/music/album"
						/>
						<!-- <SubMenuButton
							title="Genre"
							href="/dashboard/kart/music/genre"
						/>
						<SubMenuButton
							title="Language"
							href="/dashboard/kart/music/language"
						/> -->
						<SubMenuButton
							title="Singer"
							href="/dashboard/kart/music/singer"
						/>
						<SubMenuButton
							title="Song"
							href="/dashboard/kart/music/song"
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
