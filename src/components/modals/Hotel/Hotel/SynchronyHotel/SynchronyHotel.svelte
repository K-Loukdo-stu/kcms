<script>
	import UploadImage from '$components/elements/UploadImage.svelte';
	import FbLoading from '$components/materials/Spinners/fbLoading/FBLoading.svelte';
	import { updateHotel } from '$providers/actions/ktour/hotel';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let channelData;
	export let hotelData;
	let name = channelData.name;
	let description = channelData.desc;
	let phone = channelData.phone;
	let email = channelData.email;
	let website = channelData.website;
	let bio = channelData.bio;
	let type = channelData.type;
	let profile = channelData.file;
	
	let base64;
	let errorTitle = '';
	let ShowEror = false;
	let id = hotelData.id;
	let price = hotelData.price;
	let category = hotelData.category.id;
	let province = hotelData.province.id;
	let channel = hotelData.channel;
	let latitude = hotelData.latitude;
	let longtitude = hotelData.longtitude;
	let checkInTime = hotelData.checkInTime;
	let checkOutTime = hotelData.checkOutTime;
	let mediaUrl = hotelData.file;

	if (!hotelData.mediaUrl) mediaUrl = { url: null };
	if (!hotelData.latitude) latitude = 0;
	if (!hotelData.longtitude) longtitude = 0;
	if (!hotelData.checkInTime) checkInTime = '';
	if (!hotelData.checkOutTime) checkOutTime = '';
	let disabledEdit = false

	let uploadPercentage = 0;
	let onLoading = false;

	const onUpload = async (evt) => {
		evt.preventDefault();
		onLoading = true;
		
		let res = await updateHotel.load({
			id,
			name,
			description,
			phone,
			email,
			website,
			mediaUrl,
			category,
			province,
			price,
			channel,
			latitude,
			longtitude,
			checkInTime,
			checkOutTime,
			bio,
			type,
			profile
		});
		if (!res.success) {
			ShowEror = true;
			errorTitle = 'This hotel already exists!';
		}
		if (res.success) {
			disabledEdit = false;
			dispatch('synchrony');
		}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center ">
	<div class=" absolute bg-white">
		<div class="relative w-[430px] h-[600px] overflow-x-auto">
			<form
				class="flex flex-col space-y-6 w-full h-full absolute inset-0 py-6 px-6 lg:px-8"
				on:submit|preventDefault={onUpload}
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
								><path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
						<h3 class="mb-5 text-base font-medium text-gray-700 text-white text-center">
							Synchrony with channel
						</h3>
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
									for="email"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Email</label
								>
								<input
									type="text"
									name="email"
									bind:value={email}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Email"
									required
								/>
							</div>
						</div>

						<div class="flex flex-row space-x-12 mt-5">
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
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Website"
									required
								/>
							</div>
						</div>

						<div class="flex flex-row space-x-12 mt-5">
							<div class="flex-col">
								<label
									for="bio"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Bio</label
								>
								<input
									type="text"
									name="bio"
									bind:value={bio}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Bio"
									required
								/>
							</div>
							<div class="flex-col">
								<label
									for="type"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Type</label
								>
								<input
									type="text"
									name="type"
									bind:value={type}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Type"
									required
								/>
							</div>
						</div>

						<div class="flex flex-row space-x-12 mt-5">
							<div class="flex-col">
								<label
									for="description"
									class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
									>Description</label
								>
								<!-- <input
									type="text"
									name="description"
									bind:value={description}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Description"
									required
								/> -->
								<textarea
									type="text"
									name="description"
									bind:value={description}
									class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
									placeholder="Description"
									required
								/>
							</div>
						</div>
						<!-- <div class="flex flex-row space-x-12 mt-5">
							<div class="flex-col">
								<label
									for="profiles"
									class="block text-sm font-medium text-gray-900 text-gray-300"
									>Image
								
								<div class="flex">
									<UploadImage
										on:onImage={(evt) => {
											base64 = evt.detail;
										}}
									/>
								</div>
							</div>
						</div> -->
					</div>
				</div>
				<div class="flex-grow-0">
					{#if onLoading}
						<div class="flex justify-end items-end w-3/4">
							<FbLoading color="#FE4922" />
						</div>
					{:else}
						<div class="flex justify-center space-x-4">
							<button
								type="button"
								on:click={() => {
									dispatch('close');
								}}
								class=" w-24  h-11 text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
								>Cancel
							</button>
							<button
								type="submit"
								class="relative w-24  h-11 rounded-lg overflow-hidden bg-gray-100"
							>
								<div
									class="bg-gray-300 absolute left-0 top-0 bottom-0"
									style={`width: ${uploadPercentage}%;`}
								/>
								<div
									class="absolute inset-0 py-1 text-pink-400 hover:bg-gray-200 hover:text-pink-600 flex justify-center items-center "
								>
									<div>Synchrony</div>
								</div>
							</button>
						</div>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
