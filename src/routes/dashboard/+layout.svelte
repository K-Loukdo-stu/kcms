<script context="module">
	export async function load({ fetch }) {
		return { props: {} };
	}
</script>

<script>
	import { ensureSignedIn } from "$lib/middleware/auth";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Header from "$components/elements/Header.svelte";

	let signedIn = false;
	let me;
	export let admin = "";
	let service;
	let url;
	let selectedService = {};
	let adminServices;
	const loadServiceByAdmin = async () => {
		try {
			adminServices = await userServiceByAdmin.load({ admin });
			if (adminServices.success) adminServices = adminServices.data;
			selectedService = adminServices[0].service;
			url = selectedService.url;
		} catch {}
	};

	onMount(async () => {
		signedIn = await ensureSignedIn();
		if (signedIn?.success == true) {
			signedIn["data"] = signedIn["data"];
			me = signedIn.data;
			admin = me.id;
		}
		await loadServiceByAdmin();
		if (!signedIn) return goto("/auth");
	});
</script>

{#if signedIn}
	<div class=" flex flex-col relative bg-gray-100 h-screen overflow-hidden">
		<div class="flex-grow-0">
			<Header
				bind:admin
				on:selectedService={(evt) => {
					service = evt.detail;
					goto(service.url);
				}}
			/>
		</div>
		<div class="relative flex-grow">
			<div class="absolute inset-0">
				<slot {admin} />
			</div>
		</div>
	</div>
{/if}
