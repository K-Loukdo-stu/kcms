<script>
    import Edit from "$components/icons/Edit.svelte";
    import Trash from "$components/icons/Trash.svelte";
    import { createEventDispatcher } from "svelte";
  
    export let data = [];
    export let columnOrder = [];
    export let hiddenColumns = [];
    export let imageColumnName = "";
    export let tailwindTable = "";
    export let tailwindHeader = "";
    export let tailwindRow = "";
    export let tailwindImage = "";
  
    let dispatch = createEventDispatcher();
  
    $: columns = data.length > 0 ? Object.keys(data[0]) : [];
    $: visibleColumns = columns.filter((col) => !hiddenColumns.includes(col));
    $: orderedColumns = columnOrder.length
      ? columnOrder.filter((col) => visibleColumns.includes(col))
      : visibleColumns;
  </script>
  
  {#if data.length === 0}
    <div class="flex justify-center mt-20 text-center text-gray-600 text-lg">
      No records available
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 {tailwindTable}">
        <thead>
          <tr>
            {#each orderedColumns as column}
              <th
                class="text-white bg-slate-500 px-4 py-2 capitalize {tailwindHeader}"
                >{column}</th
              >
            {/each}
            <th class="sticky right-0 text-white bg-slate-500 px-4 py-2{tailwindHeader}">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {#each data as row (row.id)}
            <tr>
              {#each orderedColumns as column}
                <td class="border-b border-gray-300 px-4 py-2 {tailwindRow}">
                  {#if column === imageColumnName}
                    {#if Array.isArray(row[column]) && row[column].length > 0}
                      <img
                        src={row[column][0]}
                        class="w-16 h-16 object-cover {tailwindImage}"
                      />
                    {:else if typeof row[column] === "string" && row[column] !== ""}
                      <img
                        src={row[column]}
                        class="w-16 h-16 object-cover {tailwindImage}"
                        alt="Image"
                      />
                    {:else}
                      No image
                    {/if}
                  {:else}
                    {#if row[column] != null}
                      {row[column]}
                    {:else}
                      N/A
                    {/if}
                  {/if}
                </td>
              {/each}
              <td class="border-b border-gray-300 px-4 py-2 sticky right-0 bg-white">
                <div
                  class="text-gray-600 text-center flex flex-row justify-center items-center space-x-2"
                >
                  <button
                    class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                    on:click={() => {
                      dispatch("onEdit", row);
                    }}
                    aria-label="Edit"
                  >
                    <Edit />
                  </button>
                  <button
                    class="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                    on:click={() => {
                      dispatch("onDelete", row);
                    }}
                    aria-label="Delete"
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  