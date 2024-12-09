<script>
	import Edit from "$components/icons/Edit.svelte";
	import Trash from "$components/icons/Trash.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let servicesData;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Name</div>
			</th>

			<th>
				<div class="font-semibold text-center">Link</div>
			</th>

			<th>
				<div class="font-semibold text-center">Role</div>
			</th>

			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each servicesData as service}
			<tr>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{service.name}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{service.url}</div>
				</td>

				<td class="p-2">
					<div class=" text-gray-600 text-center">{service.role}</div>
				</td>
				<td class="p-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
					>
						<button
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch("onEdit", service);
							}}
						>
							<Edit />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch("onDelete", service);
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
