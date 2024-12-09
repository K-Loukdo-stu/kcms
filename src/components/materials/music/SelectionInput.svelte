<script>
  export let label = "Title";
  export let value;
  export let optionValues = [];
  export let optionFields = [];
  export let valueField;
  export let isRequred = false;
  export let hasNone = false;
</script>

{#if optionFields.length && valueField}
  <div>
    <label for="genre" class="block mb-2 text-sm font-medium text-gray-900"
      >{label}</label
    >
    <select
      class=" border-2 border-gray-100 w-full p-2 rounded-lg font-sans bg-white text-sm text-left flex flex-row justify-between cursor-pointer"
      bind:value
      required={isRequred}
    >
      {#if hasNone}
        <option value={''}>---</option>
      {/if}
      {#each optionValues as val}
        <option value={val[valueField]}>
          {#each optionFields as field}
            <p>{val[field]}</p>
            &nbsp;
          {/each}
        </option>
      {/each}
    </select>
  </div>
{/if}
