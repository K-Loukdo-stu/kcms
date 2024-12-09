<script>
	import CheckBox from '$components/elements/CheckBox/CheckBox.svelte';
	import { updateAdmin } from '$providers/actions/kauth';
	import { deleteUserServiceByService } from '$providers/actions/kauth/user-service';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let servicesData;
	export let admin;

	let disabledCreate = false;
	let servicesArray = [];
	let country = '+855';

	let id = admin.id;
	let email = admin.email;
	let lastName = admin.lastName;
	let firstName = admin.firstName;
	let username = admin.username;
	let phone = admin.phone;
	let role = admin.role;
	let activated = admin.activated;
	let dateOfBirth = '';
	let sex = admin.sex;
	let password = '';
	let showPassword = false;

	let copyPassword = () => {
		var copyText = password;
	};
	const deleteService = async () => {
		await deleteUserServiceByService.load({ admin, service });
	};

	let genPassword = () => {
		let chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
		var passwordLength = 12;
		password = '';
		for (var i = 0; i <= passwordLength; i++) {
			var randomValue = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomValue, randomValue + 1);
		}
	};

	let formatDate = (date) => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		let viewDate = [year, month, day].join('-');
		return viewDate;
	};
	dateOfBirth = formatDate(admin.dateOfBirth);

	const addService = (service) => {
		if (!servicesArray.includes(service.id)) {
			servicesArray.push(service.id);
		}
	};

	const removeService = (service) => {
		if (servicesArray.includes(service.id)) {
			servicesArray.splice(servicesArray.indexOf(service.id), 1);
		}
	};

	const onUpdateAdmin = async (evt) => {
		evt.preventDefault();
		let admin = await updateAdmin.load({
			id,
			firstName,
			lastName,
			username,
			email,
			sex,
			dateOfBirth,
			phone,
			role,
			activated
		});
		dispatch('onEdit');
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="relative w-[430px] h-[540px]">
			<div class="absolute py-6 px-6 lg:px-8 w-full h-full">
				<form
					class="flex flex-col space-y-6 w-full h-full"
					on:submit|preventDefault={onUpdateAdmin}
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
										for="firstName"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Family Name</label
									>
									<input
										type="text"
										name="firstName"
										bind:value={firstName}
										class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Family Name"
										required
									/>
								</div>
								<div class="flex-col">
									<label
										for="lastName"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Name</label
									>
									<input
										type="text"
										name="lastName"
										bind:value={lastName}
										class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Name"
										required
									/>
								</div>
							</div>

							<div class="flex flex-row space-x-10 mt-5">
								<div class="flex-col">
									<label
										for="sex"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Sex</label
									>
									<input
										type="text"
										name="sex"
										bind:value={sex}
										class="bg-gray-50 border text-center w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Sex"
										required
									/>
								</div>
								<div class="flex-col">
									<label
										for="date"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Date of birth</label
									>
									<input
										type="date"
										name="dateOfBirth"
										bind:value={dateOfBirth}
										class="bg-gray-50 border text-center w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Date"
										required
									/>
								</div>
							</div>
							<div class="flex flex-row space-x-10 mt-5">
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
										class="bg-gray-50 border text-center w-40 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
										placeholder="Email"
										required
									/>
								</div>
								{#if showPassword}
									<div class="flex-col">
										<label
											for="email"
											class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
											>Password</label
										>
										<div
											class="flex justify-center items-center p-1 h-8 text-gray-600 text-sm rounded-lg  w-40 bg-gray-50 border"
										>
											{password}
										</div>
									</div>
								{/if}
							</div>
							<div class="flex flex-row space-x-10 mt-5">
								<div class="flex-col">
									<label
										for="phone"
										class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
										>Phone</label
									>
									<div class="flex flex-row space-x-2">
										<input
											type="text"
											name="country"
											bind:value={country}
											class="bg-gray-50 border text-center w-14 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
											placeholder="+855"
											required
										/>
										<input
											type="text"
											name="phone"
											bind:value={phone}
											class="bg-gray-50 border text-center w-24 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
											placeholder="Phone"
											required
										/>
									</div>
								</div>
								<div class="flex-col">
									<label
										for="phone"
										class="block mb-2 invisible text-sm font-medium text-gray-900 text-gray-300"
										>Phone</label
									>
									<div class="flex flex-row space-x-2 justify-center items-center">
										<div
											on:click={() => {
												copyPassword();
												showPassword = true;
											}}
											class="text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
										>
											Copy
										</div>
										<div
											on:click={() => {
												genPassword();
												showPassword = true;
											}}
											class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
										>
											Generate
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-row mt-5">
								<div class="flex-col">
									<label
										for="service"
										class="block mb-3 text-sm font-medium text-gray-600 text-gray-300"
										>Manage on</label
									>
									<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 mt-5">
										{#each servicesData as service}
											<CheckBox
												title={service.name}
												on:check={() => {
													addService(service);
												}}
												on:uncheck={() => {
													removeService(service);
												}}
											/>
										{/each}
									</div>
								</div>
							</div>
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
								>Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
