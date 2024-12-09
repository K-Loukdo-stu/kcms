<!-- <script>
	import { createEventDispatcher } from 'svelte';
	import CoverDetail from './ProfileDetail.svelte';
	export let coversData,param;
	let dispatch = createEventDispatcher();
    let shownDelete = true;
</script>

{#each coversData as cover}
	<CoverDetail {cover}
    on:onDelete={(evt)=>{
        param = evt.detail
        dispatch('onDelete',{param,shownDelete})
    }}/>
{/each} -->


<script>
	import { createEventDispatcher } from 'svelte';
	import ProfileDetail from './ProfileDetail.svelte';
	let dispatch = createEventDispatcher();
	export let Data;
	export let profile;
</script>

<div class="m-5 ">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
		{#each Data as data}
			<ProfileDetail
				{data}
				on:delete={(evt) => {
					profile = evt.detail;
					dispatch('delete', profile);
				}}
				on:edit={(evt) => {
					profile = evt.detail;
					dispatch('edit', profile);
				}}
			/>
		{/each}
	</div>
</div>
