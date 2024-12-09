<div class=" flex flex-col relative bg-gray-100 h-full">
	<div class=" relative h-full">
		<div class=" absolute inset-0">
			<div class="p-2 h-full">
				<main class="flex h-full">
					<div class="w-full lg:flex min-h-full">
						<div class="mx-auto flex flex-row h-full">
							<!-- menu switch -->
							<div
								class="w-256 p-2 hidden lg:block relative overflow-x-hidden"
							>
								<div class="absolute rounded-md p-2 w-full">
									<slot name="menu" />
								</div>
							</div>

							<!-- tab content -->
							<div class="w-full lg:w-768 p-2 h-full">
								<div
									class="bg-white border rounded-md p-2 h-full w-full"
								>
									<slot name="content" />
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 0px;
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
