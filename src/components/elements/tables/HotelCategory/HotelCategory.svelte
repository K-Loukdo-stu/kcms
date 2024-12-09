<script>
	import Edit from '$components/icons/Edit.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let categoryData;
</script>

<table class="table-auto w-full mt-5">
	<colgroup>
		<col width="25%" />
		<col width="25%" />
		<col width="25%" />
		<col width="25%" />
	</colgroup>
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Category</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Amount</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each categoryData as packages}
			<tr>
				{#if packages.mediaUrl}
					<td class="p-2">
						<div>
							<img class=" w-10 h-10 m-auto" src={packages.mediaUrl.url} alt="" />
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
					<div class=" text-gray-600 text-center">{packages.name}</div>
				</td>

				{#if packages.placesCount}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">{packages.placesCount}</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">0</div>
					</td>
				{/if}
				<td class="p-2">
					<div class=" text-gray-600 text-center flex flex-row justify-center items-center">
						<div
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch('onEdit', packages);
							}}
						>
							<Edit />
						</div>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tr td:nth-child(n + 4),
	tr th:nth-child(n + 4) {
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
