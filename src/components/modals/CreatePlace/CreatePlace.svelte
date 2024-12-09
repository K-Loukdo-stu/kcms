<script>
	import StaticSticker from '$components/modals/Sticker/StaticSticker/StaticSticker.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let provincesData;
	export let placeCategoriesData;

	let disabledCreate = false;

	let servicesArray = [];


	let base64
	let name
    let mediaFile
    let description
    let latitude
    let longtitude
    let category
    let province
    let iconUrl
    let iconX
    let iconY
    let pointX
    let pointY
    let hiddenAtMinScale
    let showIcon
    let phone
    let email
    let website
    let price
    let checkInTime
    let checkOutTime


	
    
    
	

	const onCreatePlace = async (evt) => {
		evt.preventDefault();
		
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="relative w-[430px] h-[540px]">
			<!-- <div class="absolute inset-0 py-6 px-6 lg:px-8"> -->
				<form
					class=" flex flex-col space-y-6 w-full h-full absolute inset-0 py-6 px-6 lg:px-8"
					on:submit|preventDefault={onCreatePlace}
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
										placeholder="Phone (Optional)"
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
										placeholder="Email (Optional)"
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
										placeholder="Website (Optional)"
										required
									/>
								</div>
								
							</div>
							
							
							<div class="flex flex-row space-x-10 mt-5">
								<!-- <div class="flex-col">
									<label
										for="price"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Price</label
									>
									<div class="flex flex-row ">
										<input
											type="number"
											name="price"
											bind:value={price}
											class="bg-gray-50 border text-left w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
											placeholder="Price (Optional)"
											required
										/>
									</div>
								</div> -->
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
											placeholder="Description (Optional)"
											required
										/>
									</div>
								</div>
							</div>

							<!-- <div class="flex w-full h-full mt-5">
								<StaticSticker
									on:onImage={(evt) => {
										base64 = evt.detail;
									}}
								/>
							</div> -->
							
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
								>Create
							</button>
						</div>
					</div>
					
				</form>
			<!-- </div> -->
		</div>
	</div>
</div>
