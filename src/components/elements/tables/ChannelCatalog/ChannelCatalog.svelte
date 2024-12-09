<script>
	import Edit from '$components/icons/Edit.svelte';
	import Eye from '$components/icons/Eye/Eye.svelte';
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let Data;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Catalog</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each Data as data}
			<tr>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.name}</div>
				</td>
				<td class="p-2 space-x-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
					>
						<div
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch('onEdit', data);
							}}
						>
							<Edit />
						</div>
						<div
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch('onDelete', data);
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