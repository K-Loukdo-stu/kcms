<script>
	import Pagenetion from '$components/elements/pagenation/Pagenation/Pagenetion.svelte';
import { createService } from '$providers/actions/kauth/service';
  	import { updateKLoukdoCategory } from '$providers/actions/kloukdo/kloukdocategory';
	import { createEventDispatcher, onMount } from 'svelte';

	export let categoryList;

    let numberOfPhoto = param.length;
    let imagesPerPage = 2;
    let page = Math.ceil(numberOfPhoto / imagesPerPage);
    let currentPage = 1;
	const dispatch = createEventDispatcher();

    const nextPage = () => {
        if (currentPage < page) {
            currentPage+=1
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            currentPage-=1
        }
    }

</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="w-96 h-[516px]">
			<button
				type="button"
				class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
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
					/></svg>
			</button>
			<div class="py-6 px-6 lg:px-8">
                <div class="flex-grow-0">
                    <h3 class="text-xl font-medium text-gray-900 text-center">
                        All Images
                    </h3>
                </div>
                <div class="flex-grow">
                        <div class="mb-6 mt-2">
                            <!-- <div>{(currentPage-1)*imagesPerPage}</div> -->
                            <img class=" w-auto h-auto m-auto" src={param[(currentPage-1)*imagesPerPage]} alt="" />
                            <!-- <div>{(currentPage-1)*imagesPerPage+1}</div> -->
                            <img class=" w-auto h-auto m-auto" src={param[(currentPage-1)*imagesPerPage+1]} alt="" />
                        </div>
                    
                </div>
				
			</div>
            <div>
                <button
				type="button"
				class="absolute bottom-3 right-[70px] text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
				data-modal-toggle="authentication-modal"
                on:click={previousPage}
			>
            <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M8 12L14 6V18L8 12Z"></path>
            </svg>
            
            </div>
            <div class="w-5 h-5 absolute bottom-5 right-[40px] align-middle">{currentPage}</div>
            <div>
                <button
				type="button"
				class="absolute bottom-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
				data-modal-toggle="authentication-modal"
                on:click={nextPage}
			>
                <svg 
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M16 12L10 18V6L16 12Z"></path>
                </svg>
            </div>
		</div>
	</div>
</div>
