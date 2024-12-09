<script>
	import PageButton from "$components/materials/PageButton/PageButton.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let totalPageNumber;
	export let currentPage;
</script>

{#if totalPageNumber <= 6}
	<div class="w-full flex items-center justify-end p-2 rounded-lg space-x-1">
		{#each Array(totalPageNumber) as _, i}
			{#if i + 1 != currentPage}
				<PageButton
					active={false}
					number={i + 1}
					on:onCurrentPage={(evt) => {
						i = evt.detail.number;
						dispatch("onCurrentPage", i);
					}}
				/>
			{:else}
				<PageButton
					active={true}
					number={i + 1}
					on:onCurrentPage={(evt) => {
						i = evt.detail.number;
						dispatch("onCurrentPage", i);
					}}
				/>
			{/if}
		{/each}
	</div>
{:else if currentPage < 4}
	<div class="w-full flex items-center justify-end p-2 rounded-lg space-x-1">
		{#each Array(3) as _, i}
			{#if i + 1 != currentPage}
				<PageButton
					number={i + 1}
					on:onCurrentPage={(evt) => {
						i = evt.detail.number;
						dispatch("onCurrentPage", i);
					}}
				/>
			{:else}
				<PageButton
					active={true}
					number={i + 1}
					on:onCurrentPage={(evt) => {
						i = evt.detail.number;
						dispatch("onCurrentPage", i);
					}}
				/>
			{/if}
			<PageButton number={"....."} />
			<PageButton
				number={totalPageNumber - 1}
				on:onCurrentPage={(evt) => {
					i = evt.detail.number;
					dispatch("onCurrentPage", i);
				}}
			/>
			<PageButton
				number={totalPageNumber}
				on:onCurrentPage={(evt) => {
					i = evt.detail.number;
					dispatch("onCurrentPage", i);
				}}
			/>
		{/each}
	</div>
	<!-- {:else if currentPage < 4}
	<div class="float-right">
		{#each Array(3) as _, i}
			{#if i + 1 != currentPage}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', i + 1);
						}}
					>
						{i + 1}
					</div>
				</div>
			{:else}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white active"
						on:click={() => {
							dispatch('onCurrentPage', i + 1);
						}}
					>
						{i + 1}
					</div>
				</div>
			{/if}
		{/each}
		<div class="inline-flex items-center -space-x-px mt-10 mb-5">
			<div
				class="py-2 px-3 leading-tight  text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
			>
				.....
			</div>
		</div>
		<div class="inline-flex items-center -space-x-px mt-10 mb-5">
			<div
				class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
				on:click={() => {
					dispatch('onCurrentPage', totalPageNumber - 1);
				}}
			>
				{totalPageNumber - 1}
			</div>
		</div>
		<div class="inline-flex items-center -space-x-px mt-10 mb-5">
			<div
				class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
				on:click={() => {
					dispatch('onCurrentPage', totalPageNumber);
				}}
			>
				{totalPageNumber}
			</div>
		</div>
	</div>
{:else if 3 < currentPage}
	{#if currentPage <= totalPageNumber - 3}
		<div class="float-right">
			{#if currentPage === 4}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', 1);
						}}
					>
						{1}
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', 2);
						}}
					>
						{2}
					</div>
				</div>
			{:else}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', 1);
						}}
					>
						{1}
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', 2);
						}}
					>
						{2}
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer  text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
					>
						.....
					</div>
				</div>
			{/if}

			{#each Array(currentPage) as _, i}
				{#if i + 1 === currentPage}
					<div class="inline-flex items-center -space-x-px mt-10 mb-5">
						<div
							class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
							on:click={() => {
								dispatch('onCurrentPage', i);
							}}
						>
							{i}
						</div>
					</div>
					<div class="inline-flex items-center -space-x-px mt-10 mb-5">
						<div
							class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white active"
							on:click={() => {
								dispatch('onCurrentPage', i + 1);
							}}
						>
							{i + 1}
						</div>
					</div>
					<div class="inline-flex items-center -space-x-px mt-10 mb-5">
						<div
							class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
							on:click={() => {
								dispatch('onCurrentPage', i + 2);
							}}
						>
							{i + 2}
						</div>
					</div>
				{/if}
			{/each}
			{#if currentPage === totalPageNumber - 3}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', totalPageNumber - 1);
						}}
					>
						{totalPageNumber - 1}
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', totalPageNumber);
						}}
					>
						{totalPageNumber}
					</div>
				</div>
			{:else}
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
					>
						.....
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', totalPageNumber - 1);
						}}
					>
						{totalPageNumber - 1}
					</div>
				</div>
				<div class="inline-flex items-center -space-x-px mt-10 mb-5">
					<div
						class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
						on:click={() => {
							dispatch('onCurrentPage', totalPageNumber);
						}}
					>
						{totalPageNumber}
					</div>
				</div>
			{/if}
		</div>
	{:else if currentPage <= totalPageNumber}
		<div class="float-right">
			<div class="inline-flex items-center -space-x-px mt-10 mb-5">
				<div
					class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
					on:click={() => {
						dispatch('onCurrentPage', 1);
					}}
				>
					{1}
				</div>
			</div>
			<div class="inline-flex items-center -space-x-px mt-10 mb-5">
				<div
					class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
					on:click={() => {
						dispatch('onCurrentPage', 2);
					}}
				>
					{2}
				</div>
			</div>
			<div class="inline-flex items-center -space-x-px mt-10 mb-5">
				<div
					class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
				>
					.....
				</div>
			</div>
			{#each Array(totalPageNumber) as _, i}
				{#if i + 1 === totalPageNumber}
					{#if currentPage === totalPageNumber - 2}
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="active py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 2);
								}}
							>
								{totalPageNumber - 2}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 1);
								}}
							>
								{totalPageNumber - 1}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber);
								}}
							>
								{totalPageNumber}
							</div>
						</div>
					{:else if currentPage === totalPageNumber - 1}
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 2);
								}}
							>
								{totalPageNumber - 2}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="active py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 1);
								}}
							>
								{totalPageNumber - 1}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber);
								}}
							>
								{totalPageNumber}
							</div>
						</div>
					{:else if currentPage === totalPageNumber}
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class=" py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 2);
								}}
							>
								{totalPageNumber - 2}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber - 1);
								}}
							>
								{totalPageNumber - 1}
							</div>
						</div>
						<div class="inline-flex items-center -space-x-px mt-10 mb-5">
							<div
								class="active py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={() => {
									dispatch('onCurrentPage', totalPageNumber);
								}}
							>
								{totalPageNumber}
							</div>
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if} -->
{/if}
