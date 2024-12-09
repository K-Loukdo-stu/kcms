<script>
	import StaticSticker from "$components/elements/StaticSticker.svelte";
	import { createStickerPackage } from "$providers/actions/kart";
	import { uploadStickerPackage } from "$providers/actions/storage/package";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	let checkCurrency = false;
	let currency = "៛";
	let name = "";
	let amount = 0;
	let price = 0;
	let file;
	let disabledCreate = false;
	let base64;
	let uploadPercentage = 0;

	const onUpload = async (evt) => {
		evt.preventDefault();
		disabledCreate = true;
		await uploadStickerPackage.load({
			base64,
			onComplete: (res) => {
				// to do
				createStickerPackage
					.load({
						name,
						price,
						amount,
						currency,
						file: res.response,
					})
					.then((res) => {
						// to do
						dispatch("onCreate");
						disabledCreate = false;
						base64 = "";
					});

				// upload to create sticker package
			},
			onError: (err) => {
				// to do
				disabledCreate = false;
			},
			onProgress: ({ params, loaded, total }) => {
				// to do
				uploadPercentage = (loaded / total) * 98;
			},
		});
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white text-gray-700 rounded-md">
		<div class="">
			<div class=" pb-6 pt-4 px-6 lg:px-8 w-full h-full">
				<form
					class="flex flex-col w-full h-full space-y-6"
					on:submit|preventDefault={onUpload}
					method="post"
				>
					<div class="flex-grow">
						<div>
							<button
								type="button"
								class="absolute top-3 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-200"
								data-modal-toggle="authentication-modal"
								on:click={() => {
									dispatch("close");
								}}
							>
								<svg
									class="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</button>
							<h3 class="mb-5 text-base font-medium text-center">
								New Package
							</h3>
							<label for="name" class="block mb-2 text-sm font-medium"
								>Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class="border text-center text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-gray-200 placeholder-gray-400"
								placeholder="Package name"
								required
							/>
						</div>
						<div class="mt-2">
							<label for="price" class="block mb-2 text-sm font-medium"
								>Price</label
							>
							<div class="flex flex-row">
								<input
									type="number"
									name="price"
									bind:value={price}
									placeholder="0.00"
									class="border text-center w-[70%] text-sm font-bold rounded-lg block p-2.5 bg-gray-200 border-gray-200 placeholder-gray-400"
									required
								/>

								<label
									class="relative flex justify-between items-center text-xl"
								>
									<input
										type="checkbox"
										class="absolute left-0 top-0 w-20 h-10 ml-4 rounded-lg invisible peer"
										bind:checked={checkCurrency}
										on:click={() => {
											checkCurrency = !checkCurrency;
											if (checkCurrency) {
												currency = "$";
											} else {
												currency = "៛";
											}
										}}
										name="currency"
										bind:value={currency}
									/>
									<span
										class="w-20 h-10
											flex items-center
											flex-shrink-0
											ml-4
											bg-gray-300
											rounded-lg
											after:w-10
											after:h-10
											after:bg-pink-700
											after:rounded-lg
											after:shadow-md
											after:duration-300
											peer-checked:active
											peer-checked:after:translate-x-10"
									>
										<div
											class="absolute w-20 h-[1px] z-[1] flex justify-around items-center"
										>
											<span class="relative spana">៛</span>
											<span class="relative spanb">$</span>
										</div>
									</span>
								</label>
							</div>
						</div>
						<div class=" mt-4 w-full flex justify-center items-center p-2">
							<div class=" max-w-[200px] max-h-[200px]">
								<StaticSticker
									on:onImage={(evt) => {
										base64 = evt.detail;
									}}
								/>
							</div>
						</div>
					</div>
					<div class="flex-grow-0">
						<div class="flex justify-center space-x-6">
							<button
								disabled={disabledCreate}
								type="button"
								on:click={() => {
									dispatch("close");
								}}
								class=" w-24 h-11 focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 hover:bg-gray-200 focus:ring-gray-600"
								>Cancel
							</button>
							<button
								disabled={disabledCreate}
								type="submit"
								class="relative w-24 h-11 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-700 hover:text-white"
							>
								<div
									class="bg-gray-300 absolute left-0 top-0 bottom-0"
									style={`width: ${uploadPercentage}%;`}
								/>
								<div
									class="absolute inset-0 py-1 flex justify-center items-center"
								>
									<div>Create</div>
								</div>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.spana {
		color: white;
	}
	.spanb {
		color: rgb(17 24 39);
	}
	.peer:checked ~ span .spana {
		color: rgb(17 24 39);
	}
	.peer:checked ~ span .spanb {
		color: white;
	}
</style>
