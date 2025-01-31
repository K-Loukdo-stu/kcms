<script>
  import Copy from '$components/icons/Copy.svelte';
	import Edit from '$components/icons/Edit.svelte';
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let Data;

</script>

<div class="overflow-x-auto">
<table class="table auto w-full mt-2">
    <thead class="text-sm  bg-[#787878] text-[#FFFFFF]">
		<tr>
			<!-- <th class="p-2">
				<div class="font-semibold text-center min-w-[100px]">id</div>
			</th> -->
			<th class="p-2">
				<div class="font-semibold text-center min-w-[100px]">name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">seller</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">price</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">category</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center min-w-[100px]">sub category</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center min-w-[80px]">photos</div>
			</th>
			<th class="p-2 sticky z-100 right-0 bg-[#787878]">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
    </thead>

    <tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each Data as data}
			<tr>
				<!-- <td class="p-2">
					<div class=" text-gray-600 text-center">{data.id}</div>
				</td> -->
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.name}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.user.username}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.price.price}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.category.name}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.subCategory.name}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">
						<button
							class=" text-gray-600 text-center border-2 p-1 rounded-md hover:bg-gray-800 hover:text-white"
							on:click={async (evt) => {
								dispatch('onShowImage', data);
							}}
						>{data.photos.length} image(s)</button>
					</div>
					
				</td>

				<td class="p-2 space-x-2 sticky z-100 right-0 bg-white">
					<div class=" text-gray-600 text-center flex flex-row justify-center items-center">
						<button
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch('onEdit', data);
							}}
						>
							<Edit />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch('onCopy', data);
							}}
						>
							<Copy />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch('onDelete', data);
							}}
						>
							<Trash />
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
</div>