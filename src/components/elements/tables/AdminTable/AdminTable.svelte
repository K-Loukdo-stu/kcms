<script>
	import Eye from "$components/icons/Eye/Eye.svelte";
	import User from "$components/icons/User.svelte";
	export let Datas;
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

	<tbody class="text-sm divide-y divide-gray-300">
		{#each Datas as admin}
			<tr>
				{#if admin.url}
					<td class="p-2">
						<div>
							<img class=" w-10 h-10 m-auto" src={admin.url} alt="" />
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
					<div class=" text-gray-600 text-center">{admin.username}</div>
				</td>

				{#if admin.email}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">
							{admin.email}
						</div>
					</td>
				{:else}
					<td class="p-2">
						<div class=" font-medium text-gray-600 text-center">None</div>
					</td>
				{/if}
				<td class="p-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
					>
						<a href={`/dashboard/kauth/admin/${admin.id}`}>
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
