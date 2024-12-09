<script>
	import Edit from '$components/icons/Edit.svelte';
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let stickersTypesData;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Emoji</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each stickersTypesData as type}
			<tr>
				<td class="p-2">
					<div class=" text-gray-600 text-left">{type.name}</div>
				</td>
				{#if type.url}
					<td class="p-2">
						<div class=" text-gray-600 text-center">{type.url}</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" text-gray-600 text-center">
							<img
								class=" w-10 h-10 m-auto"
								src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
								alt=""
							/>
						</div>
					</td>
				{/if}
				<td class="p-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
					>
						<div
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch('onEdit', type);
							}}
						>
							<Edit />
						</div>
						<div
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch('onDelete', type);
							}}
						>
							<Trash />
						</div>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tr td:nth-child(n + 3),
	tr th:nth-child(n + 3) {
		border-radius: 0 0.625rem 0.625rem 0;
	}
	tr td:nth-child(1),
	tr th:nth-child(1) {
		border-radius: 0.625rem 0 0 0.625rem;
	}
	tbody tr:nth-child(even) {
		background-color: #ffffff;
	}
	tbody tr:nth-child(odd) {
		background-color: #eeeeee;
	}
</style>
