<script>
  import { createKLoukdoAds } from '$providers/actions/kloukdo/kloukdoadsimage';
  import { uploadImage } from '$providers/actions/kloukdo/kloukdoimage';
      import { createEventDispatcher } from 'svelte';
  
      const dispatch = createEventDispatcher();
      let name = '';
      let image;
      let disabledCreate = false;
      let endDate;

    let base64String = "data:image/jpeg;base64,";
    let height;
    let width;
    let size;

      const createdService = async (evt) => {
          evt.preventDefault();
          
          let imageJson = await uploadImage.load({
            height, name, size, width, base64:base64String
          })
        // let formattedEndDate = new Date(endDate).toISOString();
          let res = await createKLoukdoAds.load({
              name, image:imageJson, endDate
          });
          if (res.success) disabledCreate = true;
          dispatch('create');
      };

      
    function imageUploaded() {
        let file = document.querySelector(
            'input[type=file]')['files'][0];

        let reader = new FileReader();
        console.log("next");

        reader.onload = function () {
            base64String = base64String + reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            console.log(base64String);
        }
        reader.readAsDataURL(file);
    }
  </script>
  
  <div class=" relative w-full h-full p-1 flex justify-center items-center">
      <div class=" absolute bg-white">
          <div class="w-80 h-[26rem]">
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
                              New Advertisement
                          </h3>
                      </div>
                      <div class="flex-grow">
                          <div class="mb-2">
                              <label
                                  for="name"
                                  class="block mb-2 text-sm font-medium text-gray-900">Name</label
                              >
                              <input
                                  type="text"
                                  name="name"
                                  bind:value={name}
                                  class="border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                  placeholder="Name"
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
                        <div class="mb-2">
                            <label
                                  for="photos"
                                  class="block mb-2 text-sm font-medium text-gray-900">Icon</label
                            >
                            <input
                                  type="file"
                                  name="photos"
                                  bind:value={image}
                                  class="border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                  placeholder="Photos"
                                  on:change={(event) => {
                                      const file = event.target.files[0]; // Get the first file from the file input
                              
                                      if (file) {
                                      // File size and type
                                      size = file.size;
                              
                                      // If the file is an image, get width and height
                                          if (file.type.startsWith("image/")) {
                                              const img = new Image();
                                              img.onload = () => {
                                                  width = img.width;
                                                  height = img.height;
                                              };
                                              img.src = URL.createObjectURL(file); // Create a URL for the image
                                          }
                                      }

                                      imageUploaded()
                                      console.log(base64String)
                                  }}

                            />
                        </div>
                      </div>
                      <div class="flex-grow-0">
                          <div class="flex space-x-2 justify-center mb-4">
                              <button
                                  type="button"
                                  class="text-gray-400 bg-white focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                                  on:click={() => {
                                      dispatch('close');
                                  }}>Cancel</button
                              >
                              <button
                                  disabled={disabledCreate}
                                  type="submit"
                                  class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                  >Create</button
                              >
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
  