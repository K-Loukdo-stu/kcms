<script>
	import { clickOutside } from "$lib/utils/clickOutside";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let shown = false;
	export let services;
	export let selectedService;
</script>

<!-- Service Modal -->
{#if shown}
	<div class=" absolute inset-0 z-10 mt-10 p-1">
		<div
			class=" bg-white relative p-1 flex justify-center items-start rounded-md shadow-sm border"
		>
			<div
				use:clickOutside
				on:click_outside={() => {
					dispatch("close");
				}}
				class=" rounded-lg w-full"
			>
				<div class=" overflow-y-auto flex flex-col flex-wrap w-full">
					{#each services as service}
						<button
							on:click={() => {
								dispatch("select", { service });
							}}
							class=" hover:bg-gray-300 p-2 hover:rounded-md cursor-pointer mb-1 text-left w-full"
						>
							<div>{service.service.name}</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
