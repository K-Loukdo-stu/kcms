<script>
	import Edit from "$components/icons/Edit.svelte";
	import Eye from "$components/icons/Eye/Eye.svelte";
	import User from "$components/icons/User.svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let data;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Profile</div>
			</th>
			<th>
				<div class="font-semibold text-center">Name</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Email</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each data as user}
			<tr>
				{#if user?.thumbnail?.url}
					<td class="p-2">
						<div class="flex justify-center">
							<img class="w-10 h-10 m-auto" src={user?.thumbnail?.url} alt="" />
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div class="flex justify-center">
							<User />
						</div>
					</td>
				{/if}

				<td class="p-2">
					<div class=" text-gray-600 text-center truncate">{user.username}</div>
				</td>

				{#if user.email}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center truncate">
							{user.email}
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center truncate">
							None
						</div>
					</td>
				{/if}
				<td class="p-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
					>
						<button
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch("onEdit", user);
							}}
						>
							<Edit />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
							on:click={() => {
								dispatch("onView", user);
							}}
						>
							<Eye />
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
