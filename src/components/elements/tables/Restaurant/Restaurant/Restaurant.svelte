<script>
	import Eye from '$components/icons/Eye/Eye.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let Data;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF] w-full">
		<tr>
			<th>
				<div class="font-semibold text-center">Restaurant</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Province</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Category</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861] w-full">
		{#each Data as data}
			<tr class="w-full">
				{#if data.mediaUrl}
					<td class="p-2">
						<div>
							<a
								href={`/dashboard/ktour/restaurant/restaurant/restaurant/detail/info/${data.id}`}
								title={data.name}
							>
								<img class=" w-10 h-10 m-auto" src={data.mediaUrl.url} alt="" />
							</a>
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div>
							<a
								href={`/dashboard/ktour/restaurant/restaurant/restaurant/detail/info/${data.id}`}
								title={data.name}
							>
								<img
									class=" w-10 h-10 m-auto"
									src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
									alt=""
								/>
							</a>
						</div>
					</td>
				{/if}

				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.name}</div>
				</td>

				{#if data.province}
					<td class="p-2">
						<div class=" text-gray-600 text-center">{data.province.name}</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" text-gray-600 text-center" />
					</td>
				{/if}
				{#if data.category}
					<td class="p-2">
						<div class=" text-gray-600 text-center">{data.category.name}</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" text-gray-600 text-center" />
					</td>
				{/if}

				<td class="p-2 space-x-2">
					<div class=" text-gray-600 text-center flex flex-row justify-center items-center">
						<a
							href={`/dashboard/ktour/restaurant/restaurant/restaurant/detail/info/${data.id}`}
							title={data.name}
						>
							<div class="cursor-pointer hover:bg-gray-200 p-1 rounded-full">
								<Eye />
							</div>
						</a>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tr td:nth-child(n + 5),
	tr th:nth-child(n + 5) {
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
