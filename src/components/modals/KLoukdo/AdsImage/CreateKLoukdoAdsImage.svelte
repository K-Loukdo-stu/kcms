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
    // let height;
    // let width;
    // let size;
    let imgBlock;

    let loading;


    const createdService = async (evt) => {
        evt.preventDefault();
        loading = true;
        console.log({image})
        let imageJson = await uploadImage.load({
            height:image.height,
            name:image.name,
            size:image.size,
            width:image.width,
            base64:image.base64
        });
        console.log({imageJson});
        let completeJsonImage = {
            bucket: "kstorage-bucket",
            contentType: "image/jpeg",
            height: image.height,
            width: image.width,
            key: imageJson.key,
            thumbnail: { url: imageJson.url, width: 100, height: 99 },
            url: imageJson.url
        };

        // let formattedEndDate = new Date(endDate).toISOString();
        let res = await createKLoukdoAds.load({
            name, image:completeJsonImage, endDate
        });
        if (res.success) disabledCreate = true;
        dispatch('create');
    };

      
    var imageUploaded = function(event) {
        const file = event.target.files[0]; // Get the first file from the file input
        let imageJson = {};
        imgBlock = URL.createObjectURL(file);
        if (file) {
        // File size and type
        imageJson.size = file.size;
        imageJson.name = file.name;
    
            // If the file is an image, get width and height
            if (file.type.startsWith("image/")) {
                const img = new Image();
                img.onload = () => {
                    imageJson.width = img.width;
                    imageJson.height = img.height;
                };
                img.src = URL.createObjectURL(file); // Create a URL for the image
            }
        }
        let reader = new FileReader();

        reader.onload = function () {
            let string = base64String + reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            imageJson.base64 = string;
        }
        reader.readAsDataURL(file);
        console.log({imageJson})
        image = imageJson;
    }


  </script>
  
  <div class=" relative w-full h-full p-1 flex justify-center items-center">
      <div class=" absolute bg-white">
          <div class="w-80 h-full">
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
                        <label for="photos">
                            <div class="flex justify-center items-center h-40 rounded-lg mb-2 text-sm font-medium text-gray-900 w-full border border-blue-400">
                                {#if !imgBlock}
                                    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                {:else}
                                    <img alt="" id="output"
                                        class="w-full object-cover h-40 rounded-lg"
                                        src="{imgBlock}"
                                    >
                                {/if}
                                
                            </div>
                        </label>
                        <input
                            required
                            accept="image/png, image/jpg, image/jpeg"
                            id="photos"
                            type="file"
                            name="photos"
                            class="border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-0 bg-gray-600 border-gray-500 placeholder-gray-400 absolute bottom-0 opacity-0"
                            placeholder="Photos"
                            on:change={(event) => {imageUploaded(event, 1)}}
                        />
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
  