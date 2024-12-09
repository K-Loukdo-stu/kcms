<script>
	import Edit from '$components/icons/Edit.svelte';
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let Data;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm  bg-[#787878] text-[#FFFFFF] ">
		<tr>
			<th>
				<div class="font-semibold text-center">Category</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each Data as data}
			<tr>
				{#if data.file}
					<td class="p-2">
						<div>
							<img class=" w-10 h-10 m-auto" src={data.file.url} alt="" />
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div>
							<img
								class=" w-10 h-10 m-auto"
								src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
								alt=""
							/>
						</div>
					</td>
				{/if}

				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.name}</div>
				</td>

				<td class="p-2 space-x-2">
					<div class=" text-gray-600 text-center flex flex-row justify-center items-center">
						<div
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch('edit', data);
							}}
						>
							<Edit />
						</div>
						<!-- <div
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch('delete', data);
							}}
						>
							<Trash />
						</div> -->
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
