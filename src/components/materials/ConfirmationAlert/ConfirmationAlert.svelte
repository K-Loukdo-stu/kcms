<script>
	import { createEventDispatcher } from "svelte";
	import SmfbLoading from "../Spinners/fbLoading/SMFBLoading.svelte";
	export let title = "";
	export let confirmBtnTitle = "Continue";
	export let confirmBtnBgColor = "#3982c2";
	export let errMsg = "";
	export let loading = false;
	const dispatch = createEventDispatcher();
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="relative max-w-[320px] w-full">
			<div class="flex flex-col py-6 px-6 lg:px-8">
				<div class="flex-grow">
					{#if title}
						<h3 class="mb-4 font-medium text-base text-gray-900 text-center">
							{title}
						</h3>
					{/if}
				</div>
				{#if errMsg}
					<div class="flex-grow-0 mt-0 mb-4">
						<div
							class=" p-4 rounded-md bg-orange-50 text-orange-600 text-center text-xs"
						>
							{errMsg}
						</div>
					</div>
				{/if}
				<div class="flex-grow-0">
					<div class="flex justify-center items-center space-x-4">
						<button
							class="text-gray-600 bg-white focus:ring-4 focus:outline-none rounded-md border text-sm font-medium px-4 py-2 border-gray-200"
							on:click={() => {
								dispatch("cancel");
							}}
						>
							Cancel
						</button>
						<button
							disabled={loading}
							on:click={async () => {
								dispatch("confirm");
							}}
							style={`${!loading && confirmBtnBgColor ? `background-color: ${confirmBtnBgColor}` : ""}`}
							class=" disabled:bg-gray-100 text-white focus:ring-4 focus:outline-none rounded-md border text-sm font-medium px-4 py-2 border-gray-200"
						>
							{#if !loading}
								{confirmBtnTitle}
							{:else}
								<div class=" h-5 w-8 flex justify-center items-center">
									<SmfbLoading color="grey" />
								</div>
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
