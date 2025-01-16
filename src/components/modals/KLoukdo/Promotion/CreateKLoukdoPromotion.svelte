<script>
    import Modal from '$components/modals/Modal.svelte';
    import { createEventDispatcher } from 'svelte';
    import ShowOptionList from '../ShowOptionList.svelte';
    import CheckBox from '$components/elements/CheckBox/CheckBox.svelte';
    import SelectOption from '$components/elements/SelectOption/SelectOption.svelte';
    import { createKLoukdoProduct } from '$providers/actions/kloukdo/kloukdoproduct';
  import { createKLoukdoPromotion } from '$providers/actions/kloukdo/kloukdopromotion';
  
    const dispatch = createEventDispatcher();
    let product;
    let endDate;
    let disabledCreate = false;
    let shown = false;

    const createdService = async (evt) => {
        evt.preventDefault();
        let formattedEndDate = new Date(endDate).toISOString();
        console.log(endDate)
        console.log(formattedEndDate)
        let res = await createKLoukdoPromotion.load({
            product, endDate:formattedEndDate
        });
        if (res.success) disabledCreate = true;
        dispatch('create');
    };
  </script>
  
  <div class=" relative w-full h-full p-1 flex justify-center items-center">
      <div class=" absolute bg-white">
          <div class="w-80 h-96">
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
                      /></svg
                  >
              </button>
              <div class="py-6 px-6 lg:px-8">
                  <form
                      class="space-y-6 w-full h-full flex flex-col"
                      on:submit|preventDefault={createdService}
                      method="post"
                  >
                      <div class="flex-grow-0">
                          <h3 class="text-xl font-medium text-black text-center">
                              New Promotion
                          </h3>
                      </div>
                      <div class="flex-grow">
                          <div class="mb-4">
                              <label
                                  for="name"
                                  class="block mb-2 text-sm font-medium text-gray-900">
                                  Product
                              </label>
                              <input
                                  type="text"
                                  name="name"
                                  bind:value={product}
                                  class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  placeholder="Product"
                                  required
                              />
                          </div>
                          <div class="mb-4">
                              <label
                                  for="endDate"
                                  class="block mb-2 text-sm font-medium text-gray-900">
                                  endDate
                              </label>
                              <input
                                  type="date"
                                  name="endDate"
                                  bind:value={endDate}
                                  class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  placeholder="endDate"
                                  required
                              />
                          </div>
                          
                      </div>
                      <div class="flex-grow-0">
                          <div class="flex space-x-2 justify-center mb-4">
                              <button
                                  type="button"
                                  class="text-gray-400 bg-white focus:ring-4 focus:outline-none rounded-lg border  text-sm font-medium px-5 py-2.5 focus:z-10 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                                  on:click={() => {
                                      dispatch('close');
                                  }}>Cancel</button
                              >
                              <button
                                  disabled={disabledCreate}
                                  type="submit"
                                  class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800"
                                  >Create</button
                              >
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>