<script>
	import SignOutIcon from "$components/icons/SignOut.svelte";
	import { goto } from "$app/navigation";
	import { user } from "$providers/stores/kauth";
	import { signOut } from "$providers/actions/kauth/auth";
	import DropDown from "$components/icons/DropDown.svelte";
	import SelectUserService from "$components/modals/SelectUserService/SelectUserService.svelte";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { userServiceByAdmin } from "$providers/actions/kauth/user-service";
	const dispatch = createEventDispatcher();

	let boxHeight;
	let serviceModalShown = false;
	export let admin;
	export let selectedService = null;
	let adminServices = [];
	let serviceTotal = 0;
	const LoadServiceByAdmin = async () => {
		try {
			adminServices = await userServiceByAdmin.load({ admin });
			if (adminServices.success) adminServices = adminServices.data;
			serviceTotal = adminServices.length;
			// selectedService = adminServices[0].service;
			return adminServices;
		} catch {}
	};

	const onSignOut = async () => {
		try {
			const data = await signOut.load();
			if (data.success) goto("/auth");
		} catch {}
	};
	onMount(async () => {
		await LoadServiceByAdmin();
	});
</script>

<div style="height: {boxHeight}px;" class=" relative">
	<div class=" absolute inset-0 z-50 shadow">
		<div bind:clientHeight={boxHeight} class="flex relative bg-gray-50 p-2">
			{#if serviceTotal != 0}
				<div class="absolute left-5 top-0 bottom-0 flex items-center">
					<div class="flex justify-center items-center">
						<button
							on:click={() => {
								serviceModalShown = true;
							}}
							class=" min-w-[170px] font-semibold bg-white text-gray-700 border-2 border-gray-200 p-1 rounded-md font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
						>
							{#if selectedService}
								<div class="flex flex-row space-x-1">
									<div class="pl-2">
										{selectedService.name}
									</div>
								</div>
							{:else}
								<div class="flex flex-row space-x-1">
									<div class="pl-2 py-[2px] px-1">Select service</div>
								</div>
							{/if}
							<DropDown />
						</button>
					</div>
					<!--  Service Modal  -->
					<SelectUserService
						bind:selectedService
						bind:shown={serviceModalShown}
						bind:services={adminServices}
						on:select={(evt) => {
							const { service } = evt.detail;
							selectedService = service.service;
							serviceModalShown = false;
							dispatch("selectedService", selectedService);
						}}
						on:close={() => (serviceModalShown = false)}
					/>
				</div>
			{/if}
			<div
				class=" flex w-full justify-center font-bold text-gray-600 text-xl space-x-2"
			>
				<!-- <span class=" bg-gray-700 text-gray-100 px-2 rounded"
					>KRADASS</span
				> -->
				<div>KCMS</div>
			</div>
			<div class="absolute right-5 top-0 bottom-0 flex items-center">
				<div class=" flex flex-row space-x-4">
					{#if $user && $user.firstName && $user.lastName}
						<button disabled class=" cursor-default font-semibold text-gray-700"
							>{$user.firstName + " " + $user.lastName}</button
						>
					{/if}
					<button on:click={onSignOut}>
						<div class="text-gray-500 hover:text-gray-700">
							<SignOutIcon />
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
