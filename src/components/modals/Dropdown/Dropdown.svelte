<script>
	import { clickOutside } from '$lib/utils/clickOutside';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let shown = false;
	export let params = [];
</script>

<!-- Modal -->
{#if shown}
	<div class=" absolute inset-0 z-10">
		<div
			class=" relative p-1 flex justify-center items-center w-full h-full bg-gray-600/25 rounded-lg"
		>
			<div
				use:clickOutside
				on:click_outside={() => {
					dispatch('close');
				}}
				class="absolute bg-white rounded-lg"
			>
				<div class="w-72 h-[400px] overflow-y-auto  p-2">
					{#each params as param}
						<div
							on:click={() => {
								dispatch('select', param);
							}}
							class=" hover:bg-gray-300 p-1 h-fit cursor-pointer"
						>
							<div>{param.name}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
