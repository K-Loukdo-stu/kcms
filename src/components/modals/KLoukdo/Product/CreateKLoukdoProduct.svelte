<script>
    import Modal from '$components/modals/Modal.svelte';
      import { createEventDispatcher } from 'svelte';
    import ShowOptionList from '../ShowOptionList.svelte';
  import CheckBox from '$components/elements/CheckBox/CheckBox.svelte';
  import SelectOption from '$components/elements/SelectOption/SelectOption.svelte';
  import { createKLoukdoProduct } from '$providers/actions/kloukdo/kloukdoproduct';
  import { uploadImage } from '$providers/actions/kloukdo/kloukdoimage';
  
      export let categoryList;
      export let subCategoryList;
  
      const dispatch = createEventDispatcher();
      let name = '';
      let photos;
      let category;
      let subCategory;
      let price;
      let currency;
      let discount = false;
      let discountPrice = 0;
      
	let base64String = "data:image/jpeg;base64,";
    let height;
    let width;
    let size;


      let disabledCreate = false;
  
      let shown = false;
  
      const createdService = async (evt) => {
          evt.preventDefault();
          let image = await uploadImage.load({
            height, name, size, width, base64:base64String
          })
          let res = await createKLoukdoProduct.load({
              name, category, subCategory, price, discountPrice, hasDiscount:discount, currency, photos:image
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
          <div class="w-[32rem] h-[46rem]">
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
                              New Product
                          </h3>
                      </div>
                      <div class="flex-grow">
                          <div class="mb-4">
                              <label
                                  for="name"
                                  class="block mb-2 text-sm font-medium text-gray-900">
                                  Name
                              </label>
                              <input
                                  type="text"
                                  name="name"
                                  bind:value={name}
                                  class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  placeholder="Name"
                                  required
                              />
                          </div>
                          <div class="flex">
                            <div class="mb-4 flex-grow mr-4">
                              <SelectOption
                                title="Category"
                                options={categoryList}
                                value=""
                                on:change={(event) => {
                                    category = event.detail
                                    dispatch('subcategory', category);
                                }}
                              />
                              
                          </div>
                          
                          <div class="mb-4 flex-grow">
                              <SelectOption
                                title="Sub-Category"
                                options={subCategoryList}
                                value=""
                                on:change={(event) => {
                                    subCategory = event.detail
                                }}
                              />
                              
                          </div>
                          </div>
                          
                          <div class="mb-2">
                              <label
                                  for="price"
                                  class="block mb-2 text-sm font-medium text-gray-900">Price</label
                              >
                              <input
                                  type="number"
                                  min="0"
                                  name="price"
                                  bind:value={price}
                                  class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  placeholder="Price"   
                                  required
                              />
                          </div>
                          <div class="mb-2">
                              <SelectOption
                                title="Currency"
                                options={[{ id: "USD", name: "USD" }, { id: "KHR", name: "KHR" } ]}
                                value=""
                                on:change={(event) => {
                                    currency = event.detail
                                    console.log(currency)
                                }}
                              />
                          </div>
                          <div class="mb-2 flex">
                            <CheckBox
                                title={"discount"}
                                on:check={() => {
                                    discount = true;
                                }}
                                on:uncheck={() => {
                                    discount = false;
                                }}
                            />
                            <div class="mb-2 ml-2 mt-2">
                                <input
                                    disabled={!discount}
                                    type="number"
                                    name="discount"
                                    bind:value={discountPrice}
                                    class="border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                    placeholder="discount"
                                />
                            </div>
                          </div>
                          <div class="mb-2">
                              <label
                                    for="photos"
                                    class="block mb-2 text-sm font-medium text-gray-900">Icon</label
                              >
                              <input
                                    type="file"
                                    name="photos"
                                    bind:value={photos}
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
  
  
  <Modal {shown}>
      <ShowOptionList
          categoryList={categoryList}
          on:close={() => {
              shown = false;
          }}
          on:create={async () => {
              shown = false;
              // await loadSubCategories();
          }}
      />
  </Modal>