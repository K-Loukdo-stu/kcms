<script>
	import { createHotel } from '$providers/actions/ktour/hotel';
	import { createRestaurant } from '$providers/actions/ktour/rastaurant';
	import { uploadHotel } from '$providers/actions/storage/hotel';
	import { uploadRestaurant } from '$providers/actions/storage/restaurant';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let provincesData;
	export let categoriesData;
	export let channelData;

	let disabledCreate = false;

	let provinceSelected = provincesData?.length ? provincesData[0] : null;
	let categorySelected = categoriesData?.length ? categoriesData[0] : null;

	let name = channelData.name;
	let description = '';
	let phone = channelData.phone;
	let email = channelData.email;
	let website;
	let mediaUrl = {};
	let channel = channelData.id;

	let checkInTime = '';
	let checkOutTime = '';
	let province;
	let category;
	let base64;
	let latitude = 0;
	let longtitude = 0;
	let price = 0;
	let errorTitle = '';
	let ShowEror = false;

	let disabledEdit = false;
	let uploadPercentage = 0;

	if (channelData.desc) {
		description = channelData.desc;
	}
	if (channelData.profile) {
		mediaUrl = channelData.profile;
	}
	if (channelData.website) {
		website = channelData.website;
	}

	const onCreate = async (evt) => {
		evt.preventDefault();
		disabledEdit = true;
		if (base64) {
			await uploadHotel.load({
				base64,
				onComplete: (res) => {
					// to do
					createHotel
						.load({
							name,
							mediaUrl: res.response,
							description,
							latitude,
							longtitude,
							category: categorySelected.id,
							province: provinceSelected.id,
							phone,
							email,
							website,
							price,
							channel,
							checkInTime,
							checkOutTime
						})
						.then((res) => {
							// to do

							disabledEdit = false;
							dispatch('edit');
							base64 = '';
						});
				},
				onError: (err) => {
					// to do
					disabledEdit = false;
				},
				onProgress: ({ params, loaded, total }) => {
					// to do
					uploadPercentage = (loaded / total) * 98;
				}
			});
		} else {
			let res = await createHotel.load({
				name,
				mediaUrl,
				description,
				latitude,
				longtitude,
				category: categorySelected.id,
				province: provinceSelected.id,
				phone,
				email,
				website,
				price,
				channel,
				checkInTime,
				checkOutTime
			});

			if (!res.success) {
				ShowEror = true;
				errorTitle = 'This hotel already exists!';
			}
			if (res.success) {
				disabledEdit = false;
				dispatch('edit');
			}
		}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="relative w-[430px] h-[600px] ">
			<form
				class=" flex flex-col space-y-6 w-full h-full absolute inset-0 py-6 px-6 lg:px-8"
				on:submit|preventDefault={onCreate}
				method="post"
			>
				<div class="flex-grow">
					<div>
						<button
							type="button"
							class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
							data-modal-toggle="authentication-modal"
							on:click={() => {
								dispatch('close');
							}}
						>
							<svg
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						<div class="flex flex-row space-x-12">
							<div class="flex-col">
								<label
									for="name"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Name</label
								>
								<input
									type="text"
									name="name"
									bind:value={name}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Name"
									required
								/>
							</div>

							<div class="flex-col">
								<label
									for="phone"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Phone</label
								>
								<input
									type="text"
									name="phone"
									bind:value={phone}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Phone"
									required
								/>
							</div>
						</div>

						<div class="flex flex-row space-x-12 mt-5">
							<div class="flex-col">
								<label
									for="email"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Email</label
								>
								<input
									type="text"
									name="email"
									bind:value={email}
									class="bg-gray-50 border text-left w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Email"
									required
								/>
							</div>
							<div class="flex-col">
								<label
									for="website"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Website</label
								>
								<input
									type="text"
									name="website"
									bind:value={website}
									class="bg-gray-50 border text-left w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Website"
									required
								/>
							</div>
						</div>
						<div class="flex flex-row mt-5">
							<div class="flex-col">
								<div class="flex flex-col justify-center">
									<label
										for="province"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Province</label
									>
									<select
										class="w-40 border-2 border-gray-100 p-2 rounded-lg font-sans bg-gray-50 text-sm text-left flex flex-row justify-between cursor-pointer"
										bind:value={provinceSelected}
									>
										{#each provincesData as province}
											<option value={province}>
												{province.name}
											</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
						<div class="flex flex-row mt-5">
							<div class="flex-col">
								<div class="flex flex-col justify-center">
									<label
										for="province"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Category</label
									>
									<select
										class="w-40 border-2 border-gray-100 p-2 rounded-lg font-sans bg-gray-50 text-sm text-left flex flex-row justify-between cursor-pointer"
										bind:value={categorySelected}
									>
										{#each categoriesData as category}
											<option value={category}>
												{category.name}
											</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
						<div class="flex flex-row space-x-10 mt-5">
							<div class="flex-col">
								<label
									for="description"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Description</label
								>
								<div class="flex flex-row ">
									<textarea
										type="text"
										name="description"
										bind:value={description}
										class="bg-gray-50 border text-left w-full border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Description"
										required
									/>
								</div>
							</div>
						</div>
						{#if ShowEror}
							<div class="bg-red-600 w-full text-center p-2 mt-5 rounded-lg text-white">
								{errorTitle}
							</div>
						{/if}
					</div>
				</div>
				<div class="flex-grow-0">
					<div class="flex space-x-2 justify-center items-center">
						<button
							type="button"
							class="text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
							on:click={() => {
								dispatch('close');
							}}
							>Cancel
						</button>
						<button
							disabled={disabledCreate}
							type="submit"
							class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
							>Insert
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
