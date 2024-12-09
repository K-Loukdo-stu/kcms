<script>
  export let title;
  export let disable = false;
</script>

<div
  class="flex py-1  cursor-pointer hover:bg-gray-200 {disable
    ? 'text-gray-300'
    : 'text-gray-500'}"
>
  <div class=" pl-2 flex items-center"><slot name="icon" /></div>
  <div class=" px-2 pr-3 whitespace-nowrap ">{title}</div>
</div>
