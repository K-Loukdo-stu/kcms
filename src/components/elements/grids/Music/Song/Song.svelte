<script>
	import Edit from "$components/icons/Edit.svelte";
	import Play from "$components/icons/Play.svelte";
    import Trash from "$components/icons/Trash.svelte";
	import { secondsToPlayerFormat } from "$lib/utils/time";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let songs;
</script>

<table class="table-auto w-full mt-5">
	<thead class="text-sm bg-[#787878] text-[#FFFFFF]">
		<tr>
			<th>
				<div class="font-semibold text-center">Title</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Duration</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Signer</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Genre</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Language</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Production</div>
			</th>
			<th class="p-2">
				<div class="font-semibold text-center">Action</div>
			</th>
		</tr>
	</thead>

	<tbody class="text-sm divide-y divide-gray-300 text-[#585861]">
		{#each songs as data}
			<tr>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.title}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">
						{secondsToPlayerFormat(data.length)}
					</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">
						{#if data.singer}
							{data.singer.firstName}
							{data.singer.lastName}
						{:else}
							<div>---</div>
						{/if}
					</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.genre}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.language}</div>
				</td>
				<td class="p-2">
					<div class=" text-gray-600 text-center">{data.production.name}</div>
				</td>
				<td class="p-2 space-x-2">
					<div
						class=" text-gray-600 text-center flex flex-row justify-center items-center"
					>
						<button
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch("play", data);
							}}
						>
							<Play />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-400/50 p-1 rounded-full"
							on:click={() => {
								dispatch("edit", data);
							}}
						>
							<Edit />
						</button>
						<button
							class="cursor-pointer hover:bg-gray-100 hover:text-red-500 p-1 rounded-full"
							on:click={() => {
								dispatch("delete", data);
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
