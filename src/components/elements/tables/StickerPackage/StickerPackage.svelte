<script>
	import Edit from "$components/icons/Edit.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let stickersCategoryData;
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
				<div class="font-semibold text-center">Thumbnail</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Price</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Sticker total</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center px-2">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each stickersCategoryData as packages}
			<tr>
				{#if packages.file}
					<td class="p-2">
						<div>
							<a
								href={`/dashboard/kart/sticker/package/${packages.id}`}
								title={packages.name}
							>
								<img class=" w-10 h-10 m-auto" src={packages.file.url} alt="" />
							</a>
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div>
							<a
								href={`/dashboard/kart/sticker/package/${packages.id}`}
								title={packages.name}
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
					<div class=" text-gray-600 text-center">{packages.name}</div>
				</td>

				{#if packages.price}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">
							{packages.currency}
							{packages.price}
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">$ 00.00</div>
					</td>
				{/if}

				{#if packages.stickerCount}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">
							{packages.stickerCount}
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">0</div>
					</td>
				{/if}
				<td class="p-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center"
					>
						<button
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch("onEdit", packages);
							}}
						>
							<Edit />
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
